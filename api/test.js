module.exports = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Test endpoint is working!',
    timestamp: new Date().toISOString()
  });
};
