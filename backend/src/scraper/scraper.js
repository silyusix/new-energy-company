const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const cheerio = require('cheerio');
const JobPosting = require('../models/JobPosting');
const sequelize = require('../config/database');

puppeteer.use(StealthPlugin());

const TARGET_URL = 'https://www.zhipin.com/web/geek/job?query=新能源&city=101040100';

async function scrapeJobs() {
  let browser;
  let page;
  try {
    console.log('Launching stealth browser...');
    browser = await puppeteer.launch({ headless: true }); // Back to headless mode
    page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });

    console.log(`Navigating to ${TARGET_URL}...`);
    await page.goto(TARGET_URL, { waitUntil: 'networkidle2' });

    // --- Handle Popups and wait for content ---
    try {
      console.log('Checking for any popups and waiting for page to settle...');
      // First, try to close the login/interest popup if it appears
      const closeButtonSelector = '.btn-close';
      await page.waitForSelector(closeButtonSelector, { timeout: 5000 });
      await page.click(closeButtonSelector);
      console.log('Popup closed.');
    } catch (e) {
      console.log('No popup appeared or it was already closed.');
    }

    // Add a hardcoded delay to ensure all dynamic content is loaded
    console.log('Waiting for 3 seconds for content to stabilize...');
    await new Promise(resolve => setTimeout(resolve, 3000));
    // --- End Handling ---

    console.log('Page should be ready. Scraping jobs...');
    const content = await page.content();
    const $ = cheerio.load(content);

    const jobs = [];
    $('.job-card-wrapper').each((_idx, el) => {
      const title = $(el).find('.job-name').text().trim();
      const companyName = $(el).find('.company-name').text().trim();
      const salary = $(el).find('.salary').text().trim();
      const location = $(el).find('.job-area').text().trim();
      // Correctly construct the full URL
      const relativeLink = $(el).find('.job-card-left').attr('href');
      const descriptionLink = relativeLink ? `https://www.zhipin.com${relativeLink}` : null;

      if (title && companyName && descriptionLink) {
        jobs.push({ title, companyName, salary, location, descriptionLink, sourceSite: 'Boss Zhipin' });
      }
    });

    console.log(`Found ${jobs.length} jobs. Saving to database...`);
    if (jobs.length > 0) {
      for (const job of jobs) {
        const [jobPost, created] = await JobPosting.findOrCreate({
          where: { descriptionLink: job.descriptionLink },
          defaults: job
        });
        if (created) {
          console.log(`Saved new job: ${job.title}`);
        }
      }
      console.log('Finished saving jobs.');
    } else {
      console.log('No jobs found on the page. The selectors might need an update.');
      await page.screenshot({ path: 'C:\\Users\\唐五岳\\gemini-project\\backend\\no_jobs_found.png' });
      console.log('Screenshot saved to backend/no_jobs_found.png for inspection.');
    }

  } catch (error) {
    console.error(`An error occurred: ${error.message}`);
    if (page) {
      await page.screenshot({ path: 'C:\\Users\\唐五岳\\gemini-project\\backend\\error_screenshot.png' });
      console.log('Error screenshot saved to backend/error_screenshot.png');
    }
  } finally {
    if (browser) {
      await browser.close();
      console.log('Browser closed.');
    }
  }
}

async function run() {
  try {
    await sequelize.authenticate();
    console.log('Database connection established.');
    await scrapeJobs();
  } catch (error) {
    console.error('DB connection error:', error);
  } finally {
    if (sequelize) {
      await sequelize.close();
    }
  }
}

if (require.main === module) {
  run();
}

module.exports = { scrapeJobs };
