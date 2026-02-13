const connectDB = require('../../config/database');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    await connectDB();
    
    const Newsletter = mongoose.models.Newsletter || mongoose.model('Newsletter', new mongoose.Schema({
      email: { type: String, required: true, unique: true },
      subscribed: { type: Boolean, default: true },
      subscribedAt: { type: Date, default: Date.now }
    }, { collection: 'newsletter' }));
    
    if (req.method === 'POST') {
      const { email } = req.body;
      
      if (!email) {
        return res.status(400).json({ 
          success: false, 
          error: 'Email is required' 
        });
      }
      
      // Check if already subscribed
      const existing = await Newsletter.findOne({ email });
      if (existing) {
        return res.status(200).json({
          success: true,
          message: 'You are already subscribed to our newsletter'
        });
      }
      
      const subscriber = new Newsletter({ email });
      await subscriber.save();
      
      res.status(201).json({
        success: true,
        message: 'Successfully subscribed to newsletter'
      });
    } else if (req.method === 'GET') {
      const subscribers = await Newsletter.find({ subscribed: true });
      res.status(200).json({
        success: true,
        count: subscribers.length,
        data: subscribers
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Newsletter API error:', error);
    res.status(500).json({ 
      success: false,
      error: 'Internal server error', 
      message: error.message 
    });
  }
};
