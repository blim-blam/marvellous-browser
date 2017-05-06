#!/bin/bash

set -e
set -x

yarn run client:build

# zip all files
zip -r deployment.zip .
