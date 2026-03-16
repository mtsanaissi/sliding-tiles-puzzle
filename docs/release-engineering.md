# Release Engineering

This document defines the release process for the published sliding puzzle packages.

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
- Version both packages in lockstep for the current release phase.
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

Standard publish flow:

1. Merge release-ready changes.
2. Update package versions.
3. Update `CHANGELOG.md`.
4. Create and push a tag like `v0.1.0`.
5. GitHub Actions verifies the workspace.
6. GitHub Actions publishes `core` first and `react` second.

The publish workflow currently:

- runs on pushes to tags matching `v*`
- uses GitHub-hosted runners
- verifies the workspace with `pnpm build`, `pnpm typecheck`, and `pnpm test`
- publishes with `pnpm publish` from GitHub Actions

Release commands:

```bash
git tag v0.1.1
git push origin v0.1.1
```

## Trusted publishing

The workflow uses npm trusted publishing with GitHub Actions OIDC:

- the publish job grants `id-token: write`
- package publication is performed in GitHub Actions rather than from a local machine
- provenance is requested during publish

Trusted publisher configuration is set for both packages against:

- GitHub owner: `mtsanaissi`
- repository: `mtsanaissi/sliding-tiles-puzzle`
- workflow file: `publish.yml`
- environment: `npm`

This setup should be treated as part of release infrastructure. If the workflow file name, repository, or environment changes, npm trusted publisher settings must be updated before the next tag release.

## Package ownership

Published packages:

- `@mtsanaissi/sliding-ui-puzzle-core`
- `@mtsanaissi/sliding-ui-puzzle-react`

The packages are owned under the npm user scope `@mtsanaissi`. No separate npm organization is required for the current package names.

## First release status

The first public release was completed manually as `0.1.0` in order to create the npm package records, after which trusted publishing was configured for both packages.

Manual first-release notes:

- `core` had to be published before `react`
- publishing used `pnpm publish`, not `npm publish`, so the workspace dependency from `react` to `core` resolves correctly
- future releases should use the GitHub tag-driven workflow rather than local manual publishing

## Release checklist

- Verify `LICENSE`, `README.md`, package READMEs, and `CHANGELOG.md` are up to date.
- Set the next real version in `packages/core/package.json` and `packages/react/package.json`.
- Run workspace build, typecheck, and tests before tagging.
- Push the release commit.
- Create and push the release tag.
- Confirm the GitHub Actions publish workflow succeeds.
- Validate both package pages on npm after publish.
- Smoke-test installation in a fresh consumer project.

## Rollback and follow-up

- If one package publish fails after the other succeeds, do not republish with the same version.
- Fix the issue, bump versions, update `CHANGELOG.md`, and publish a new tag.
- Record release-specific notes in `CHANGELOG.md` rather than only in Git tags or GitHub releases.
- After any release-infrastructure change, validate the next release with a small patch version before batching larger changes.
