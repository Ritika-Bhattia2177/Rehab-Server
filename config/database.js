const mongoose = require('mongoose');

let isConnected = false;

const connectDB = async () => {
  // If already connected, return
  if (isConnected && mongoose.connection.readyState === 1) {
    console.log('📦 Using existing MongoDB connection');
    return mongoose.connection;
  }

  try {
    // Disconnect if in a bad state
    if (mongoose.connection.readyState === 2 || mongoose.connection.readyState === 3) {
      await mongoose.disconnect();
    }

    // Set mongoose options for serverless
    mongoose.set('strictQuery', false);
    
    const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery', {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      maxPoolSize: 1,
      minPoolSize: 0,
      bufferCommands: false,
    });

    isConnected = conn.connection.readyState === 1;
    console.log('✅ MongoDB Connected:', conn.connection.host);
    return conn.connection;
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    isConnected = false;
    throw error; // Throw so handlers can catch and respond properly
  }
};

module.exports = connectDB;
