require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Root route - Backend status
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: '🚀 HopePath Recovery Backend is Running Successfully!',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      health: '/api/health',
      centers: '/api/centers',
      testimonials: '/api/testimonials',
      appointments: '/api/appointments',
      auth: '/api/auth',
      blogs: '/api/blogs',
      resources: '/api/resources'
    }
  });
});

// Health check endpoint  
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    message: 'HopePath Recovery API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Lazy load and initialize database
const initDBMiddleware = async (req, res, next) => {
  try {
    if (!global.dbConnected) {
      const connectDB = require('./config/database');
      await connectDB();
      global.dbConnected = true;
    }
    next();
  } catch (error) {
    console.error('DB connection error:', error.message);
    next(); // Continue even if DB fails
  }
};

// Load routes
const centersRoutes = require('./routes/centers');
const testimonialsRoutes = require('./routes/testimonials');
const appointmentsRoutes = require('./routes/appointments');
const authRoutes = require('./routes/auth');
const staffRoutes = require('./routes/staff');
const servicesRoutes = require('./routes/services');
const resourcesRoutes = require('./routes/resources');
const blogsRoutes = require('./routes/blogs');
const messagesRoutes = require('./routes/messages');
const facilitiesRoutes = require('./routes/facilities');
const inquiriesRoutes = require('./routes/inquiries');
const consultationsRoutes = require('./routes/consultations');
const newsletterRoutes = require('./routes/newsletter');

// API Routes with database middleware
app.use('/api/centers', initDBMiddleware, centersRoutes);
app.use('/api/testimonials', initDBMiddleware, testimonialsRoutes);
app.use('/api/appointments', initDBMiddleware, appointmentsRoutes);
app.use('/api/auth', initDBMiddleware, authRoutes);
app.use('/api/staff', initDBMiddleware, staffRoutes);
app.use('/api/services', initDBMiddleware, servicesRoutes);
app.use('/api/resources', initDBMiddleware, resourcesRoutes);
app.use('/api/blogs', initDBMiddleware, blogsRoutes);
app.use('/api/messages', initDBMiddleware, messagesRoutes);
app.use('/api/facilities', initDBMiddleware, facilitiesRoutes);
app.use('/api/inquiries', initDBMiddleware, inquiriesRoutes);
app.use('/api/consultations', initDBMiddleware, consultationsRoutes);
app.use('/api/newsletter', initDBMiddleware, newsletterRoutes);

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

/*
 ✅ IMPORTANT LOGIC:
 - On Vercel → serverless export is used
 - On Localhost → app.listen() runs
*/
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
  });
}

// ⭐ MOST IMPORTANT FOR VERCEL (DO NOT REMOVE)
module.exports = serverless(app);
