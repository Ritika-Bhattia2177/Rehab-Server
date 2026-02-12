const centersData = require('../data/rehabCenters');

// Get all centers with optional filtering
const getAllCenters = (req, res) => {
  try {
    const { category, location, minRating, premium } = req.query;
    let filteredCenters = [...centersData];

    // Filter by category
    if (category && category !== 'all') {
      filteredCenters = filteredCenters.filter(center => 
        center.specialties.some(spec => 
          spec.toLowerCase().includes(category.toLowerCase())
        )
      );
    }

    // Filter by location (searches both city and state - case insensitive)
    if (location) {
      const searchTerm = location.toLowerCase().trim();
      filteredCenters = filteredCenters.filter(center => {
        const city = center.city ? center.city.toLowerCase() : '';
        const state = center.state ? center.state.toLowerCase() : '';
        
        return city.includes(searchTerm) || state.includes(searchTerm);
      });
    }

    // Filter by minimum rating
    if (minRating) {
      const rating = parseFloat(minRating);
      filteredCenters = filteredCenters.filter(center => center.rating >= rating);
    }

    // Filter by premium status
    if (premium === 'true') {
      filteredCenters = filteredCenters.filter(center => center.isPremium);
    }

    res.json({
      success: true,
      count: filteredCenters.length,
      data: filteredCenters
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch centers'
    });
  }
};

// Get center by ID
const getCenterById = (req, res) => {
  try {
    const center = centersData.find(c => c.id === parseInt(req.params.id));
    
    if (!center) {
      return res.status(404).json({
        success: false,
        error: 'Center not found'
      });
    }

    res.json({
      success: true,
      data: center
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch center'
    });
  }
};

// Search centers
const searchCenters = (req, res) => {
  try {
    const { query, category } = req.query;
    
    if (!query) {
      return res.json({
        success: true,
        count: 0,
        data: []
      });
    }

    let results = centersData.filter(center => {
      const matchesQuery = 
        center.name.toLowerCase().includes(query.toLowerCase()) ||
        center.location.toLowerCase().includes(query.toLowerCase()) ||
        center.specialties.some(spec => spec.toLowerCase().includes(query.toLowerCase()));

      const matchesCategory = !category || category === 'all' || 
        center.specialties.some(spec => spec.toLowerCase().includes(category.toLowerCase()));

      return matchesQuery && matchesCategory;
    });

    res.json({
      success: true,
      count: results.length,
      data: results
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Search failed'
    });
  }
};

module.exports = {
  getAllCenters,
  getCenterById,
  searchCenters
};
