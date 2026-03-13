# Build And Packaging

This workspace currently ships packages as ESM-only modules.

## Decisions

- Module format: ESM only
- Declarations: emitted with `tsc`
- React package runtime model: `react` and `react-dom` as peer dependencies
- Core package runtime model: framework-agnostic, no React dependency

## Package Entry Points

- `@mtsanaissi/sliding-ui-puzzle-core`
- `@mtsanaissi/sliding-ui-puzzle-react`

Both packages expose:

- `import` entry point
- `types` entry point
- `./package.json` subpath

## Current Constraint

The React package build depends on local React and type packages in `packages/react` so its test and build environment stays package-local.
