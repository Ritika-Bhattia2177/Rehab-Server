const Newsletter = require('../models/Newsletter');

// @desc    Subscribe to newsletter
// @route   POST /api/newsletter/subscribe
// @access  Public
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    // Validate email
    if (!email) {
      return res.status(400).json({
        success: false,
        message: 'Please provide an email address'
      });
    }

    // Check if email already exists
    const existingSubscription = await Newsletter.findOne({ email: email.toLowerCase() });
    
    if (existingSubscription) {
      if (existingSubscription.isActive) {
        return res.status(400).json({
          success: false,
          message: 'This email is already subscribed to our newsletter'
        });
      } else {
        // Reactivate subscription
        existingSubscription.isActive = true;
        existingSubscription.subscribedAt = Date.now();
        await existingSubscription.save();
        
        return res.status(200).json({
          success: true,
          message: 'Successfully resubscribed to our newsletter!'
        });
      }
    }

    // Create new subscription
    const subscription = await Newsletter.create({
      email: email.toLowerCase()
    });

    res.status(201).json({
      success: true,
      message: 'Successfully subscribed to our newsletter!',
      data: {
        email: subscription.email,
        subscribedAt: subscription.subscribedAt
      }
    });

  } catch (error) {
    console.error('Newsletter subscription error:', error);
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Please provide a valid email address'
      });
    }

    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your subscription. Please try again later.'
    });
  }
};

// @desc    Get all newsletter subscriptions (admin)
// @route   GET /api/newsletter/subscriptions
// @access  Private/Admin
exports.getAllSubscriptions = async (req, res) => {
  try {
    const subscriptions = await Newsletter.find({ isActive: true })
      .sort('-subscribedAt')
      .select('email subscribedAt');

    res.status(200).json({
      success: true,
      count: subscriptions.length,
      data: subscriptions
    });

  } catch (error) {
    console.error('Error fetching subscriptions:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching subscriptions'
    });
  }
};

// @desc    Unsubscribe from newsletter
// @route   POST /api/newsletter/unsubscribe
// @access  Public
exports.unsubscribe = async (req, res) => {
  try {
    const { email } = req.body;

    const subscription = await Newsletter.findOne({ email: email.toLowerCase() });

    if (!subscription) {
      return res.status(404).json({
        success: false,
        message: 'Email not found in our subscription list'
      });
    }

    subscription.isActive = false;
    await subscription.save();

    res.status(200).json({
      success: true,
      message: 'Successfully unsubscribed from our newsletter'
    });

  } catch (error) {
    console.error('Unsubscribe error:', error);
    res.status(500).json({
      success: false,
      message: 'An error occurred while processing your request'
    });
  }
};
