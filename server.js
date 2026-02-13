require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');
const connectDB = require('./config/database');

// Import routes
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

// Connect to MongoDB
connectDB();

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
  res.json({ status: 'ok', message: 'HopePath Recovery API is running' });
});

// API Routes
app.use('/api/centers', centersRoutes);
app.use('/api/testimonials', testimonialsRoutes);
app.use('/api/appointments', appointmentsRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/staff', staffRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/resources', resourcesRoutes);
app.use('/api/blogs', blogsRoutes);
app.use('/api/messages', messagesRoutes);
app.use('/api/facilities', facilitiesRoutes);
app.use('/api/inquiries', inquiriesRoutes);
app.use('/api/consultations', consultationsRoutes);
app.use('/api/newsletter', newsletterRoutes);

// 404 handler for API routes (must come after all API routes)
app.use('/api/*', (req, res) => {
  res.status(404).json({ error: 'API endpoint not found' });
});

// Serve static files from the React app in production (must come last)
if For local development only
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`🔗 API available at http://localhost:${PORT}/api`);
  });
}

// Export for Vercel serverless deployment
module.exports = serverless(app)