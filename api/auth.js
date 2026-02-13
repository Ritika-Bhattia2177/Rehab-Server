const connectDB = require('../config/database');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  role: { type: String, default: 'user' }
});

module.exports = async (req, res) => {
  try {
    await connectDB();
    
    const User = mongoose.models.User || mongoose.model('User', userSchema, 'users');
    
    if (req.method === 'POST') {
      const { action, email, password, name } = req.body;
      
      if (action === 'register') {
        // Register new user
        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ error: 'User already exists' });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ email, password: hashedPassword, name });
        await user.save();
        
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET || 'default-secret',
          { expiresIn: '24h' }
        );
        
        res.status(201).json({ 
          message: 'User registered successfully',
          token,
          user: { id: user._id, email: user.email, name: user.name }
        });
      } else if (action === 'login') {
        // Login user
        const user = await User.findOne({ email });
        if (!user) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const isValidPassword = await bcrypt.compare(password, user.password);
        if (!isValidPassword) {
          return res.status(401).json({ error: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
          { userId: user._id, email: user.email },
          process.env.JWT_SECRET || 'default-secret',
          { expiresIn: '24h' }
        );
        
        res.status(200).json({
          message: 'Login successful',
          token,
          user: { id: user._id, email: user.email, name: user.name }
        });
      } else {
        res.status(400).json({ error: 'Invalid action' });
      }
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Auth API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
