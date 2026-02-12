const Testimonial = require('../models/Testimonial');

// Get all active testimonials
exports.getAllTestimonials = async (req, res) => {
  try {
    const testimonials = await Testimonial.find({ isActive: true })
      .sort({ createdAt: -1 })
      .limit(20);

    res.json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (error) {
    console.error('Error fetching testimonials:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch testimonials'
    });
  }
};

// Create a new testimonial (for admin use)
exports.createTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.create(req.body);

    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (error) {
    console.error('Error creating testimonial:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create testimonial'
    });
  }
};
