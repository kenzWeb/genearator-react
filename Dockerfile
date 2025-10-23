# Multi-stage Dockerfile for Vite React app (Dokploy ready)
# 1) Build stage: compile static assets
# 2) Runtime stage: serve via Nginx with SPA fallback

########## Build stage ##########
FROM node:20-alpine AS builder

WORKDIR /app

# Install system deps if needed (optional)
RUN apk add --no-cache bash

# Copy only manifest first to leverage Docker layer cache
COPY package.json .

# Install deps (no package-lock.json present -> use npm install)
RUN npm install --no-audit --no-fund

# Copy the rest of the project
COPY . .

# Build-time API URL(s). Dokploy can set these as Build Args.
ARG VITE_API_URL=http://localhost:8000
ARG VITE_API_BASE_URL=http://localhost:8000
ENV VITE_API_URL=${VITE_API_URL}
ENV VITE_API_BASE_URL=${VITE_API_BASE_URL}

RUN npm run build

FROM nginx:1.27-alpine AS runner

COPY nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost/ || exit 1

CMD ["nginx", "-g", "daemon off;"]
