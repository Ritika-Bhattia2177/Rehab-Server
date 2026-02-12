const express = require('express');
const router = express.Router();
const servicesController = require('../controllers/servicesController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', servicesController.getAllServices);
router.get('/:id', servicesController.getServiceById);
router.post('/', protect, authorize('admin'), servicesController.createService);
router.put('/:id', protect, authorize('admin'), servicesController.updateService);
router.delete('/:id', protect, authorize('admin'), servicesController.deleteService);
router.post('/:id/enroll', servicesController.enrollService);

module.exports = router;
