const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');

// Kısa link oluşturma
router.post('/shorten', shortenUrl);

// Yönlendirme
router.get('/:shortCode', redirectUrl);
router.get('/redirect/:shortCode', redirectUrl); 


module.exports = router;
