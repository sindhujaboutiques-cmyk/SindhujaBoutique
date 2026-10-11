const mongoose = require('mongoose');

let isConnected = false;

const seedInitialDataIfNeeded = async () => {
  try {
    const Category = require('../models/Category');
    const Product = require('../models/Product');
    const { categories, products } = require('../data/seedData');

    const catCount = await Category.countDocuments();
    if (catCount === 0) {
      console.log('[Seed] Seeding initial 40 boutique categories into MongoDB...');
      await Category.insertMany(categories);
      console.log('[Seed] Categories seeded successfully.');
    }

    const prodCount = await Product.countDocuments();
    if (prodCount === 0) {
      console.log('[Seed] Seeding initial boutique products into MongoDB...');
      await Product.insertMany(products);
      console.log('[Seed] Products seeded successfully.');
    }
  } catch (err) {
    console.log('[Seed] Note during auto-seed:', err.message);
  }
};

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isConnected = true;
    return true;
  }

  const uri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/sinduja_boutique';
  
  try {
    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 5000
    });
    isConnected = true;
    console.log(`[MongoDB] Connected successfully: ${conn.connection.host}`);
    
    // Auto-seed initial catalog if empty
    seedInitialDataIfNeeded();

    return true;
  } catch (error) {
    isConnected = false;
    console.log(`[MongoDB] Notice: MongoDB connection failed (${error.message}). Running with high-performance in-memory seed store.`);
    return false;
  }
};

const getIsConnected = () => isConnected || mongoose.connection.readyState === 1;

module.exports = { connectDB, getIsConnected };


