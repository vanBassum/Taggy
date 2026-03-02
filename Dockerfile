# --------------------------------
# BUILD STAGE
# --------------------------------
FROM node:20-alpine AS builder
WORKDIR /app

# Copy dependency files first (for caching)
COPY package.json package-lock.json ./

# Install dependencies
RUN npm ci

# Copy source and build
COPY . .
RUN npm run build


# --------------------------------
# PRODUCTION STAGE
# --------------------------------
FROM nginx:stable-alpine

# Copy built static files
COPY --from=builder /app/dist /usr/share/nginx/html

# SPA routing support
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
