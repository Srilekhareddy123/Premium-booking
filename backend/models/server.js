const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');

dotenv.config(); // Load environment variables

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse JSON requests

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// API Routes
const authRoutes = require('./routes/auth'); // Authentication routes
app.use('/api/auth', authRoutes);

const appointmentRoutes = require('./routes/appointment'); // Appointment routes
app.use('/api/appointments', appointmentRoutes);

// Serve Frontend Files
app.use(express.static(path.join(__dirname, '../'))); // Serve static files from the root directory

// Default Route for Root Path
app.get('/', (req, res) => {
  res.send('Welcome to the backend server for Premium Booking!');
});

// Fallback Route for Unmatched Paths
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../index.html'));
});

// Start the Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
