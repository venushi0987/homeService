const mongoose = require('mongoose');

const jobRequestSchema = new mongoose.Schema({
  customer: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  category: { 
    type: String, 
    required: [true, 'Please specify a category (e.g., Plumbing, Electrical)'] 
  },
  title: {
    type: String,
    required: [true, 'Please add a short title for the job']
  },
  description: { 
    type: String, 
    required: [true, 'Please add a description of the issue'] 
  },
  images: [{ 
    type: String 
  }],
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'completed', 'cancelled'], 
    default: 'pending' 
  },
  location: {
    type: { 
      type: String, 
      enum: ['Point'], 
      default: 'Point' 
    },
    coordinates: { 
      type: [Number], 
      required: [true, 'Please provide the job location coordinates'] 
    }
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

jobRequestSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('JobRequest', jobRequestSchema);