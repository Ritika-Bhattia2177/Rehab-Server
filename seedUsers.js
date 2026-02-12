require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

async function seedUsers() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/hopepath_recovery');
    console.log('📦 Connected to MongoDB');

    // Clear existing users
    await User.deleteMany({});
    console.log('🗑️  Cleared existing users');

    // Create admin user (password will be hashed by pre-save middleware)
    const admin = new User({
      name: 'Admin User',
      email: 'admin@hopepath.com',
      password: 'admin123',
      role: 'admin',
      phone: '+91 98765 00000',
      isActive: true
    });
    await admin.save();
    console.log('✅ Created admin user');

    // Create patient user
    const patient = new User({
      name: 'Test Patient',
      email: 'patient@test.com',
      password: 'patient123',
      role: 'patient',
      phone: '+91 98765 11111',
      isActive: true
    });
    await patient.save();
    console.log('✅ Created patient user');
    
    // Create Ritika's test account
    const ritika = new User({
      name: 'Ritika',
      email: 'ritika24111@navgurukul.org',
      password: 'ritika123',
      role: 'patient',
      phone: '+91 98765 22222',
      isActive: true
    });
    await ritika.save();
    console.log('✅ Created Ritika test account');

    // Create another NavGurukul test account
    const navgurukul = new User({
      name: 'NavGurukul User',
      email: 'ritika2984@navgurukul.org',
      password: 'navguru123',
      role: 'patient',
      phone: '+91 98765 33333',
      isActive: true
    });
    await navgurukul.save();
    console.log('✅ Created NavGurukul test account');
    
    // Verify the password immediately
    const testMatch = await patient.comparePassword('patient123');
    console.log('✅ Password verification test:', testMatch ? 'PASSED' : 'FAILED');

    console.log('\n🎉 User seeding completed successfully!');
    console.log('\n📝 Test Credentials:');
    console.log('Admin: admin@hopepath.com / admin123');
    console.log('Patient: patient@test.com / patient123');
    console.log('Ritika: ritika24111@navgurukul.org / ritika123');
    console.log('NavGurukul: ritika2984@navgurukul.org / navguru123');

    mongoose.connection.close();
    console.log('👋 Database connection closed');
  } catch (error) {
    console.error('❌ Error seeding users:', error);
    process.exit(1);
  }
}

seedUsers();
