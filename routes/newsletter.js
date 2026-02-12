const express = require('express');
const router = express.Router();
const {
  subscribe,
  getAllSubscriptions,
  unsubscribe
} = require('../controllers/newsletterController');

// Public routes
router.post('/subscribe', subscribe);
router.post('/unsubscribe', unsubscribe);

// Admin route (you can add auth middleware later)
router.get('/subscriptions', getAllSubscriptions);

module.exports = router;
