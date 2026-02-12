const express = require('express');
const router = express.Router();
const messagesController = require('../controllers/messagesController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', messagesController.createMessage);
router.get('/', protect, authorize('admin'), messagesController.getAllMessages);
router.get('/:id', protect, authorize('admin'), messagesController.getMessageById);
router.put('/:id/status', protect, authorize('admin'), messagesController.updateMessageStatus);
router.delete('/:id', protect, authorize('admin'), messagesController.deleteMessage);

module.exports = router;
