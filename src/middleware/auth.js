const jwt = require('jsonwebtoken');
const secretKey = process.env.JWT_SECRET || 'default_secret';

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Token bulunamadı' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, secretKey);
    req.user = decoded; // Örn: { id: 123, email: "..." }
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Geçersiz token' });
  }
};

module.exports = authMiddleware;
