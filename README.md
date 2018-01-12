# puppeteer docker image

docker image with  [Google Puppeteer](https://github.com/GoogleChrome/puppeteer) installed

and [screenshots scripts](#screenshots-tools)

[![nodesource/node](http://dockeri.co/image/alekzonder/puppeteer)](https://hub.docker.com/r/alekzonder/puppeteer/)

## docker tags

- `latest`
- `1`
- `1.0.0`
- `0`
- `0.13.0`
- `0.12.0`
- `0.11.0`
- `0.10.2`
- `0.10.1`
- `0.10.0`
- `0.9.0`

## install

```
docker pull alekzonder/puppeteer:latest
# OR
docker pull alekzonder/puppeteer:1.0.0
# OR
docker pull alekzonder/puppeteer:1

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

    await page.goto('https://www.google.com/', {waitUntil: 'networkidle2'});

    browser.close();

})();
```

2. if you got page crash with `BUS_ADRERR` ([chromium issue](https://bugs.chromium.org/p/chromium/issues/detail?id=571394)), increase shm-size on docker run with `--shm-size` argument

```bash
docker run --shm-size 1G --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

3. If you're seeing random navigation errors (unreachable url) it's likely due to ipv6 being enabled in docker. Navigation errors are caused by ERR_NETWORK_CHANGED (-21) in chromium. Disable ipv6 in your container using `--sysctl net.ipv6.conf.all.disable_ipv6=1` to fix:
```bash
docker run --shm-size 1G --sysctl net.ipv6.conf.all.disable_ipv6=1 --rm -v <path_to_script>:/app/index.js alekzonder/puppeteer:latest
```

4. add `--enable-logging` for chrome debug logging http://www.chromium.org/for-testers/enable-logging

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

## screenshots tools

simple screenshot tools in image

```bash
docker run --shm-size 1G --rm -v /tmp/screenshots:/screenshots \
 alekzonder/puppeteer:latest \
 <screenshot,full_screenshot,screenshot_series,full_screenshot_series> 'https://www.google.com' 1366x768
```

### screenshot tools syntax

`<tool> <url> <width>x<height> [<delay_in_ms>]`

* `delay_in_ms`: is optional (defaults to `0`)
  * Waits for `delay_in_ms` milliseconds before taking the screenshot

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

```bash
docker run --shm-size 1G --rm -v /tmp/screenshots:/screenshots \
 alekzonder/puppeteer:latest \
 full_screenshot 'https://www.google.com' 1366x768
```

### `screenshot_series`, `full_screenshot_series`

adds datetime in ISO format into filename

useful for cron screenshots

```bash
docker run --shm-size 1G --rm -v /tmp/screenshots:/screenshots \
 alekzonder/puppeteer:latest \
 screenshot_series 'https://www.google.com' 1366x768
```

```bash
docker run --shm-size 1G --rm -v /tmp/screenshots:/screenshots \
 alekzonder/puppeteer:latest \
 full_screenshot_series 'https://www.google.com' 1366x768
```

```
2017-09-01T05:08:55.027Z_screenshot_1366_768.png
# OR
2017-09-01T05:08:55.027Z_full_screenshot_1366_768.png
```
