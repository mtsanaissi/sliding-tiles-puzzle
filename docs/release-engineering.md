# Release Engineering

This document defines the release baseline for the first npm publication of the sliding puzzle packages.

## Release scope

Packages intended for publication:

- `@mtsanaissi/sliding-ui-puzzle-core`
- `@mtsanaissi/sliding-ui-puzzle-react`

The demo app is not published.

## Licensing

- Repository license: MIT
- Package metadata license field: MIT

The MIT license was chosen to maximize reuse of the puzzle engine and React bindings in products, demos, and educational projects.

## Versioning policy

- Use Semantic Versioning for published releases.
- Version both packages in lockstep for the initial release phase.
- Keep the workspace root version private and non-published.
- Update `CHANGELOG.md` in the same pull request as the version change.
- Tag releases as `v<version>`, for example `v0.1.0`.

Recommended version bump rules:

- `patch`: bug fixes, docs-only corrections to published APIs, non-breaking styling fixes
- `minor`: new backward-compatible API options, new render hooks, expanded supported use cases
- `major`: breaking prop changes, export removals, behavior changes that require consumer code updates

## CI baseline

GitHub Actions CI must run on pushes and pull requests and cover:

- dependency installation with `pnpm`
- workspace build
- workspace typecheck
- workspace tests

The repository workflow for this is `.github/workflows/ci.yml`.

## Publish workflow

The repository includes `.github/workflows/publish.yml` for tag-driven publishing.

Publish flow:

1. Merge release-ready changes.
2. Update package versions.
3. Update `CHANGELOG.md`.
4. Create and push a tag like `v0.1.0`.
5. GitHub Actions verifies the workspace.
6. GitHub Actions publishes `core` first and `react` second.

## Trusted publishing

The workflow is prepared for npm trusted publishing with GitHub Actions OIDC:

- the publish job grants `id-token: write`
- package publication is performed in GitHub Actions rather than from a local machine
- provenance is requested during publish

Before the first release, the npm package settings still need the GitHub repository added as a trusted publisher for both packages.

## Package name availability

Checked on 2026-03-12 against the npm registry:

- `@mtsanaissi/sliding-ui-puzzle-core`: not found at `https://registry.npmjs.org/@mtsanaissi%2Fsliding-ui-puzzle-core`
- `@mtsanaissi/sliding-ui-puzzle-react`: not found at `https://registry.npmjs.org/@mtsanaissi%2Fsliding-ui-puzzle-react`

This indicates the names were available at the time of the check, but availability must be rechecked immediately before the first public publish.

## First-release checklist

- Confirm package names are still available on npm.
- Ensure the npm organization or user account is ready to own both packages.
- Configure npm trusted publishing for this GitHub repository.
- Verify `LICENSE`, `README.md`, package READMEs, and `CHANGELOG.md` are up to date.
- Set real package versions in `packages/core/package.json` and `packages/react/package.json`.
- Run workspace build, typecheck, and tests in CI on the release commit.
- Push the release tag.
- Validate both package pages on npm after publish.
- Smoke-test installation in a fresh consumer project.

## Rollback and follow-up

- If one package publish fails after the other succeeds, do not republish with the same version.
- Fix the issue, bump versions, update `CHANGELOG.md`, and publish a new tag.
- Record release-specific notes in `CHANGELOG.md` rather than only in Git tags or GitHub releases.
