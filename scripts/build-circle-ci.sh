#!/bin/bash

set -e
set -x

cd client && yarn && cd ..
cd server && yarn && cd ..

yarn run client:build
