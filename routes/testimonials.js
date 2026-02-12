const express = require('express');
const router = express.Router();
const testimonialsController = require('../controllers/testimonialsController');

// GET /api/testimonials - Get all testimonials
router.get('/', testimonialsController.getAllTestimonials);

// POST /api/testimonials - Create new testimonial (admin use)
router.post('/', testimonialsController.createTestimonial);

module.exports = router;
