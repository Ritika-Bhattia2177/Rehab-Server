const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('📦 Using existing MongoDB connection');
    return;
  }

  try {
    // Set mongoose options for serverless
    mongoose.set('strictQuery', false);
    mongoose.set('bufferCommands', false);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery', {
      serverSelectionTimeoutMS: 3000,
      socketTimeoutMS: 30000,
      maxPoolSize: 1,
      minPoolSize: 0,
    });

    isConnected = conn.connection.readyState === 1;
    console.log('✅ MongoDB Connected:', conn.connection.host);
    return conn;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    isConnected = false;
    // Don't throw in serverless - just log and continue
    return null;
  }
};

module.exports = connectDB;
