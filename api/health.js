module.exports = (req, res) => {
  res.status(200).json({
    status: 'healthy',
    message: 'API is running',
    timestamp: new Date().toISOString(),
    database: process.env.MONGODB_URI ? 'configured' : 'not configured'
  });
};
