module.exports = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🚀 HopePath Recovery Backend is Running!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      test: '/api/test',
      health: '/api/health',
      centers: '/api/centers',
      testimonials: '/api/testimonials',
      auth: '/api/auth',
      blogs: '/api/blogs'
    }
  });
};
