#!/bin/bash

set -x
set -e

./scripts/test-server.sh
./scripts/test-client.sh

