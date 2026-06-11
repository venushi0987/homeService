const express = require('express');
const router = express.Router();
const { createJobRequest, getAllJobs } = require('../controllers/jobController');
const { protect } = require('../middleware/authMiddleware');

// POST /api/jobs - Only logged-in users can create jobs
// GET /api/jobs - Anyone can view jobs
router.route('/')
  .post(protect, createJobRequest)
  .get(getAllJobs);

module.exports = router;