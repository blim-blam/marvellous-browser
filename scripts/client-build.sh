#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="production"

cd client
npm run build