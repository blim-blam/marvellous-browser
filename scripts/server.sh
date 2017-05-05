#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"
pwd
ls -lha /var/app/current
/var/app/current/server/node_modules/babel-cli/bin/babel-node.js /var/app/current/server/index.js | /var/app/current/server/node_modules/bunyan/bin/bunyan
