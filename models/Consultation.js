const mongoose = require('mongoose')

const consultationSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['call_request', 'consultation'],
    required: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  preferredDate: {
    type: Date
  },
  preferredTime: {
    type: String
  },
  concern: {
    type: String,
    enum: ['substance_abuse', 'alcohol', 'mental_health', 'family_support', 'other'],
    default: 'other'
  },
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed', 'cancelled'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Consultation', consultationSchema)
