#!/usr/bin/env bash

set -e
set -x

export NODE_ENV="development"
export GRAPQL_ENDPOINT="http://localhost:3000/graphql"

cd client
npm run build:watch