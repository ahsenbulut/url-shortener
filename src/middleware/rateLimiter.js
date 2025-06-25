const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 dakika
  max: 30, // dakika başına 30 istek
  message: 'Çok fazla istek gönderildi, lütfen biraz bekleyin.',
});

module.exports = limiter;
