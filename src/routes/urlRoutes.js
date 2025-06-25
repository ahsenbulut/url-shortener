const express = require('express');
const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
  getUrlStats,
  generateQrCode,
  bulkShortenUrls
} = require('../controllers/urlController');

const authMiddleware = require('../middleware/auth');

// 📷 QR kod üret
router.get('/qr/:shortCode', generateQrCode);

// 🔗 Tekli URL kısalt
router.post('/shorten', shortenUrl);

// 📦 Toplu URL kısalt
router.post('/bulk', bulkShortenUrls);

// 🚀 Yönlendirme
router.get('/:shortCode', redirectUrl);
router.get('/redirect/:shortCode', redirectUrl);

// 📊 İstatistik
router.get('/stats/:shortCode', authMiddleware, getUrlStats);

module.exports = router;
