const connectDB = require('../config/database');
const mongoose = require('mongoose');

// Centers data
const centersData = require('../data/centers');

module.exports = async (req, res) => {
  try {
    // Connect to database
    await connectDB();
    
    // Get or create Centers collection
    const Center = mongoose.models.Center || mongoose.model('Center', new mongoose.Schema({
      name: String,
      location: String,
      description: String,
      rating: Number,
      image: String,
      facilities: [String],
      price: String
    }, { collection: 'centers' }));
    
    if (req.method === 'GET') {
      const centers = await Center.find({});
      
      // If no centers, seed with sample data
      if (centers.length === 0 && centersData && centersData.length > 0) {
        await Center.insertMany(centersData);
        const newCenters = await Center.find({});
        return res.status(200).json(newCenters);
      }
      
      res.status(200).json(centers);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Centers API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
