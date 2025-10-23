FROM node:20-alpine AS builder

WORKDIR /app

RUN apk add --no-cache bash

COPY package.json .

RUN npm install --no-audit --no-fund

COPY . .

# Vite возьмёт значения из .env/.env.production автоматически при сборке.
# Не выставляем ENV/ARG, чтобы не переопределять значения из .env
RUN npm run build

FROM node:20-alpine AS runner

WORKDIR /app

RUN npm install -g serve@14


COPY --from=builder /app/dist ./dist

ENV NODE_ENV=production

EXPOSE 3000


HEALTHCHECK --interval=30s --timeout=3s --retries=3 CMD wget -qO- http://localhost:3000/ || exit 1


CMD ["serve", "-s", "dist", "-l", "3000"]
