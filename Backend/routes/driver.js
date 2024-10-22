const express = require('express');
const bcrypt = require('bcryptjs');
const Driver = require('../models/Driver'); // Import your Driver model
const router = express.Router();

// Driver Registration Route
router.post('/signup', async (req, res) => {
  const { name, email, phone, password, vehicleMake, vehicleModel, vehicleYear, licensePlate, drivingLicense, availability } = req.body;

  try {
    // Check if the driver already exists
    const existingDriver = await Driver.findOne({ email });
    if (existingDriver) {
      return res.status(400).json({ message: 'Driver already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new driver
    const newDriver = new Driver({
      name,
      email,
      phoneNumber: phone,
      password: hashedPassword,
      vehicleMake,
      vehicleModel,
      vehicleYear,
      licensePlate,
      drivingLicense,
      availability,
    });

    // Save the driver to MongoDB
    await newDriver.save(); 
    res.status(201).json({ message: 'Driver registered successfully' });
  } catch (error) {
    console.error('Error registering driver:', error);
    res.status(500).json({ message: 'Error registering driver', error });
  }
});

module.exports = router;
