const express = require('express');
const router = express.Router();
const appointmentsController = require('../controllers/appointmentsController');

// POST /api/appointments - Create new appointment
router.post('/', appointmentsController.createAppointment);

// GET /api/appointments - Get all appointments (admin use)
router.get('/', appointmentsController.getAllAppointments);

module.exports = router;
