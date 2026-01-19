#!/bin/bash
cd joketory-be

# Install dependencies
npm install --production=false

# Build the application
npm run build

# Start the application
NODE_ENV=production npm start
