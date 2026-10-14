const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const apiRoutes = require('./routes/api');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB on server launch
connectDB().catch(e => console.error('[Startup DB Notice]:', e.message));

// Middlewares
app.use(cors({
  origin: '*', // Allow development client & production origins
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(morgan('dev'));

// Ensure database connection is established before processing API routes
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('[Database Middleware]: Waiting on MongoDB connection:', err.message);
  }
  next();
});

// API Routes
app.use('/api', apiRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  const mongoose = require('mongoose');
  const isDbReady = mongoose.connection.readyState === 1;
  res.json({
    status: 'online',
    brand: 'Sinduja Boutique API',
    database: isDbReady ? 'connected' : 'disconnected',
    dbName: isDbReady ? mongoose.connection.name : null,
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Root API Welcome
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to Sinduja Boutique API - Your Style. Your Rule.',
    endpoints: {
      products: '/api/products',
      categories: '/api/categories',
      services: '/api/services',
      gallery: '/api/gallery',
      offers: '/api/offers',
      settings: '/api/settings',
      contact: '/api/contact'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ Sinduja Boutique Server running on port ${PORT}`);
});

module.exports = app;

