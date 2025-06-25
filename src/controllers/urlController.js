const generateShortCode = require('../utils/shortCodeGenerator');
const { saveUrl, findUrlByCode, incrementClickCount } = require('../models/urlModel');

// Kısa link oluşturma
const shortenUrl = async (req, res) => {
  const { originalUrl, customAlias } = req.body;

  try {
    const urlRegex = /^(http|https):\/\/[^ "]+$/;
    if (!urlRegex.test(originalUrl)) {
      return res.status(400).json({ message: 'Geçersiz URL formatı' });
    }

    let shortCode = customAlias || generateShortCode();

    // Aynı kısa kod varsa hata ver
    const existing = await findUrlByCode(shortCode);
    if (existing) {
      return res.status(409).json({ message: 'Bu kısa kod zaten kullanılıyor' });
    }

    // Veritabanına kaydet
    const newUrl = await saveUrl(originalUrl, shortCode);

    return res.status(201).json({
      originalUrl: newUrl.original_url,
      shortCode: newUrl.short_code,
      shortLink: `http://localhost:5000/api/${newUrl.short_code}`,
    });
  } catch (error) {
    console.error('Hata:', error.message);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

// Yönlendirme
const redirectUrl = async (req, res) => {
  const { shortCode } = req.params;

  try {
    const urlData = await findUrlByCode(shortCode);

    if (!urlData) {
      return res.status(404).json({ message: 'URL bulunamadı' });
    }

    // Click sayısını artır
    await incrementClickCount(shortCode);

    return res.redirect(urlData.original_url);
  } catch (error) {
    console.error('Redirect Hatası:', error.message);
    return res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
};
