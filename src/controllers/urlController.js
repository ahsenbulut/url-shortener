const generateShortCode = require('../utils/shortCodeGenerator');
const { saveUrl, findUrlByCode, incrementClickCount } = require('../models/urlModel');
const { logClick } = require('../models/analyticsModel');
const { isValidUrl, isSafeDomain } = require('../utils/urlValidator');
const { setCache, getCache } = require('../utils/cache');

// 🔒 URL oluşturma
const shortenUrl = async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  try {
    if (!isValidUrl(originalUrl)) {
      return res.status(400).json({ message: 'Geçersiz URL formatı' });
    }

    if (!isSafeDomain(originalUrl)) {
      return res.status(403).json({ message: 'Bu alan adı yasaklıdır (malicious).' });
    }

    const shortCode = customAlias || generateShortCode();

    const existing = await findUrlByCode(shortCode);
    if (existing) {
      return res.status(409).json({ message: 'Bu kısa kod zaten kullanılıyor' });
    }

    const newUrl = await saveUrl(originalUrl, shortCode);

    await setCache(newUrl.short_code, {
      original_url: newUrl.original_url,
      is_active: newUrl.is_active,
      expires_at: newUrl.expires_at,
    });

    return res.status(201).json({
      originalUrl: newUrl.original_url,
      shortCode: newUrl.short_code,
      shortLink: `http://localhost:5000/api/${newUrl.short_code}`,
    });
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

// 📦 Yönlendirme
const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const cachedData = await getCache(shortCode);
    if (cachedData) {
      if (cachedData.is_active === false) {
        return res.status(410).json({ message: 'Bu link devre dışı bırakılmıştır (cache).' });
      }
      if (cachedData.expires_at && new Date(cachedData.expires_at) < new Date()) {
        return res.status(410).json({ message: 'Bu linkin süresi dolmuştur (cache).' });
      }

      await incrementClickCount(shortCode);
      await logClick({
        url_id: cachedData.id || 0,
        ip: req.ip,
        userAgent: req.get('User-Agent'),
        referer: req.get('Referer') || null,
        country: 'Türkiye',  // Geçici
        city: 'İstanbul',    // Geçici
      });

      return res.status(200).json({
        originalUrl: cachedData.original_url,
        message: 'Cache üzerinden yönlendirildi.',
      });
    }

    const urlData = await findUrlByCode(shortCode);

    if (!urlData) {
      return res.status(404).json({ message: 'URL bulunamadı' });
    }

    if (urlData.is_active === false) {
      return res.status(410).json({ message: 'Bu link devre dışı bırakılmıştır.' });
    }

    if (urlData.expires_at && new Date(urlData.expires_at) < new Date()) {
      return res.status(410).json({ message: 'Bu linkin süresi dolmuştur.' });
    }

    await incrementClickCount(shortCode);
    await logClick({
      url_id: urlData.id,
      ip: req.ip,
      userAgent: req.get('User-Agent'),
      referer: req.get('Referer') || null,
      country: 'Türkiye',
      city: 'İstanbul',
    });

    return res.status(200).json({
      originalUrl: urlData.original_url,
      message: 'Yönlendirme başarılı',
    });
  } catch (error) {
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
