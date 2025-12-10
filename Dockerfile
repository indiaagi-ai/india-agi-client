# Use the official Node.js image as the base image
FROM node:slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy the dependency files explicitly and ensure they are available
# **THIS IS THE CRITICAL CHANGE**
COPY package.json ./
COPY package-lock.json ./ 

# Install the application dependencies using the lock file
RUN npm ci

# --- Your subsequent steps (Reviewing these below) ---

# Install PM2 globally and application dependencies
# NOTE: The second 'npm install' here is redundant after 'npm ci'.
RUN npm install pm2 -g 
# You should remove the redundant '&& npm install' above.

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN npm run build

# Expose the application port
EXPOSE 4002

# Command to run the application
CMD ["npm", "run", "serve"]