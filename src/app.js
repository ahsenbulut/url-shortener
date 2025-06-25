const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const urlRoutes = require('./routes/urlRoutes');

const app = express();

// Middleware'ler
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); // <-- Bu satır kritik

// Route'lar
app.use('/api', urlRoutes);

// Test endpoint
app.get('/', (req, res) => {
  res.send('URL Shortener API çalışıyor! 🚀');
});

module.exports = app;
