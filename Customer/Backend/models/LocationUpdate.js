const mongoose = require('mongoose');

const locationUpdateSchema = new mongoose.Schema({
  driver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Driver',
    required: true
  },
  location: {
    type: { type: String, enum: ['Point'], required: true },
    coordinates: { type: [Number], required: true }
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

locationUpdateSchema.index({ driver: 1, timestamp: 1 });
locationUpdateSchema.index({ location: '2dsphere' });

const LocationUpdate = mongoose.model('LocationUpdate', locationUpdateSchema);

module.exports = LocationUpdate;
