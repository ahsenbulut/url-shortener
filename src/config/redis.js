const redis = require('redis');

const REDIS_URL = process.env.NODE_ENV === 'test'
  ? 'redis://localhost:6379'
  : process.env.REDIS_URL || 'redis://redis:6379';

console.log('🔍 Redis bağlantısı hedefi:', REDIS_URL);

const redisClient = redis.createClient({ url: REDIS_URL });

redisClient.on('error', (err) => {
  console.error('❌ Redis bağlantı hatası:', err);
});

redisClient.connect().catch(console.error);

module.exports = redisClient;
