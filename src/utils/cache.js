const redisClient = require('../config/redis');

const setCache = async (key, value, ttlInSeconds = 3600) => {
  await redisClient.set(key, JSON.stringify(value), {
    EX: ttlInSeconds,
  });
};

const getCache = async (key) => {
  const result = await redisClient.get(key);
  return result ? JSON.parse(result) : null;
};

module.exports = {
  setCache,
  getCache,
};
