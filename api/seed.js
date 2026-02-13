const connectDB = require('../config/database');
const mongoose = require('mongoose');
const centersData = require('../data/centers');

module.exports = async (req, res) => {
  try {
    await connectDB();
    
    const Center = mongoose.models.Center || mongoose.model('Center', new mongoose.Schema({
      name: String,
      city: String,
      state: String,
      location: String,
      description: String,
      rating: Number,
      reviews: Number,
      beds: Number,
      specialties: [String],
      treatmentTypes: [String],
      isPremium: Boolean,
      isVerified: Boolean,
      acceptsInsurance: Boolean,
      image: String,
      facilities: [String],
      price: String
    }, { collection: 'centers' }));
    
    if (req.method === 'POST') {
      // Clear existing data
      await Center.deleteMany({});
      
      // Insert new data
      await Center.insertMany(centersData);
      
      const count = await Center.countDocuments();
      
      res.status(200).json({
        success: true,
        message: 'Database seeded successfully',
        count: count
      });
    } else {
      res.status(405).json({ error: 'Use POST method to seed database' });
    }
  } catch (error) {
    console.error('Seed API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
