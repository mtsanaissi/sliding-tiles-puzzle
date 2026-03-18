# Changelog

All notable changes to this workspace will be documented in this file.

The project follows Keep a Changelog conventions and uses Semantic Versioning for published package releases.

## [0.2.0] - 2026-03-18

### Changed

- React package: require puzzle `content` to be a single React element and reject unsupported fragment or loose-node content at runtime
- React package: add package-level `width` and `height` sizing props, including a square fallback when width is provided without height
- React package: improve default tile number badge contrast for darker or busier puzzle content and document the new sizing and content rules

## [0.1.0] - 2026-03-13

### Added

- Package-oriented README documentation for the workspace, core package, and React package
- Release engineering scaffolding including MIT licensing, CI, publish workflow, and release checklist documentation
