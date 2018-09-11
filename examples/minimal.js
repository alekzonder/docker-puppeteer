const puppeteer = require('puppeteer');

(async() => {

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  await page.goto('https://www.google.com/', { waitUntil: 'networkidle2' });
  
  // Print first 1000 characters of DOM content
  console.log((await page.content()).substring(0, 1000));
  await browser.close();
  
})();
