const Appointment = require('../models/Appointment');

// Create a new appointment
exports.createAppointment = async (req, res) => {
  try {
    const { name, email, phone, appointmentType, preferredDate, preferredTime, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone || !appointmentType || !preferredDate || !preferredTime) {
      return res.status(400).json({
        success: false,
        error: 'Please provide all required fields'
      });
    }

    // Create appointment
    const appointment = await Appointment.create({
      name,
      email,
      phone,
      appointmentType,
      preferredDate,
      preferredTime,
      message
    });

    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully! We will contact you soon.',
      data: appointment
    });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to book appointment. Please try again.'
    });
  }
};

// Get all appointments (for admin use)
exports.getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: appointments.length,
      data: appointments
    });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch appointments'
    });
  }
};
