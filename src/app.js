const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const urlRoutes = require('./routes/urlRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes'); 

const app = express();

const rateLimiter = require('./middleware/rateLimiter');
app.use(rateLimiter); 


// Middleware'ler
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json()); 

// Route'lar
app.use('/api', urlRoutes);
app.use('/api/analytics', analyticsRoutes); 

// Test endpoint
app.get('/', (req, res) => {
  res.send('URL Shortener API çalışıyor! 🚀');
});

module.exports = app;
