#!/bin/bash

set -e
set -x

cd client
yarn run lint:pcss
cd ..

eslint --ignore-path .eslintignore --config .eslintrc client/app/**/*.js client/app/**/*.jsx


