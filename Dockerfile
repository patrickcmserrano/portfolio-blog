FROM node:20-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy all project files
COPY . .

# Set production environment
ENV NODE_ENV=production

# Build the application
RUN npm run build

# Use a lightweight server to serve static files
FROM node:20-alpine
WORKDIR /app
COPY --from=0 /app/build ./build

RUN npm install -g serve

EXPOSE 3000

# Serve the static files
CMD ["serve", "-s", "build", "-l", "3000"] 