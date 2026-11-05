# Package Manager Guidelines

- Always use `pnpm` rather than `npm` or `yarn` for all package management and running scripts in this workspace.
- Commands:
  - Install dependencies: `pnpm install`
  - Add dependency: `pnpm add <pkg> --filter <package>`
  - Add dev dependency: `pnpm add -D <pkg> --filter <package>`
  - Run both apps: `pnpm dev`
  - Run build: `pnpm build`
  - Run checks: `pnpm typecheck`, `pnpm lint`, `pnpm format:check`, `pnpm test`
