const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Please enter your name'] 
  },
  phone: { 
    type: String, 
    required: [true, 'Please enter your phone number'], 
    unique: true 
  },
  email: { 
    type: String, 
    unique: true, 
    sparse: true 
  },
  password: { 
    type: String, 
    required: [true, 'Please enter a password'] 
  },
  profilePhoto: { 
    type: String, 
    default: "" 
  },
  role: { 
    type: String, 
    enum: ['customer', 'worker', 'admin'], 
    default: 'customer' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  
  workerDetails: {
    isVerified: { type: Boolean, default: false },
    nicNumber: { type: String },
    nicFrontPhoto: { type: String }, 
    nicBackPhoto: { type: String },  
    skills: [{ type: String }],      
    bio: { type: String },
    portfolioPhotos: [{ type: String }], 
    isPremium: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 }
  },

  currentLocation: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point' 
    },
    coordinates: { 
      type: [Number], 
      default: [0, 0] 
    }
  }
});

userSchema.index({ currentLocation: '2dsphere' });

module.exports = mongoose.model('User', userSchema);