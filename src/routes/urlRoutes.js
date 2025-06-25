const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const { getUrlStats } = require('../controllers/urlController');
const authMiddleware = require('../middleware/auth');


// Kısa link oluşturma
router.post('/shorten', shortenUrl);

// Yönlendirme
router.get('/:shortCode', redirectUrl);
router.get('/redirect/:shortCode', redirectUrl); 

router.get('/stats/:shortCode', authMiddleware, getUrlStats);



module.exports = router;
