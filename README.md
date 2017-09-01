# puppeteer docker image

docker image with  [Google Puppeteer](https://github.com/GoogleChrome/puppeteer) installed

and [screenshots scripts](#screenshots)

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

    const browser = await puppeteer.launch({
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]
    });

    const page = await browser.newPage();

    await page.goto('https://www.google.com/', {waitUntil: 'networkidle'});

    browser.close();

})();
```

2. if you got page crash with `BUS_ADRERR` ([chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=571394)), increase shm-size on docker run with `--shm-size` argument

```bash
docker run --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
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

### mount your script to /app/index.js

```bash
docker run --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

### custom script from dir

```bash
docker run --shm-size 1G --rm \
 -v <path_to_dir>:/app \
 alekzonder/puppeteer:latest \
 node my_script.js
```

## screenshots

simple screenshot tools in image

### `screenshot`

```bash
docker run --shm-size 1G --rm -v /tmp/screenshots:/screenshots \
 alekzonder/puppeteer:latest \
 screenshot 'https://www.google.com' 1366x768
```

output: one line json

```
{
    "date":"2017-09-01T05:03:27.464Z",
    "timestamp":1504242207,
    "filename":"screenshot_1366_768.png",
    "width":1366,
    "height":768
}
```
got screenshot in /tmp/screenshots/screenshot_1366_768.png

### `full_screenshot`

save full screenshot of page

### `screenshot_series`, `full_screenshot_series`

adds datetime in ISO format into filename

useful for cron screenshots

```
2017-09-01T05:08:55.027Z_screenshot_1366_768.png
# OR
2017-09-01T05:08:55.027Z_full_screenshot_1366_768.png
```
