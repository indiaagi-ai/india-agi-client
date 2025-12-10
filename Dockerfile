# Use the official Node.js image as the base image
FROM node:slim

# Install pnpm globally
# You must install pnpm as it is not included in the base Node.js image
RUN npm install -g pnpm

# Set the working directory inside the container
WORKDIR /usr/src/app

# Copy package.json and pnpm-lock.yaml to the working directory
# pnpm uses pnpm-lock.yaml instead of package-lock.json
COPY package.json pnpm-lock.yaml ./

# Install the application dependencies using pnpm
RUN pnpm install --frozen-lockfile

# Install PM2 globally and application dependencies
# pnpm can install global packages similarly to npm
RUN pnpm install pm2 -g && pnpm install

# Copy the rest of the application files
COPY . .

# Build the NestJS application using pnpm
RUN pnpm run build

# Expose the application port
EXPOSE 4002

# Command to run the application using pnpm
CMD ["pnpm", "run", "serve"]