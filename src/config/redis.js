console.log("🔍 Redis bağlantısı hedefi: redis://redis:6379");

const { createClient } = require('redis');


const redisClient = createClient({
  url: 'redis://redis:6379'
});

redisClient.on('error', (err) => {
  console.error('❌ Redis bağlantı hatası:', err);
});

redisClient.connect();

module.exports = redisClient;
