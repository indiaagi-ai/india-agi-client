# Use the official Node.js image as the base image
FROM node:slim

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package.json package-lock.json ./

# Install the application dependencies using npm
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application using npm
RUN npm run build

# Expose the application port
EXPOSE 4002

# Command to run the application using npm
CMD ["npm", "run", "serve"]