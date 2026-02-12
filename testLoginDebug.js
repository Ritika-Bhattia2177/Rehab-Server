require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected to MongoDB\n');

    // Test credentials
    const testCreds = [
      { email: 'admin@hopepath.com', password: 'admin123' },
      { email: 'patient@test.com', password: 'patient123' }
    ];

    for (const cred of testCreds) {
      console.log(`\n🔍 Testing: ${cred.email}`);
      console.log('─'.repeat(50));
      
      const user = await User.findOne({ email: cred.email });
      
      if (!user) {
        console.log('❌ User NOT FOUND in database');
        continue;
      }
      
      console.log('✅ User found in database');
      console.log(`   Name: ${user.name}`);
      console.log(`   Email: ${user.email}`);
      console.log(`   Role: ${user.role}`);
      console.log(`   Active: ${user.isActive}`);
      console.log(`   Password hash: ${user.password.substring(0, 20)}...`);
      
      // Test password comparison
      const isMatch = await user.comparePassword(cred.password);
      console.log(`\n🔑 Password check for "${cred.password}": ${isMatch ? '✅ PASSED' : '❌ FAILED'}`);
      
      // Also test with bcrypt directly
      const directMatch = await bcrypt.compare(cred.password, user.password);
      console.log(`🔑 Direct bcrypt check: ${directMatch ? '✅ PASSED' : '❌ FAILED'}`);
      
      if (!isMatch) {
        console.log('\n⚠️  PASSWORD MISMATCH - Need to reseed!');
      }
    }

    console.log('\n' + '='.repeat(50));
    console.log('📊 Database User Count:', await User.countDocuments());
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

testLogin();
