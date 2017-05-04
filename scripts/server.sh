#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"

cd server
npm run start
