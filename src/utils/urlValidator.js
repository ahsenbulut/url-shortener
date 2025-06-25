const blacklist = ['phishing.com', 'malicious.com', 'spam.com'];

function isValidUrl(url) {
  try {
    const parsed = new URL(url);
    return ['http:', 'https:'].includes(parsed.protocol);
  } catch {
    return false;
  }
}

function isSafeDomain(url) {
  try {
    const hostname = new URL(url).hostname.replace('www.', '').toLowerCase();
    return !blacklist.includes(hostname);
  } catch {
    return false;
  }
}

module.exports = {
  isValidUrl,
  isSafeDomain,
};
