const express = require('express')
const router = express.Router()
const {
  submitConsultation,
  getConsultations,
  updateConsultationStatus
} = require('../controllers/consultationsController')

// Public routes
router.post('/', submitConsultation)

// Admin routes (in production, add authentication middleware)
router.get('/', getConsultations)
router.put('/:id', updateConsultationStatus)

module.exports = router
