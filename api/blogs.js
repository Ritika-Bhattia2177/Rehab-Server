const connectDB = require('../config/database');
const mongoose = require('mongoose');

module.exports = async (req, res) => {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  try {
    await connectDB();
    
    const Blog = mongoose.models.Blog || mongoose.model('Blog', new mongoose.Schema({
      title: String,
      content: String,
      author: String,
      category: String,
      image: String,
      createdAt: { type: Date, default: Date.now }
    }, { collection: 'blogs' }));
    
    if (req.method === 'GET') {
      const blogs = await Blog.find({}).sort({ createdAt: -1 });
      res.status(200).json(blogs);
    } else if (req.method === 'POST') {
      const blog = new Blog(req.body);
      await blog.save();
      res.status(201).json(blog);
    } else {
      res.status(405).json({ error: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Blogs API error:', error);
    res.status(500).json({ error: 'Internal server error', message: error.message });
  }
};
