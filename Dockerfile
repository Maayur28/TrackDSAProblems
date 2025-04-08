# Stage 1: Dependency installation
FROM node:18-buster-slim AS deps

WORKDIR /usr/src/app

# Copy package files only
COPY package*.json ./

# Optional: Set npm fetch retry options for network stability
RUN npm config set fetch-retries 5 && \
    npm config set fetch-retry-mintimeout 20000 && \
    npm config set fetch-retry-maxtimeout 120000

# Install dependencies
RUN npm install --force

# Stage 2: Build and run
FROM node:18-buster-slim

WORKDIR /usr/src/app

# Copy installed node_modules from deps stage
COPY --from=deps /usr/src/app/node_modules ./node_modules

# Copy the rest of the application
COPY . .

# ARGs (used only at build time)
ARG email
ARG password
ARG MY_EMAIL
ARG TOKEN_SECRET
ARG MONGODB_URI

# Environment variables (should ideally be set at runtime for security)
ENV email=$email
ENV password=$password
ENV MY_EMAIL=$MY_EMAIL
ENV TOKEN_SECRET=$TOKEN_SECRET
ENV MONGODB_URI=$MONGODB_URI

# For debugging: You can remove these later
RUN echo "ENV email = $email" && \
    echo "ENV password = $password" && \
    echo "ENV MY_EMAIL = $MY_EMAIL" && \
    echo "ENV TOKEN_SECRET = $TOKEN_SECRET" && \
    echo "ENV MONGODB_URI = $MONGODB_URI"

# Expose application port
EXPOSE 8080

# Start app
CMD ["node", "index.js"]