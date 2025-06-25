const { isValidUrl } = require('../utils/urlValidator');

const validateUrl = (req, res, next) => {
  const { originalUrl } = req.body;
  if (!isValidUrl(originalUrl)) {
    return res.status(400).json({ message: 'Geçersiz URL' });
  }
  next();
};

module.exports = {
  validateUrl,
};
