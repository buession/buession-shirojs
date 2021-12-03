#!/bin/bash

set -e

NAME=$(node -p "require('./package.json').name")
VERSION=$(node -p "require('./package.json').version")

echo "$Building ${NAME} ${VERSION}"
echo ''

rm -rf dist esm

echo 'Compile JS...'
rollup -c build/rollup.config.js
echo 'Done.'
echo ''