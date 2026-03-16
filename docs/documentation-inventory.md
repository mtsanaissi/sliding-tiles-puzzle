# Documentation Inventory

This document lists the maintained project documentation, what each document is for, and when it should be updated.

## Root-level docs

### `README.md`

Purpose: Primary project overview for GitHub and npm visitors. Covers package purpose, workspace development, consumer installation, limitations, and support links.

Update when:

- published package status changes
- install commands or prerequisites change
- the supported use cases or limitations change
- major documentation links move or new key docs are added

### `CHANGELOG.md`

Purpose: Release history for published package changes.

Update when:

- package versions change
- a release is cut
- notable user-facing behavior, API, docs, or release-process changes are prepared for the next version

### `SUPPORT.md`

Purpose: Explains issue reporting, sponsorship, and custom integration paths.

Update when:

- support channels change
- integration request flow changes
- sponsorship or donation links change

### `AGENTS.md`

Purpose: Local instructions for AI coding agents working in this repository.

Update when:

- workflow expectations for agents change
- project structure or conventions change in ways that affect automated contributors

## Package docs

### `packages/core/README.md`

Purpose: Consumer-facing documentation for `@mtsanaissi/sliding-ui-puzzle-core`, including install guidance, use cases, and public API summary.

Update when:

- the core package API changes
- install requirements or runtime constraints change
- supported use cases or limitations change

### `packages/react/README.md`

Purpose: Consumer-facing documentation for `@mtsanaissi/sliding-ui-puzzle-react`, including installation, examples, props, hook behavior, and limitations.

Update when:

- the React package API changes
- examples or recommended integration patterns change
- dependency requirements or accessibility guidance change

## Internal project docs

### `docs/build-and-packaging.md`

Purpose: Records packaging decisions such as module format, declarations, and package entry points.

Update when:

- package build output changes
- entry points or module format change
- dependency or bundling assumptions change

### `docs/package-product-scope.md`

Purpose: Defines the v1 product boundary, intended users, non-goals, and naming direction.

Update when:

- product scope changes
- non-goals become goals or vice versa
- package positioning or naming changes

### `docs/react-package-api.md`

Purpose: Records the intended public API shape and non-goals for the React package.

Update when:

- exported React APIs change
- customization boundaries change
- React package non-goals or content model assumptions change

### `docs/release-engineering.md`

Purpose: Documents how releases are versioned, validated, tagged, and published.

Update when:

- release workflow or GitHub Actions configuration changes
- npm trusted publishing setup changes
- release checklist or rollback guidance changes

### `docs/rendering-and-styling.md`

Purpose: Captures rendering, styling, and interaction model decisions for the React package.

Update when:

- rendering behavior changes
- styling hooks or defaults change
- interaction semantics or accessibility baseline changes

### `docs/testing.md`

Purpose: Summarizes the current test strategy and known gaps.

Update when:

- test coverage expands or contracts meaningfully
- test tooling changes
- known testing limitations change

## Maintenance note

When preparing a release, review at minimum:

- `README.md`
- `CHANGELOG.md`
- `packages/core/README.md`
- `packages/react/README.md`
- `docs/release-engineering.md`

Review the other docs whenever the release changes scope, API, rendering behavior, build output, or support expectations.
