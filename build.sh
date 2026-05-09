#!/bin/bash

# build.sh
echo "Building main Astro site..."
npm run build

echo "Building React portfolio..."
cd portfolio
npm run build

echo "Copying portfolio to dist/dev..."
cp -r dist ../dist/dev

echo "Build complete!"
