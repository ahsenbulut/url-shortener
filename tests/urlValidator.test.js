const { isValidUrl, isSafeDomain } = require('../src/utils/urlValidator');

describe('URL Validation', () => {
  test('valid URL format', () => {
    expect(isValidUrl('https://example.com')).toBe(true);
  });

  test('invalid URL format', () => {
    expect(isValidUrl('not-a-url')).toBe(false);
  });

  test('malicious domain detection (blacklist örneği)', () => {
    expect(isSafeDomain('http://phishing.com')).toBe(false);
  });
});
