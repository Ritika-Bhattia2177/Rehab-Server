require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

async function fixAndTest() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected\n');

    const User = mongoose.model('User', new mongoose.Schema({
      name: String,
      email: String,
      password: String,
      role: String,
      phone: String,
      isActive: Boolean,
      lastLogin: Date,
      createdAt: Date
    }));

    // Delete and recreate users WITHOUT the pre-save hook
    await User.deleteMany({});
    console.log('🗑️  Cleared users');

    const salt = await bcrypt.genSalt(10);
    
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@hopepath.com',
      password: await bcrypt.hash('admin123', salt),
      role: 'admin',
      phone: '+91 98765 00000',
      isActive: true,
      createdAt: new Date()
    });
    
    const patient = await User.create({
      name: 'Test Patient',
      email: 'patient@test.com',
      password: await bcrypt.hash('patient123', salt),
      role: 'patient',
      phone: '+91 98765 11111',
      isActive: true,
      createdAt: new Date()
    });
    
    console.log('✅ Created users');
    
    // Test immediately
    const testAdmin = await User.findOne({ email: 'admin@hopepath.com' });
    const testPatient = await User.findOne({ email: 'patient@test.com' });
    
    const adminMatch = await bcrypt.compare('admin123', testAdmin.password);
    const patientMatch = await bcrypt.compare('patient123', testPatient.password);
    
    console.log('\n🧪 Testing:');
    console.log(`Admin (admin@hopepath.com): ${adminMatch ? '✅ PASS' : '❌ FAIL'}`);
    console.log(`Patient (patient@test.com): ${patientMatch ? '✅ PASS' : '❌ FAIL'}`);
    
    if (adminMatch && patientMatch) {
      console.log('\n✅✅✅ ALL PASSWORDS WORKING!');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

fixAndTest();
