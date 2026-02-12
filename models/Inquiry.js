const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['program_inquiry', 'visit_schedule'],
    required: true
  },
  programName: {
    type: String,
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
    lowercase: true,
    trim: true
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
  message: {
    type: String,
    trim: true
  },
  status: {
    type: String,
    enum: ['pending', 'contacted', 'scheduled', 'completed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Inquiry', inquirySchema);
