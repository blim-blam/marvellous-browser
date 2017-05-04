#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"
export PORT=3000

cd server
npm run start