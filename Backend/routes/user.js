const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Import your User model
const router = express.Router();

// User Registration Route
router.post('/', async (req, res) => {
  const { name, email, phone, password } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  try {


    // Create new user
    const newUser = new User({
      name,
      email,
      phone,
      password,
    });

    await newUser.save(); // Save user to MongoDB
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error });
  }
});

// User Sign-in Route
router.post('/sign-in', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'User not found' });
    }

    // Directly compare plain text passwords
    if (password !== user.password) {
      console.log(password);
      console.log(user.password);
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If authentication succeeds
    res.status(200).json({ message: 'Sign in successful', user });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error });
  }
});

module.exports = router;
