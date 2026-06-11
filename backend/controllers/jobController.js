const JobRequest = require('../models/JobRequest');

// @desc    Create a new job request
// @route   POST /api/jobs
// @access  Private (Only registered users)
const createJobRequest = async (req, res) => {
  try {
    const { category, title, description, images, coordinates } = req.body;

    const job = await JobRequest.create({
      customer: req.user.id, 
      category,
      title,
      description,
      images,
      location: {
        type: 'Point',
        coordinates: coordinates // [longitude, latitude]
      }
    });

    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all job requests
// @route   GET /api/jobs
// @access  Public/Private
const getAllJobs = async (req, res) => {
  try {
    const jobs = await JobRequest.find().populate('customer', 'name phone');
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createJobRequest,
  getAllJobs
};