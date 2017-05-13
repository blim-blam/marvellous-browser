#!/bin/bash

set -x
set -e

export PORT=9999

cd server
node_modules/.bin/lab -T node_modules/lab-babel \
    --verbose \
    -t 90 \
    -S \
    --timeout 20000 \
    --ignore '__core-js_shared__,core,System,asap,Observable,regeneratorRuntime,_babelPolyfill'

