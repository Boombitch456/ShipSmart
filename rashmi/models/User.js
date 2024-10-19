const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  paymentMethods: {
    type: [String],  
    default: []
  },
  savedAddresses: [
    {
      label: String, 
      location: {
        type: { type: String, default: 'Point' },
        coordinates: [Number],  
      }
    }
  ],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }]
});

userSchema.index({ 'savedAddresses.location': '2dsphere' });

module.exports = mongoose.model('User', userSchema);
