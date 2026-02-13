require('dotenv').config();
const express = require('express');
const cors = require('cors');
const serverless = require('serverless-http');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Lazy load database connection
let connectDB;
let dbInitialized = false;

const initDB = async () => {
  if (!dbInitialized && process.env.MONGODB_URI) {
    try {
      if (!connectDB) {
        connectDB = require('./config/database');
      }
      await connectDB();
      dbInitialized = true;
    } catch (error) {
      console.error('DB init error:', error.message);
    }
  }
};

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
  res.json({
    status: 'ok',
    message: 'HopePath Recovery API is running',
    database: dbInitialized ? 'Connected' : 'Not connected',
    timestamp: new Date().toISOString()
  });
});

// API Routes with lazy DB init
app.use('/api/centers', async (req, res, next) => {
  await initDB();
  require('./routes/centers')(req, res, next);
});

app.use('/api/testimonials', async (req, res, next) => {
  await initDB();
  require('./routes/testimonials')(req, res, next);
});

app.use('/api/appointments', async (req, res, next) => {
  await initDB();
  require('./routes/appointments')(req, res, next);
});

app.use('/api/auth', async (req, res, next) => {
  await initDB();
  require('./routes/auth')(req, res, next);
});

app.use('/api/staff', async (req, res, next) => {
  await initDB();
  require('./routes/staff')(req, res, next);
});

app.use('/api/services', async (req, res, next) => {
  await initDB();
  require('./routes/services')(req, res, next);
});

app.use('/api/resources', async (req, res, next) => {
  await initDB();
  require('./routes/resources')(req, res, next);
});

app.use('/api/blogs', async (req, res, next) => {
  await initDB();
  require('./routes/blogs')(req, res, next);
});

app.use('/api/messages', async (req, res, next) => {
  await initDB();
  require('./routes/messages')(req, res, next);
});

app.use('/api/facilities', async (req, res, next) => {
  await initDB();
  require('./routes/facilities')(req, res, next);
});

app.use('/api/inquiries', async (req, res, next) => {
  await initDB();
  require('./routes/inquiries')(req, res, next);
});

app.use('/api/consultations', async (req, res, next) => {
  await initDB();
  require('./routes/consultations')(req, res, next);
});

app.use('/api/newsletter', async (req, res, next) => {
  await initDB();
  require('./routes/newsletter')(req, res, next);
});

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
