const express = require('express');
const router = express.Router();
const staffController = require('../controllers/staffController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', staffController.getAllStaff);
router.get('/:id', staffController.getStaffById);
router.post('/', protect, authorize('admin'), staffController.createStaff);
router.put('/:id', protect, authorize('admin'), staffController.updateStaff);
router.delete('/:id', protect, authorize('admin'), staffController.deleteStaff);

module.exports = router;
