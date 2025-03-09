# Base stage for shared dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./

# Development stage
FROM base AS development
RUN npm install
COPY . .
EXPOSE 3000
# Ensure SvelteKit is synced before running dev
CMD ["sh", "-c", "npx svelte-kit sync && npm run dev -- --host 0.0.0.0"]

# Build stage
FROM base AS builder
RUN npm install
COPY . .
ENV NODE_ENV=production
# Sync SvelteKit and run build with verbose logging
RUN set -ex && \
    npx svelte-kit sync && \
    npx vite build --debug

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
COPY --from=builder /app/build ./build
COPY package*.json ./
RUN npm install --production
RUN npm install -g serve
EXPOSE 3000
CMD ["serve", "-s", "build", "-l", "3000"] 