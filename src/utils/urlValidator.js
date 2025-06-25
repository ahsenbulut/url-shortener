const blacklistedDomains = [
  'malicious.com',
  'phishing-site.com',
  'fakebank.net',
  'dangerous.org',
];

const isValidUrl = (url) => {
  const regex = /^(http|https):\/\/[^ "]+$/;
  return regex.test(url);
};

const isSafeDomain = (url) => {
  try {
    const { hostname } = new URL(url);
    const domain = hostname.replace('www.', '');
    return !blacklistedDomains.includes(domain);
  } catch (error) {
    return false;
  }
};

module.exports = {
  isValidUrl,
  isSafeDomain,
};
