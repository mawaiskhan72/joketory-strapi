#!/bin/bash
set -e

# Navigate to the Strapi directory
cd joketory-be

# Install dependencies
npm install --production

# Build the application
npm run build

# Start the application
exec npm run start
