const generateShortCode = require('../src/utils/shortCodeGenerator');

describe('Short Code Generator', () => {
  test('valid short code length', () => {
    const code = generateShortCode();
    expect(code).toHaveLength(6);
  });

  test('should return unique values in multiple calls', () => {
    const codes = new Set();
    for (let i = 0; i < 1000; i++) {
      codes.add(generateShortCode());
    }
    expect(codes.size).toBe(1000);
  });
});
