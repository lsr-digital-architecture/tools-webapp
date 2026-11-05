# Production image for Cloud Run (tools-api)
FROM node:24-alpine AS build

RUN apk add --no-cache openssl python3 make g++ \
  && corepack enable && corepack prepare pnpm@12.8.1 --activate

WORKDIR /app

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY backend/package.json ./backend/
COPY backend/prisma ./backend/prisma
COPY backend/prisma.config.ts ./backend/prisma.config.ts

RUN pnpm install --frozen-lockfile --filter url-shortener-backend...

COPY backend ./backend

WORKDIR /app/backend
RUN pnpm run build

FROM node:24-alpine AS runner

RUN apk add --no-cache openssl \
  && corepack enable && corepack prepare pnpm@12.8.1 --activate

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

COPY pnpm-workspace.yaml package.json pnpm-lock.yaml ./
COPY backend/package.json ./backend/
COPY backend/prisma ./backend/prisma
COPY backend/prisma.config.ts ./backend/prisma.config.ts

RUN pnpm install --frozen-lockfile --filter url-shortener-backend...

COPY --from=build /app/backend/dist ./backend/dist

WORKDIR /app/backend

EXPOSE 8080

# SQLite file path comes from DATABASE_URL (ephemeral on Cloud Run unless a volume is attached)
CMD ["sh", "-c", "pnpm exec prisma db push --skip-generate && node dist/index.js"]
