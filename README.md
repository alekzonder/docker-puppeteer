# puppeteer docker image

docker image with  [Google Puppeteer](https://github.com/GoogleChrome/puppeteer) installed

## docker tags

- latest
- 0 - for zero version
- 0.10.1
- 0.10.0
- 0.9.0

## install

```
docker pull alekzonder/puppeteer:latest
# OR
docker pull alekzonder/puppeteer:0.10.0
# OR
docker pull alekzonder/puppeteer:0

```

## before usage


1. you should pass `--no-sandbox, --disable-setuid-sandbox` args when launch browser

```js
const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
    ]});

    const page = await browser.newPage();

    await page.goto('https://www.google.com/', {waitUntil: 'networkidle'});

    browser.close();

})();
```

2. if you got page crash with `BUS_ADRERR` ([chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=571394)), increase shm-size on docker run with `--shm-size` argument

```
docker run --name pup --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```


3. add `--enable-logging` for chrome debug logging http://www.chromium.org/for-testers/enable-logging

```js
const puppeteer = require('puppeteer');

(async() => {

    const browser = await puppeteer.launch({args: [
        '--no-sandbox',
        '--disable-setuid-sandbox',

        // debug logging
        '--enable-logging', '--v=1'
    ]});


```


## usage

mount your script to /app/index.js

```
docker run --name pup --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

custom script from dir

```
docker run --name pup --shm-size 1G --rm -v <path_to_dir>:/app alekzonder/puppeteer:latest node my_script.js
```
