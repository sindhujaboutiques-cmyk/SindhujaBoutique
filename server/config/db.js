const mongoose = require('mongoose');

const ATLAS_DEFAULT_URI = 'mongodb+srv://sindhujaboutiques_db_user:sinduja123@sindhujaboutique.11hwf2x.mongodb.net/sinduja_boutique?retryWrites=true&w=majority&appName=SindhujaBoutique';

let isConnected = false;
let connectionPromise = null;
let hasSeeded = false;

const seedInitialDataIfNeeded = async () => {
  if (hasSeeded) return;
  hasSeeded = true;
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
  if (mongoose.connection.readyState === 1) {
    isConnected = true;
    return mongoose.connection;
  }

  if (connectionPromise) {
    return connectionPromise;
  }

  const uri = process.env.MONGODB_URI || ATLAS_DEFAULT_URI;

  connectionPromise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    connectTimeoutMS: 10000,
    maxPoolSize: 10,
  }).then(async (conn) => {
    isConnected = true;
    console.log(`[MongoDB] Connected successfully to database: ${conn.connection.name} (${conn.connection.host})`);
    
    // Auto-seed initial catalog if empty
    await seedInitialDataIfNeeded();

    return conn;
  }).catch((error) => {
    isConnected = false;
    connectionPromise = null; // Allow retry on subsequent request
    console.error(`[MongoDB] Connection failed (${error.message}).`);
    throw error;
  });

  return connectionPromise;
};

const getIsConnected = () => isConnected || mongoose.connection.readyState === 1;

module.exports = { connectDB, getIsConnected };
