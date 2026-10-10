const mongoose = require('mongoose');

let isConnected = false;

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
    return true;
  } catch (error) {
    isConnected = false;
    console.log(`[MongoDB] Notice: MongoDB connection failed (${error.message}). Running with high-performance in-memory seed store.`);
    return false;
  }
};

const getIsConnected = () => isConnected || mongoose.connection.readyState === 1;

module.exports = { connectDB, getIsConnected };

