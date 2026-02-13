const connectDB = require('../config/database');
const mongoose = require('mongoose');

// Centers data
const centersData = require('../data/centers');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    // Connect to database and wait for connection
    await connectDB();
    
    // Ensure connection is ready
    if (mongoose.connection.readyState !== 1) {
      throw new Error('Database not connected');
    }
    
    // Get or create Centers collection
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
    }, { collection: 'centers', bufferCommands: false }));
    
    if (req.method === 'GET') {
      // Get query parameters
      const { location, city, state } = req.query;
      
      let centers = await Center.find({});
      
      // If no centers or missing Indian centers, seed/update with sample data
      if (centers.length < 18 && centersData && centersData.length > 0) {
        // Clear old data and insert fresh data
        await Center.deleteMany({});
        await Center.insertMany(centersData);
        centers = await Center.find({});
      }
      
      // Filter by location if provided
      if (location) {
        const searchTerm = location.toLowerCase();
        centers = centers.filter(center => {
          const locationMatch = center.location?.toLowerCase().includes(searchTerm);
          const cityMatch = center.city?.toLowerCase().includes(searchTerm);
          const stateMatch = center.state?.toLowerCase().includes(searchTerm);
          const nameMatch = center.name?.toLowerCase().includes(searchTerm);
          return locationMatch || cityMatch || stateMatch || nameMatch;
        });
      }
      
      // Filter by city if provided
      if (city) {
        centers = centers.filter(center => 
          center.city?.toLowerCase().includes(city.toLowerCase())
        );
      }
      
      // Filter by state if provided
      if (state) {
        centers = centers.filter(center => 
          center.state?.toLowerCase().includes(state.toLowerCase())
        );
      }
      
      res.status(200).json({
        success: true,
        count: centers.length,
        data: centers
      });
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Centers API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
