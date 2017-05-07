#!/bin/bash

set -x
set -e

export GRAPHQL_ENDPOINT=http://localhost:3000

cd client
node_modules/.bin/jest

