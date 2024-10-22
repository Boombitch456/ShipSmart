const mongoose = require('mongoose');

// Driver Schema
const driverSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  vehicleMake: {
    type: String,
    required: true
  },
  vehicleModel: {
    type: String,
    required: true
  },
  vehicleYear: {
    type: String,
    required: true
  },
  licensePlate: {
    type: String,
    required: true
  },
  drivingLicense: {
    type: String,
    required: true
  },
  availability: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['available', 'busy', 'offline'],
    default: 'available'
  },
  rating: {
    type: Number,
    default: 5
  },
  totalTrips: {
    type: Number,
    default: 0
  },
  earnings: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Driver = mongoose.model('Driver', driverSchema);
module.exports = Driver;
