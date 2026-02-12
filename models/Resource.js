const mongoose = require('mongoose');

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['Article', 'PDF', 'Video', 'Guide', 'Infographic']
  },
  link: {
    type: String,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['Recovery', 'Mental Health', 'Family Support', 'Prevention', 'Wellness']
  },
  thumbnail: {
    type: String,
    default: 'https://via.placeholder.com/300x200?text=Resource'
  },
  content: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    trim: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  views: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', resourceSchema);
