const { Op } = require('sequelize');
const JobPosting = require('../models/JobPosting');
const Company = require('../models/Company');

async function getAllJobs({ keyword, location, page = 1, limit = 10 }) {
  const offset = (page - 1) * limit;
  const whereClause = {};

  if (keyword) {
    whereClause[Op.or] = [
      { title: { [Op.like]: `%${keyword}%` } },
      { companyName: { [Op.like]: `%${keyword}%` } },
    ];
  }

  if (location) {
    whereClause.location = { [Op.like]: `%${location}%` };
  }

  try {
    const { count, rows } = await JobPosting.findAndCountAll({
      where: whereClause,
      limit,
      offset,
      order: [['postedDate', 'DESC']],
    });

    return {
      totalItems: count,
      totalPages: Math.ceil(count / limit),
      currentPage: parseInt(page, 10),
      jobs: rows,
    };
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw new Error('Could not retrieve jobs from the database.');
  }
}

async function getStats() {
  try {
    const totalJobs = await JobPosting.count();
    const totalCompanies = await Company.count();
    return { totalJobs, totalCompanies };
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Could not retrieve stats from the database.');
  }
}

module.exports = { getAllJobs, getStats };