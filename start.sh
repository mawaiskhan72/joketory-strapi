#!/bin/bash
set -e

echo "Starting deployment process..."

# Navigate to the Strapi directory
echo "Changing to joketory-be directory..."
cd joketory-be

# Install dependencies
echo "Installing dependencies..."
npm install --production=false

# Build the application
echo "Building the application..."
npm run build

# Set environment variables
export NODE_ENV=production
export PORT=$PORT

# Start the application
echo "Starting Strapi application on port $PORT..."
exec npm start
