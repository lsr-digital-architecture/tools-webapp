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

## Déploiement

Apex : **`lsr-digital-architecture.com`** (même projet GCP/Firebase que marketing : `lsr-digital-architecture`).

| Subdomain | Cible | Service |
|-----------|-------|---------|
| `tools.lsr-digital-architecture.com` | Firebase Hosting site `lsr-tools-webapp` | frontend |
| `api.lsr-digital-architecture.com` | Cloud Run `tools-api` (`europe-west1`) | backend |

WIF / SA (partagés avec marketing) :

- Provider : `projects/344658308078/locations/global/workloadIdentityPools/github-pool/providers/github-provider`
- SA : `github-deployer@lsr-digital-architecture.iam.gserviceaccount.com`

### Frontend → Firebase Hosting

Workflow : `.github/workflows/deploy-frontend.yml`

- PR → preview channel sur le site `lsr-tools-webapp` (target `tools`)
- Push `main` → live `hosting:tools`
- Build injecte `VITE_API_URL` (défaut CI : `https://api.lsr-digital-architecture.com`) et `VITE_API_KEY`

### Backend → Cloud Run

Workflow : `.github/workflows/deploy-backend.yml`

- PR (chemins `backend/**`) → quality + build image (pas de deploy)
- Push `main` / `workflow_dispatch` → build/push Artifact Registry puis `gcloud run deploy tools-api`
- Image : `europe-west1-docker.pkg.dev/lsr-digital-architecture/cloud-run/tools-api`
- Dockerfile prod : `backend/Dockerfile` (écoute `0.0.0.0:$PORT`, Prisma generate + `db push` au boot)
- Dev Compose : `backend/Dockerfile.dev`

**Note SQLite :** le disque Cloud Run est éphémère. `DATABASE_URL=file:/tmp/tools.db` convient pour un POC ; pour de la persistance, brancher Cloud SQL / un volume et adapter Prisma.

### GitHub Secrets & Variables

| Name | Type | Used by | Description |
|------|------|---------|-------------|
| `VITE_API_KEY` | Secret | frontend CI | Même valeur que `API_KEY` backend (header `x-api-key`) |
| `DATABASE_URL` | Secret | Cloud Run deploy | Ex. `file:/tmp/tools.db` |
| `API_KEY` | Secret | Cloud Run deploy | Clé API runtime |
| `VITE_API_URL` | Variable (opt.) | frontend CI | Défaut : `https://api.lsr-digital-architecture.com` |
| `CORS_ORIGINS` | Variable (opt.) | Cloud Run | Défaut : `https://tools.lsr-digital-architecture.com` |

Auth GCP : WIF (pas de clé JSON).

### Ops checklist (console / CLI)

1. **Firebase sites** : `firebase hosting:sites:create tools --project lsr-digital-architecture`
2. **Domaine Hosting** : attacher `tools.lsr-digital-architecture.com` au site `lsr-tools-webapp`
3. **Artifact Registry** : créer le repo Docker `cloud-run` en `europe-west1` si absent
4. **IAM SA `github-deployer`** : roles Hosting Admin / Firebase, Artifact Registry Writer, Cloud Run Admin, Service Account User ; autoriser ce repo sur le WIF provider
5. **Cloud Run custom domain `api`** :
   - Console Cloud Run → Domain mappings → map `api.lsr-digital-architecture.com` → service `tools-api` (`europe-west1`)
   - Ou : `gcloud beta run domain-mappings create --service tools-api --domain api.lsr-digital-architecture.com --region europe-west1`
   - Ajouter chez le registrar les records DNS indiqués (souvent CNAME / A/AAAA Google)
6. Renseigner les secrets/variables GitHub ci-dessus
7. Premier deploy : push `main` (ou `workflow_dispatch` sur deploy-backend)

Env local : copier `frontend/.env.example` et `backend/.env.example`.
