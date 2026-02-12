const Consultation = require('../models/Consultation')

// Submit a new consultation request
exports.submitConsultation = async (req, res) => {
  try {
    const { type, name, email, phone, preferredDate, preferredTime, concern, message } = req.body

    // Validation
    if (!type || !name || !email || !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields: type, name, email, and phone'
      })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid email address'
      })
    }

    // Validate phone number (basic validation)
    const phoneRegex = /^[0-9]{10,15}$/
    if (!phoneRegex.test(phone.replace(/[-\s()]/g, ''))) {
      return res.status(400).json({
        success: false,
        error: 'Please provide a valid phone number'
      })
    }

    // Create consultation
    const consultation = await Consultation.create({
      type,
      name,
      email,
      phone,
      preferredDate,
      preferredTime,
      concern,
      message
    })

    res.status(201).json({
      success: true,
      message: type === 'call_request' 
        ? 'Your call request has been submitted. We will contact you shortly.'
        : 'Your consultation has been scheduled. We will confirm via email within 24 hours.',
      data: consultation
    })
  } catch (error) {
    console.error('Error submitting consultation:', error)
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    })
  }
}

// Get all consultations (admin)
exports.getConsultations = async (req, res) => {
  try {
    const { type, status } = req.query
    
    let filter = {}
    if (type) filter.type = type
    if (status) filter.status = status

    const consultations = await Consultation.find(filter)
      .sort({ createdAt: -1 })

    res.status(200).json({
      success: true,
      count: consultations.length,
      data: consultations
    })
  } catch (error) {
    console.error('Error fetching consultations:', error)
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    })
  }
}

// Update consultation status (admin)
exports.updateConsultationStatus = async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const consultation = await Consultation.findByIdAndUpdate(
      id,
      { status },
      { new: true, runValidators: true }
    )

    if (!consultation) {
      return res.status(404).json({
        success: false,
        error: 'Consultation not found'
      })
    }

    res.status(200).json({
      success: true,
      data: consultation
    })
  } catch (error) {
    console.error('Error updating consultation:', error)
    res.status(500).json({
      success: false,
      error: 'Server error. Please try again later.'
    })
  }
}
