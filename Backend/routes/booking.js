const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking'); // Adjust the path if necessary
const mongoose = require('mongoose');

// POST route to create a booking
router.post('/book', async (req, res) => {
    try {
      const { user, driver, pickupLocation, dropOffLocation, distance, estimatedPrice, vehicleType, surgeMultiplier, pickupType, scheduledDate } = req.body;
  
      // Validate the incoming data
      if (!pickupLocation || !dropOffLocation || !distance || !vehicleType) {
        return res.status(400).json({ error: 'All fields are required.' });
      }
  
      // Create a new booking
      const newBooking = new Booking({
        user: mongoose.Types.ObjectId(user), // Convert user to ObjectId
        driver: driver ? mongoose.Types.ObjectId(driver) : null, // Optional driver assignment
        pickupLocation: {
          type: 'Point',
          coordinates: pickupLocation // Use the pickup coordinates from request
        },
        dropOffLocation: {
          type: 'Point',
          coordinates: dropOffLocation // Use the drop-off coordinates from request
        },
        distance,
        estimatedPrice,
        vehicleType: vehicleType.toLowerCase(), // Ensure lowercase to match schema
        surgeMultiplier: surgeMultiplier || 1.0, // Default to 1.0 if not provided
        status: 'pending',
        pickupType: pickupType, // Add pickup type (now/later)
        scheduledDate: pickupType === 'later' ? scheduledDate : null, // Set scheduled date if applicable
      });
  
      // Save the booking to the database
      const savedBooking = await newBooking.save();
      res.status(201).json(savedBooking);
    } catch (error) {
      console.error('Error saving booking:', error);
      res.status(500).json({ error: 'An error occurred while saving the booking.' });
    }
  });
  
module.exports = router;
