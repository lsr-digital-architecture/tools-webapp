# Volta Link ⚡

Volta Link is a modern, full-stack URL shortener built with **Clean Architecture**, **Domain-Driven Design (DDD)**, and **Atomic Design**. It strictly adheres to functional programming principles, ensuring absolute immutability and zero nested conditionals across the entire codebase.

## Architecture & Paradigms

The project strictly follows architectural best practices, ensuring that the core business logic is isolated from external frameworks, databases, and UI components.

1. **Domain Layer**: Contains Entities (`ShortLink`) and Value Objects (`OriginalUrl`, `UrlCode`, `ExpirationDate`) to guarantee valid states.
2. **Application Layer**: Contains Use Cases (`ShortenUrlUseCase`, `GetOriginalUrlUseCase`, `GetHistoryUseCase`).
3. **Presentation Layer**:
   - *Backend*: Pure JSON REST API Express Controllers (No SSR HTML).
   - *Frontend*: React Components structured using **Atomic Design** (Atoms, Molecules, Organisms, Templates, Pages).
4. **Infrastructure Layer**: Prisma/SQLite Adapters (Backend) / HTTP Fetch & LocalStorage Adapters (Frontend).
5. **Strict Functional Programming**: Zero mutability (no `let` variables, pure functions only) and flat logic (no nested `if` statements).

## Tech Stack

- **Monorepo**: pnpm workspace (`frontend` + `backend`), `pnpm@12.8.1`
- **Frontend**: React 19, TypeScript 6, Vite 8, TailwindCSS v4
- **Backend**: Node.js v24 LTS, Express, TypeScript 6, Prisma v7 (`@prisma/adapter-better-sqlite3`), SQLite
- **Code Quality**: oxlint, oxfmt, absolute imports (`@/`) via `tsc-alias` & Vite native resolution
- **Testing**: Vitest v4, `@golevelup/ts-vitest`, SQLite in-memory integration testing
- **Security**: Shared API Key authentication (`x-api-key`) between Frontend Gateway and Backend Middleware
- **DevOps**: Docker, Docker Compose, Makefile, deterministic builds (`pnpm install --frozen-lockfile`)

## Getting Started

### Prerequisites

- Node.js (v24 LTS recommended; CI uses Node 22)
- pnpm 12.8.1 (via Corepack: `corepack enable`)
- Docker & Docker Compose (optional, recommended for easy startup)

### Quick Start (Using Docker)

```bash
make start
```

This builds and starts the Docker containers:

- **Frontend**: `http://localhost:5173`
- **Backend API**: `http://localhost:3001`

```bash
make stop
```

### Manual Setup (Without Docker)

From the repository root:

```bash
pnpm install
```

**Backend:**

```bash
cd backend
pnpm exec prisma db push
pnpm dev
```

**Frontend** (another terminal):

```bash
cd frontend
pnpm dev
```

Or run both from the root:

```bash
pnpm dev
```

## Scripts (root)

| Script | Description |
|--------|-------------|
| `pnpm dev` | Start FE + BE in parallel |
| `pnpm build` | Build all packages |
| `pnpm typecheck` | TypeScript check (FE + BE) |
| `pnpm lint` | oxlint (FE + BE) |
| `pnpm format` | Format with oxfmt |
| `pnpm format:check` | Check formatting |
| `pnpm test` | Run unit tests (FE + BE) |

## Testing

```bash
# All unit tests from root
pnpm test

# Backend integration tests (Prisma + SQLite)
cd backend && pnpm test:integration
```

## Linting & Formatting

```bash
pnpm lint
pnpm format:check
pnpm format
```

## Features

- **URL Shortening**: Shorten URLs with optional custom aliases.
- **Expirations**: Set optional expiration dates for short links.
- **i18n**: Full English (EN) and French (FR) support with system-preference detection and manual toggle.
- **Security**: Backend API is protected by a secret API Key.
- **Local History**: Recently shortened links stored in LocalStorage.
- **Premium UI**: Responsive glassmorphism UI built with TailwindCSS v4.
