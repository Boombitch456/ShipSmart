const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); // Load environment variables
const app = express();


// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS
const userRoutes = require('./routes/user');
app.use('/user', userRoutes);  // This makes the user routes accessible at /user
const driverRoutes = require('./routes/driver'); // Import driver routes
app.use('/driver', driverRoutes); // This makes the driver routes accessible at /driver

const bookingRoutes = require('./routes/booking'); // Adjust path as necessaryb 
app.use('/booking', bookingRoutes);


// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/logistics_platform')
.then(() => console.log('MongoDB connected...'))
.catch(err => console.error('MongoDB connection error:', err));

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Logistics Platform API');
});

// Error handling middleware (Optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
