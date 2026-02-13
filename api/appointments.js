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
    
    const Appointment = mongoose.models.Appointment || mongoose.model('Appointment', new mongoose.Schema({
      name: String,
      email: String,
      phone: String,
      center: String,
      preferredDate: Date,
      preferredTime: String,
      treatmentType: String,
      message: String,
      status: { type: String, default: 'pending' },
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'appointments' }));
    
    if (req.method === 'GET') {
      const appointments = await Appointment.find({}).sort({ createdAt: -1 });
      res.status(200).json({
        success: true,
        count: appointments.length,
        data: appointments
      });
    } else if (req.method === 'POST') {
      const appointment = new Appointment(req.body);
      await appointment.save();
      res.status(201).json({
        success: true,
        message: 'Appointment booked successfully',
        data: appointment
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Appointments API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
