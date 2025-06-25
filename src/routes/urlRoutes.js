
const express = require('express');
const router = express.Router();

const {
  shortenUrl,
  redirectUrl,
  getUrlStats,
  generateQrCode
} = require('../controllers/urlController');

const authMiddleware = require('../middleware/auth');

// 🎯 QR Kod oluşturma
router.get('/qr/:shortCode', generateQrCode);

// 🔗 Kısa link oluştur
router.post('/shorten', shortenUrl);

// 🚀 Yönlendirme
router.get('/:shortCode', redirectUrl);
router.get('/redirect/:shortCode', redirectUrl);

// 📊 İstatistik
router.get('/stats/:shortCode', authMiddleware, getUrlStats);

module.exports = router;
