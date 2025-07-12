// server/app.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// Route Imports
const authRoutes = require('../routes/auth');
const cardRoutes = require('../routes/cardRoutes');
const newsRoutes = require('../routes/newsRoutes');
const blogRoutes = require('../routes/blogRoutes');
const courseRoutes = require('../routes/courseRoutes');
const featuredListingRoutes = require('../routes/featuredListingRoutes');
const stripeRoutes = require('../routes/stripe');
const directoryRoutes = require('../routes/directoryRoutes');
const newsletterRoutes = require('../routes/newsletterRoutes');
const contactRoutes = require('../routes/contactRoutes');

const app = express();

// Middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api', authRoutes);
app.use('/api', stripeRoutes);
app.use('/card', cardRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/featured-listings', featuredListingRoutes);
app.use('/api/directory', directoryRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/contact', contactRoutes);

// MongoDB Connection (run once only)
let isConnected = false;
async function connectDB() {
  if (isConnected) return;
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    isConnected = true;
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

// Export for Vercel
module.exports = { app, connectDB };
