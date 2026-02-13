const connectDB = require('../config/database');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  try {
    await connectDB();
    
    const Inquiry = mongoose.models.Inquiry || mongoose.model('Inquiry', new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      center: String,
      inquiryType: String,
      message: String,
      status: { type: String, default: 'new' },
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'inquiries' }));
    
    if (req.method === 'GET') {
      const inquiries = await Inquiry.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: inquiries.length,
        data: inquiries
      });
    } else if (req.method === 'POST') {
      const inquiry = new Inquiry(req.body);
      await inquiry.save();
      res.status(201).json({
        success: true,
        message: 'Inquiry submitted successfully',
        data: inquiry
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Inquiries API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
