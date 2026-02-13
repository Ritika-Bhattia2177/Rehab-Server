const connectDB = require('../config/database');
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
    
    const Consultation = mongoose.models.Consultation || mongoose.model('Consultation', new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      preferredDate: Date,
      preferredTime: String,
      concern: String,
      message: String,
      consultationType: String,
      status: { type: String, default: 'pending' },
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'consultations' }));
    
    if (req.method === 'GET') {
      const consultations = await Consultation.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: consultations.length,
        data: consultations
      });
    } else if (req.method === 'POST') {
      const consultation = new Consultation(req.body);
      await consultation.save();
      res.status(201).json({
        success: true,
        message: 'Consultation request submitted successfully',
        data: consultation
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Consultations API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
