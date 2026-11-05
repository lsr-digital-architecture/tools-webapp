FROM node:24-alpine

RUN apk add --no-cache openssl python3 make g++ \
  && corepack enable && corepack prepare pnpm@12.8.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY backend/package.json ./backend/

RUN pnpm install --frozen-lockfile --filter url-shortener-backend...

COPY backend ./backend

WORKDIR /app/backend

EXPOSE 3001

CMD ["pnpm", "run", "dev"]
