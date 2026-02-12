const Inquiry = require('../models/Inquiry');

// @desc    Submit a program inquiry
// @route   POST /api/inquiries
// @access  Public
exports.submitInquiry = async (req, res) => {
  try {
    const { type, programName, name, email, phone, preferredDate, preferredTime, message } = req.body;

    // Validate required fields
    if (!type || !programName || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      });
    }

    // Create inquiry
    const inquiry = await Inquiry.create({
      type,
      programName,
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Your inquiry has been submitted successfully. We will contact you within 24 hours.',
      data: inquiry
    });

  } catch (error) {
    console.error('Error submitting inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

// @desc    Get all inquiries (admin)
// @route   GET /api/inquiries
// @access  Private/Admin
exports.getInquiries = async (req, res) => {
  try {
    const { type, status } = req.query;
    
    let query = {};
    if (type) query.type = type;
    if (status) query.status = status;

    const inquiries = await Inquiry.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: inquiries.length,
      data: inquiries
    });

  } catch (error) {
    console.error('Error fetching inquiries:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};

// @desc    Update inquiry status (admin)
// @route   PUT /api/inquiries/:id
// @access  Private/Admin
exports.updateInquiryStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const inquiry = await Inquiry.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!inquiry) {
      return res.status(404).json({
        success: false,
        error: 'Inquiry not found'
      });
    }

    res.status(200).json({
      success: true,
      data: inquiry
    });

  } catch (error) {
    console.error('Error updating inquiry:', error);
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    });
  }
};
