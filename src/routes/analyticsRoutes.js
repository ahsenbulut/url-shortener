const express = require('express');
const router = express.Router();


router.get('/test', (req, res) => {
  res.json({ message: 'Analytics route çalışıyor.' });
});

module.exports = router;
