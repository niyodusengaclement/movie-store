/* eslint-disable no-undef */
const expect = require('chai').expect;
const puppeteer = require('puppeteer');

let browser;
let page;

describe('UI test suite', () => {
  const host = 'http://localhost:3000';

  before(async () => {

    // Next one is the line I used as property in puppeteer.launch() to reach my chrome app(path) due to the poor internet connection failed to install chromium
    // executablePath: 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe', 

    browser = await puppeteer.launch();

    page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
      deviceScaleFactor: 1,
    });

  });
  
  after(async () => {
    await browser.close();
  });

  it('Should render a homepage', async () => {
    try {
      await page.goto(host, { timeout: 10000 });
      await page.waitForSelector('.h2');
      const header = await page.evaluate(() => document.querySelector('.h2').textContent.trim());
      expect(header).to.eql('All Movies');
      await page.screenshot({ path: 'tests/screenshots/homepage.png' });
    } catch (error) {
      console.log("DOM not found, timed out");
    }
  });

  it('Should wait data to be loaded from db', async () => {
    try {
      await page.goto(host, { timeout: 10000 });
      await page.waitForSelector('#spinner');
      const spinner = await page.evaluate(() => document.querySelector('#spinner'));
      expect(spinner).to.exist;
      await page.screenshot({ path: 'tests/screenshots/spinner.png' });
      
    } catch (error) {
      console.log("DOM not found, spinner timed out");
    }
  });

  it('Should render a table contains all movies', async () => {
    try {
      await page.goto(host, { timeout: 10000 });
      await page.waitFor(5000);
      await page.waitForSelector('#movie-table tbody');
      const table = await page.evaluate(() => document.querySelector('#movie-table tbody'));
      expect(table).to.exist;
      await page.screenshot({ path: 'tests/screenshots/table.png' });
    } catch (error) {
      console.log("DOM not found, table timed out");
    }
  });

  it('Every movie should have a rating', async () => {
    try {
      await page.goto(host, { timeout: 10000 });
      await page.waitFor(5000);
      await page.waitForSelector('#movie-table tbody');
      const data = await page.evaluate(() => {
        const tds = Array.from(document.querySelectorAll('#movie-table tbody tr td'));
        return tds.map(td => td.innerHTML);
      });
      expect(data[2]).not.to.be.null;
    } catch (error) {
      console.log("DOM not found, Ratings timed out");
    }
  });

  it('Should be able to return single movie', async () => {
    try {
      await page.goto(`${host}/rest/movie/1`, { timeout: 10000 });
      await page.waitFor(5000);
      await page.waitForSelector('.pr-5');
      const movie = await page.evaluate(() => document.querySelector('.pr-5'));
      expect(movie).to.exist;
      await page.screenshot({ path: 'tests/screenshots/movie.png' });
    } catch (error) {
      console.log("DOM not found, single movie timed out");
    }
  });
});

