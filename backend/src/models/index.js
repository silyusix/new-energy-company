const sequelize = require('../config/database');
const JobPosting = require('./JobPosting');
const Company = require('./Company');

const db = {
  sequelize,
  JobPosting,
  Company,
};

// In the future, associations between models can be defined here. For example:
//
// const CompanyModel = Company(sequelize, DataTypes);
// const JobPostingModel = JobPosting(sequelize, DataTypes);
//
// CompanyModel.hasMany(JobPostingModel);
// JobPostingModel.belongsTo(CompanyModel);

module.exports = db;
