const redisClient = require('../config/redis');

const WINDOW_SIZE_IN_SECONDS = 60;
const MAX_REQUESTS = 30;

const rateLimiter = async (req, res, next) => {
  const ip = req.ip;

  const key = `rate_limit:${ip}`;
  const now = Date.now();

  try {
    const data = await redisClient.get(key);
    if (data) {
      const requestLog = JSON.parse(data);
      const windowStart = now - WINDOW_SIZE_IN_SECONDS * 1000;
      const recentRequests = requestLog.filter(timestamp => timestamp > windowStart);

      if (recentRequests.length >= MAX_REQUESTS) {
        return res.status(429).json({ message: 'Çok fazla istek gönderdiniz. Lütfen bekleyin.' });
      }

      recentRequests.push(now);
      await redisClient.set(key, JSON.stringify(recentRequests));
    } else {
      await redisClient.set(key, JSON.stringify([now]));
    }

    next();
  } catch (err) {
    console.warn('Rate limiter Redis hatası:', err);
    // Graceful degradation (fail open)
    next();
  }
};

module.exports = rateLimiter;
