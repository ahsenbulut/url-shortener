const redis = require('redis');

const client = redis.createClient({
  url: process.env.REDIS_URL || 'redis://localhost:6379'
});

client.connect().catch(console.error);

const setCache = async (key, value, ttlInSeconds = 3600) => {
  await client.set(key, JSON.stringify(value), {
    EX: ttlInSeconds,
  });
};

const getCache = async (key) => {
  const result = await client.get(key);
  return result ? JSON.parse(result) : null;
};

module.exports = {
  setCache,
  getCache,
};
