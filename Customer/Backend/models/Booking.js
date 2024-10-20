const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver'
  },
  pickupLocation: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  dropOffLocation: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  distance: {
    type: Number, // Distance in kilometers
    required: true
  },
  estimatedPrice: {
    type: Number,
    required: true
  },
  vehicleType: {
    type: String,
    enum: ['bike', 'car', 'van', 'truck'],
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'in_progress', 'completed', 'canceled'],
    default: 'pending'
  },
  surgeMultiplier: {
    type: Number,
    default: 1.0
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

bookingSchema.index({ user: 1, status: 1 }); // Optimize for active bookings
bookingSchema.index({ driver: 1, status: 1 });
bookingSchema.index({ pickupLocation: '2dsphere', dropOffLocation: '2dsphere' });

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
