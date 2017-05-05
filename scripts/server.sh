#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"

./server/node_modules/babel-cli/bin/babel-node.js ./server/index.js | ./server/node_modules/bunyan/bin/bunyan
