const Facility = require('../models/Facility');

// Get all active facilities
exports.getAllFacilities = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isActive: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const facilities = await Facility.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: facilities.length,
      data: facilities
    });
  } catch (error) {
    console.error('Error fetching facilities:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch facilities'
    });
  }
};

// Create facility (admin)
exports.createFacility = async (req, res) => {
  try {
    const facility = await Facility.create(req.body);

    res.status(201).json({
      success: true,
      data: facility
    });
  } catch (error) {
    console.error('Error creating facility:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create facility'
    });
  }
};
