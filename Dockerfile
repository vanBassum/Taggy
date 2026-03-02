# --------------------------------
# BUILD STAGE
# --------------------------------
FROM node:20 AS builder
WORKDIR /app

# Accept version info from GitHub Actions
ARG APP_VERSION=dev
ARG APP_COMMIT=unknown

# Provide them to Vite (these get baked into js bundle)
ENV VITE_APP_VERSION=$APP_VERSION
ENV VITE_APP_COMMIT=$APP_COMMIT

# Install Java for openapi-generator
RUN apt-get update && apt-get install -y openjdk-17-jre-headless && \
    rm -rf /var/lib/apt/lists/*

# Copy dependency files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies (includes TypeScript)
RUN npm ci

# Copy source
COPY . .

# Generate API client
RUN npm run generate-api

# Build Vite app
RUN npm run build


# --------------------------------
# PRODUCTION STAGE
# --------------------------------
FROM nginx:stable-alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy entrypoint
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Copy nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

# VERY IMPORTANT: run script to generate env.js dynamically at runtime
ENTRYPOINT ["/entrypoint.sh"]
