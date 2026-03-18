# AI Agent Development Guidelines - Sliding UI Puzzle Workspace

## Project Overview

This repository is a `pnpm` workspace for published sliding-puzzle packages, not a single app.

Current workspace members:

- `packages/core`: `@mtsanaissi/sliding-ui-puzzle-core`, the framework-agnostic puzzle engine
- `packages/react`: `@mtsanaissi/sliding-ui-puzzle-react`, the React hook and rendering package
- `examples/vite-demo`: local demo and manual QA app, not a published package

The root package is private. The published packages are ESM-only and target Node.js `18+`.

## Tech Stack

- React 19
- TypeScript
- Vite for the demo app
- `pnpm` workspace tooling
- Node built-in test runner
- `jsdom` for React-package mounted tests

## Workspace Rules

### 1. Package boundaries

- Keep `packages/core` framework-agnostic. Do not add React, DOM, or demo-specific concerns there.
- Treat `packages/react/src/index.tsx` as the React package public surface. Keep `useSlidingPuzzle`, `SlidingPuzzleBoard`, and `SlidingPuzzle` aligned with docs.
- Do not move demo-only UI, branding, support surfaces, or theme code into published packages unless the change is intentionally part of the package API.
- Prefer package entry points over deep cross-package imports. If local demo tooling aliases package source for development, keep imports aligned with the public export surface rather than new internal-only modules.

### 2. Styling model

- The demo app can be visually opinionated.
- The published React package must stay styling-framework-agnostic. Do not make consumers depend on Tailwind, demo CSS, or app-specific assets.
- Preserve the current customization model based on class names, inline style props, tile overlays, and empty-tile render hooks.
- Interactive tiles should remain semantic controls with touch-friendly behavior.

### 3. Testing and validation

Use workspace commands from the repo root unless the task is intentionally package-local:

- `pnpm dev` or `pnpm dev:demo`: run the Vite demo
- `pnpm build`: build all workspace packages/apps
- `pnpm typecheck`: run all workspace typechecks
- `pnpm test`: run all workspace tests
- `pnpm --filter @mtsanaissi/sliding-ui-puzzle-core test`: package-local core verification
- `pnpm --filter @mtsanaissi/sliding-ui-puzzle-react test`: package-local React verification

Important validation expectations:

- Core logic changes must preserve legal move behavior, immutability, solved-state detection, and scramble solvability.
- React package changes should keep mounted interaction tests passing and should be checked in the demo when rendering, styling hooks, or callbacks change.
- Demo changes should be exercised across the documented modes in `examples/vite-demo/App.tsx`: UI puzzle, image puzzle, and custom controls.
- The current automated test setup uses the built-in Node test runner. Do not assume Vitest, Jest, or Playwright exists unless you add and document it deliberately.

### 4. Documentation and release hygiene

- Keep `README.md`, `packages/core/README.md`, and `packages/react/README.md` in sync with the actual exported APIs and supported use cases.
- Treat `docs/build-and-packaging.md` as the canonical note for ESM-only packaging, declaration output, and package ownership boundaries.
- Treat `docs/testing.md` as the canonical note for the current Node test runner setup and its limitations.
- Treat `docs/release-engineering.md` as the canonical note for package release flow, versioning, changelog expectations, and trusted publishing assumptions.
- If a change affects published package behavior, exports, package names, release workflows, or support/release docs, update the relevant documentation in the same task.
- The demo app is not published. Do not treat demo-only changes as package release changes unless they also alter the public package surface or documentation.

### 5. Task tracking

- This repo uses the local task ledger under `tasks/`.
- `tasks/tasks.tsv` is the current state ledger and `tasks/task_log.tsv` is the append-only history.
- When asked to execute or update a task, update the ledger row and append a factual log entry for meaningful state changes.

## File Map

- `packages/core/src/index.ts`: core puzzle types and board logic
- `packages/react/src/index.tsx`: React hook and board components
- `packages/react/src/layout.ts`: layout helpers for tile placement and content viewport math
- `examples/vite-demo/App.tsx`: demo entry for supported package use cases
- `docs/`: packaging, rendering, testing, and release notes
- `tasks/`: local task ledger
