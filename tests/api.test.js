const request = require('supertest');
const app = require('../src/app');

describe('API Tests', () => {
  test('URL shortening endpoint', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'https://example.com' });

    expect(res.statusCode).toBe(201);
    expect(res.body.shortCode).toBeDefined();
  });

  test('Error handling - invalid URL', async () => {
    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'abc' });

    expect(res.statusCode).toBe(400);
  });

  test('Rate limiting - 31. istekte 429 dönmeli', async () => {
    for (let i = 0; i < 30; i++) {
      await request(app).post('/api/shorten').send({ originalUrl: `https://example.com/${i}` });
    }

    const res = await request(app)
      .post('/api/shorten')
      .send({ originalUrl: 'https://example.com/overflow' });

    expect(res.statusCode).toBe(429);
  });

  const redisClient = require('../src/config/redis');

afterAll(async () => {
  await redisClient.quit();
});

});
