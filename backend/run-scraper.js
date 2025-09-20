const { scrapeAndSave } = require('./src/scraper/scraper');
const sequelize = require('./src/config/database');

const run = async () => {
  try {
    await scrapeAndSave();
  } catch (error) {
    console.error("Scraper execution failed:", error);
  } finally {
    await sequelize.close();
  }
};

run();
