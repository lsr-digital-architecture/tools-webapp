# File Size & Modularity Rules

## 1. File Size Constraints

- **Maximum Line Threshold**: No source file (components, hooks, services, utilities, use cases) should exceed **250 lines** of executable code (excluding pure data constants in `src/constants/` when present).
- **Target Size**: Maintain UI components and custom hooks between **80 and 180 lines** for optimal readability and single-responsibility compliance.

## 2. Refactoring Triggers

Whenever a component or file grows beyond 200 lines:

- **Sub-components Decomposition**: Split complex views, forms, or lists into dedicated Atomic Design pieces (atoms → molecules → organisms).
- **Hook Extraction**: Extract complex state management, data fetching, or event listeners into custom hooks under `presentation/hooks/`.
- **Use-case / Domain Extraction**: Move business rules into application use cases or domain value objects rather than growing presentation or infrastructure files.

## 3. Linter Enforcement

- Enforced via `.oxlintrc.json` using the `max-lines` rule (`max: 250`).
- Run `pnpm lint` to verify compliance.
