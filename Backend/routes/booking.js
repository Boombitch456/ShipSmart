// routes/booking.js
const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Handle booking requests
router.post('/book', async (req, res) => {
  try {
    const { user, pickupLocation, dropOffLocation, distance, estimatedPrice, vehicleType, surgeMultiplier, pickupType, scheduledDate } = req.body;

    // Check if all required fields are received correctly
    if (!user || !pickupLocation || !dropOffLocation || !distance || !estimatedPrice || !vehicleType) {
      return res.status(400).json({ message: 'Missing required fields.' });
    }

    // Create a new booking
    const newBooking = new Booking({
      user,
      pickupLocation: {
        type: 'Point',
        coordinates: pickupLocation,
      },
      dropOffLocation: {
        type: 'Point',
        coordinates: dropOffLocation,
      },
      distance,
      estimatedPrice,
      vehicleType,
      surgeMultiplier,
      status: 'pending',
      paymentStatus: 'pending',
      createdAt: Date.now(),
      updatedAt: Date.now(),
      ...(pickupType === 'later' && { scheduledDate })
    });

    const savedBooking = await newBooking.save();
    res.status(201).json({ message: 'Booking successful', booking: savedBooking });
  } catch (error) {
    console.error('Booking error:', error);
    res.status(500).json({ message: 'An error occurred during booking' });
  }
});

module.exports = router;
