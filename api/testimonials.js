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
    
    const Testimonial = mongoose.models.Testimonial || mongoose.model('Testimonial', new mongoose.Schema({
      name: String,
      content: String,
      rating: Number,
      center: String,
      image: String,
      date: { type: Date, default: Date.now }
    }, { collection: 'testimonials' }));
    
    if (req.method === 'GET') {
      const testimonials = await Testimonial.find({}).sort({ date: -1 });
      res.status(200).json({
        success: true,
        count: testimonials.length,
        data: testimonials
      });
    } else if (req.method === 'POST') {
      const testimonial = new Testimonial(req.body);
      await testimonial.save();
      res.status(201).json({
        success: true,
        message: 'Testimonial added successfully',
        data: testimonial
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Testimonials API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
