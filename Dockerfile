FROM node:slim

# Install pnpm
RUN npm install -g pnpm

WORKDIR /usr/src/app

# Copy lockfile + package.json first (for layer caching)
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml .npmrc ./

# Frozen install = exact same versions as your local machine
RUN pnpm install --frozen-lockfile

# Copy the rest of the application files
COPY . .

# Build the NestJS application
RUN pnpm run build

EXPOSE 4002

CMD ["pnpm", "run", "serve"]