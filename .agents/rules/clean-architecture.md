# Clean Architecture & Atomic Design

This monorepo (`frontend` + `backend`) is the reference for business apps. Preserve these boundaries.

## Layer order (dependency rule)

Dependencies point **inward** only:

1. **Domain** — entities, value objects, repository/gateway interfaces; no framework imports
2. **Application** — use cases, DTOs, application errors; depends on domain only
3. **Infrastructure** — Prisma, HTTP clients, LocalStorage, Express wiring; implements domain ports
4. **Presentation** — React UI (FE) or Express controllers/routes/middlewares (BE)

Never import outward (e.g. domain must not import infrastructure or presentation).

## Frontend Atomic Design

Under `frontend/src/presentation/components/`:

- `atoms/` — smallest UI primitives (Button, Input, Label, Badge)
- `molecules/` — composed controls (FormGroup, ResultCard, HistoryRow)
- `organisms/` — feature blocks (Header, ShortenerForm, HistoryList)
- `templates/` — page chrome (MainLayout)
- `pages/` — route-level screens (HomePage)

## Functional style

- Prefer immutability and pure functions
- Avoid nested conditionals where early returns or composition keep logic flat
- Keep side effects at infrastructure and presentation edges
