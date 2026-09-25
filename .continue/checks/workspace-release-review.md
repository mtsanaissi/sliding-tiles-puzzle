# Workspace Release Review

Review this diff as changes to a published `pnpm` workspace, not a single-app repo.

## Focus

Prioritize findings that would cause:

- broken package behavior or incorrect public API guidance
- drift between the codebase and workspace commands, test setup, or release process
- regressions in the demo's documented manual-QA role

Ignore generic style feedback unless it causes a real bug, maintenance risk, or release/documentation mismatch.

## Workspace Facts

- Root commands are `pnpm dev`, `pnpm build`, `pnpm typecheck`, `pnpm test`, and `pnpm --filter <package> <script>`.
- Published packages are `@mtsanaissi/sliding-ui-puzzle-core` in `packages/core` and `@mtsanaissi/sliding-ui-puzzle-react` in `packages/react`.
- `examples/vite-demo` is a local demo app for manual QA and docs examples. It is not published.
- The workspace uses the built-in Node test runner. `packages/react` tests use `jsdom`.
- Packages are ESM-only and target Node.js `22+` (`engines.node` is `>=22`). CommonJS `require()` is unsupported: the export map has no `require`/`default` condition, so it throws `ERR_PACKAGE_PATH_NOT_EXPORTED`.
- Toolchain is pinned to `pnpm@12.6.0`; CI runs a Node `22`/`24` matrix and the local/`publish.yml` runtime is Node `24`.

## Review For

1. Package boundaries
   Flag changes that move demo-only UI, support surfaces, app theming, or non-public internals into published packages without corresponding API intent and documentation.

2. Command and tooling drift
   Flag instructions, scripts, comments, or docs that assume `npm`, Vitest, Jest, Playwright, or another test/build flow that this repo does not actually use.

3. Public API and package metadata drift
   Flag changes to exports, package names, peer dependencies, ESM assumptions, or published behavior that are not reflected in the relevant package docs or release notes.

4. Test and QA gaps
   Flag diffs that change puzzle logic, rendering behavior, callbacks, or package wiring without updating the relevant Node tests or without preserving the demo as the manual QA surface for UI puzzle, image puzzle, and custom controls flows.

5. Release-process regressions
   Flag changes that would break or desynchronize `CHANGELOG.md`, package versioning expectations, `.github/workflows/ci.yml`, `.github/workflows/publish.yml`, or npm trusted publishing assumptions described in `docs/release-engineering.md`.

## Key References

- `AGENTS.md`
- `README.md`
- `docs/build-and-packaging.md`
- `docs/testing.md`
- `docs/release-engineering.md`
- `packages/core/package.json`
- `packages/react/package.json`
- `examples/vite-demo/App.tsx`
