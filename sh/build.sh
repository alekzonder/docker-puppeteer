#!/bin/bash
set -e

docker build -t alekzonder/puppeteer:latest .
docker images
