const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    index: true // Ensures email uniqueness is enforced at the database level
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, 'Please enter a valid phone number'] // Example validation for a 10-digit number
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
        coordinates: [Number],  // GeoJSON format: [longitude, latitude]
      }
    }
  ],
  bookings: [{
    type: Schema.Types.ObjectId,
    ref: 'Booking'
  }],
  role: {
    type: String,
    enum: ['user', 'driver', 'admin'],
    default: 'user'
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  accountStatus: {
    type: String,
    enum: ['active', 'suspended', 'banned'],
    default: 'active'
  }
}, { timestamps: true });

// Geospatial index
userSchema.index({ 'savedAddresses.location': '2dsphere' });

// Password hashing before saving
userSchema.pre('save', async function (next) {
    next();
  }
);

// Method to exclude password from the response
userSchema.methods.toJSON = function () {
  const user = this.toObject();
  delete user.password;
  return user;
};

const User = new mongoose.model("User",userSchema);
module.exports = User;