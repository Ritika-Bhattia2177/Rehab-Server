const express = require('express');
const router = express.Router();
const resourcesController = require('../controllers/resourcesController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', resourcesController.getAllResources);
router.get('/:id', resourcesController.getResourceById);
router.post('/', protect, authorize('admin'), resourcesController.createResource);
router.put('/:id', protect, authorize('admin'), resourcesController.updateResource);
router.delete('/:id', protect, authorize('admin'), resourcesController.deleteResource);

module.exports = router;
// Generate SEO optimized Programs page for a rehabilitation website.
// Use react-helmet-async.
// Create:
// - Meta title (60 characters)
// - Meta description (150-160 characters)
// - One H1
// - Multiple H2 sections explaining programs
// - Professional content paragraphs
// Include these keywords naturally:
// inpatient rehabilitation program,
// outpatient rehab services,
// detox program for addiction,
// relapse prevention program,
// substance abuse treatment,
// therapy for addiction,
// holistic recovery treatment,
// medical detox center in India.
// Use structured and professional tone.
