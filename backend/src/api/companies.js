const express = require('express');
const { getAllCompanies } = require('../services/companyService');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const { keyword } = req.query;
    const companies = await getAllCompanies({ keyword });
    res.json(companies);
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ message: 'Error fetching companies' });
  }
});

module.exports = router;
