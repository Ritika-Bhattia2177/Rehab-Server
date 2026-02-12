const mongoose = require('mongoose');
const User = require('./models/User');

async function testLogin() {
  try {
    await mongoose.connect('mongodb://localhost:27017/hopepath_recovery');
    console.log('Connected to database');
    
    const email = 'patient@test.com';
    const password = 'patient123';
    
    const user = await User.findOne({ email });
    console.log('User found:', !!user);
    
    if (user) {
      console.log('User email:', user.email);
      console.log('User active:', user.isActive);
      console.log('Has password:', !!user.password);
      console.log('Password length:', user.password ? user.password.length : 0);
      
      const isMatch = await user.comparePassword(password);
      console.log('Password match:', isMatch);
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

testLogin();
