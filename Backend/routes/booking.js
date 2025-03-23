// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Handle booking requests
router.post('/book', async (req, res) => {
  try {
    const { user, driver, pickupLocation, dropOffLocation, distance, estimatedPrice, vehicleType, surgeMultiplier } = req.body;

    // Validate the incoming data
    if (!pickupLocation || !dropOffLocation || !distance || !vehicleType) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Create a new booking
    const newBooking = new Booking({
      user: mongoose.Types.ObjectId(user), // Ensure the user is passed as ObjectId
      driver: driver ? mongoose.Types.ObjectId(driver) : null, // Optionally, include driver
      pickupLocation: {
        type: 'Point',
        coordinates: pickupLocation
      },
      dropOffLocation: {
        type: 'Point',
        coordinates: dropOffLocation
      },
      distance,
      estimatedPrice,
      vehicleType,
      surgeMultiplier: surgeMultiplier || 1.0 // Default surgeMultiplier to 1 if not provided
    });

    // Save the booking in the database
    const savedBooking = await newBooking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    console.error('Error saving booking:', error);
    res.status(500).json({ error: 'An error occurred while saving the booking.' });
  }
});

module.exports = router;
