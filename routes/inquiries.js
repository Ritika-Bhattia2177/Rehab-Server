const express = require('express');
const router = express.Router();
const {
  submitInquiry,
  getInquiries,
  updateInquiryStatus
} = require('../controllers/inquiriesController');

// Public routes
router.post('/', submitInquiry);

// Admin routes (would need auth middleware in production)
router.get('/', getInquiries);
router.put('/:id', updateInquiryStatus);

module.exports = router;
