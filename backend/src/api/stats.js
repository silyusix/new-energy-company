const express = require('express');
const { getStats } = require('../services/jobService');

const router = express.Router();

router.get('/stats', async (req, res) => {
  try {
    const stats = await getStats();
    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'An error occurred while fetching stats.', error: error.message });
  }
});

module.exports = router;
