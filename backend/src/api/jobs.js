const express = require('express');
const { getAllJobs } = require('../services/jobService');

const router = express.Router();

router.get('/jobs', async (req, res) => {
  try {
    const { keyword, location, page, limit } = req.query;
    const result = await getAllJobs({ keyword, location, page, limit });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching jobs.', error: error.message });
  }
});

module.exports = router;
