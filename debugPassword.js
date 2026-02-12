require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function debug() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected to MongoDB\n');

    const user = await User.findOne({ email: 'admin@hopepath.com' });
    
    if (!user) {
      console.log('❌ User not found');
      mongoose.connection.close();
      return;
    }
    
    console.log('User found:');
    console.log('Email:', user.email);
    console.log('Password hash:', user.password);
    console.log('Hash length:', user.password.length);
    console.log('Hash starts with $2b$:', user.password.startsWith('$2b$'));
    
    const testPasswords = ['admin123', 'Admin123', 'ADMIN123'];
    
    console.log('\nTesting passwords:');
    for (const pwd of testPasswords) {
      const match1 = await user.comparePassword(pwd);
      const match2 = await bcrypt.compare(pwd, user.password);
      console.log(`  "${pwd}": comparePassword=${match1}, bcrypt.compare=${match2}`);
    }
    
    // Try creating a fresh hash
    console.log('\n🔧 Creating test hash for "admin123":');
    const salt = await bcrypt.genSalt(10);
    const testHash = await bcrypt.hash('admin123', salt);
    console.log('New hash:', testHash);
    const testMatch = await bcrypt.compare('admin123', testHash);
    console.log('Test match:', testMatch);
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

debug();
