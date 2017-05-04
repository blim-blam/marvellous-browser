#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"

cd server
./node_modules/.bin/babel-node ./index.js | ./node_modules/.bin/bunyan
