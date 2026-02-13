const connectDB = require('../config/database');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    await connectDB();
    
    const Message = mongoose.models.Message || mongoose.model('Message', new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      subject: String,
      message: String,
      status: { type: String, default: 'unread' },
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'messages' }));
    
    if (req.method === 'GET') {
      const messages = await Message.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: messages.length,
        data: messages
      });
    } else if (req.method === 'POST') {
      const message = new Message(req.body);
      await message.save();
      res.status(201).json({
        success: true,
        message: 'Message sent successfully',
        data: message
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Messages API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
