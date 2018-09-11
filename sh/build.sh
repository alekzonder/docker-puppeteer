#!/bin/bash
set -e
set -x

docker build -t alekzonder/puppeteer:latest .
docker images
