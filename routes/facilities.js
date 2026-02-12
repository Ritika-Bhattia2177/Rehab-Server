const express = require('express');
const router = express.Router();
const facilitiesController = require('../controllers/facilitiesController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', facilitiesController.getAllFacilities);
router.post('/', protect, authorize('admin'), facilitiesController.createFacility);

module.exports = router;
