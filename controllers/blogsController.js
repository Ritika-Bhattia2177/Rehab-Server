const Blog = require('../models/Blog');

// Get all published blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const { category } = req.query;
    const filter = { isPublished: true };
    
    if (category && category !== 'all') {
      filter.category = category;
    }

    const blogs = await Blog.find(filter).sort({ createdAt: -1 });

    res.json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blogs'
    });
  }
};

// Get blog by ID
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error fetching blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch blog'
    });
  }
};

// Create blog (admin)
exports.createBlog = async (req, res) => {
  try {
    const blog = await Blog.create(req.body);

    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to create blog'
    });
  }
};

// Update blog (admin)
exports.updateBlog = async (req, res) => {
  try {
    req.body.updatedAt = Date.now();
    
    const blog = await Blog.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      data: blog
    });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(400).json({
      success: false,
      error: 'Failed to update blog'
    });
  }
};

// Delete blog (admin)
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        error: 'Blog not found'
      });
    }

    res.json({
      success: true,
      message: 'Blog deleted successfully'
    });
  } catch (error) {
    console.error('Error deleting blog:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to delete blog'
    });
  }
};
