#!/bin/bash

echo "📦 Installing root dependencies..."
npm install

echo "📦 Installing portfolio dependencies..."
cd portfolio
npm install

echo "🏗️ Building Astro site..."
cd ..
npm run build:astro

echo "🏗️ Building React portfolio..."
cd portfolio
npm run build
cd ..

echo "📁 Copying portfolio to dist/dev..."
mkdir -p dist/dev
cp -r portfolio/dist/* dist/dev/

echo "✅ Build complete!"
