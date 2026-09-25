# Changelog

All notable changes to this workspace will be documented in this file.

The project follows Keep a Changelog conventions and uses Semantic Versioning for published package releases.

## [0.3.0] - 2026-09-24

### Changed

- Both packages: raise the supported Node.js floor from `18+` to `22+`. Node 18 and Node 20 are end-of-life, and the ESM-only export map cannot be consumed with `require()` before Node 20.19, so the previous claim was both stale and untestable under the workspace toolchain.
- Workspace: move the pinned toolchain from pnpm 9 to pnpm 12 and run CI on a Node 22/24 matrix so the declared floor is exercised.
- Workspace: align `@types/node` with the supported runtime (`^24`) instead of `^25` so the compiler cannot accept Node 25-only APIs the packages do not support.

### Notes

- Consumers on Node 18 or 20 must upgrade. The packages remain ESM-only and expose an `import` entry only, so CommonJS `require()` is unsupported and resolves with `ERR_PACKAGE_PATH_NOT_EXPORTED`.

## [0.2.1] - 2026-03-18

### Changed

- React package: require puzzle `content` to be a single React element and reject unsupported fragment or loose-node content at runtime
- React package: add package-level `width` and `height` sizing props, including a square fallback when width is provided without height
- React package: improve default tile number badge contrast for darker or busier puzzle content and document the new sizing and content rules

## [0.1.0] - 2026-03-13

### Added

- Package-oriented README documentation for the workspace, core package, and React package
- Release engineering scaffolding including MIT licensing, CI, publish workflow, and release checklist documentation
