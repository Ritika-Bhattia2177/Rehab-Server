const express = require('express');
const router = express.Router();
const centersController = require('../controllers/centersController');

// Get all centers with optional filters
router.get('/', centersController.getAllCenters);

// Get a specific center by ID
router.get('/:id', centersController.getCenterById);

// Search centers
router.get('/search', centersController.searchCenters);

module.exports = router;
