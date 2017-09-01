const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({
        args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com/', {waitUntil: 'networkidle'});

    await page.screenshot({path: 'google.png'});

    browser.close();

})();
