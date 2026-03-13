# Package Product Scope

This document defines the v1 package direction for the sliding puzzle project and acts as the source of truth for packaging decisions.

## v1 Promise

Ship a reusable TypeScript puzzle engine and a React package that can turn React-rendered content into a sliding puzzle inside any container.

## Package Strategy

The repo will publish two packages from the same workspace:

- `@mtsanaissi/sliding-ui-puzzle-core`
- `@mtsanaissi/sliding-ui-puzzle-react`

`core` owns puzzle logic and framework-agnostic types.

`react` owns hooks and components for rendering and interacting with a sliding puzzle in React applications.

## Intended Users

- React developers who want to embed a sliding puzzle in a product, landing page, or demo
- Interactive content creators building playful UI experiences
- Educators or marketers who want a puzzle mechanic without building one from scratch

## v1 Non-Goals

The following are explicitly out of scope for the first release:

- jigsaw or other puzzle families
- browser extension support
- hosted API or URL-to-puzzle service
- arbitrary webpage capture
- monetized pro tiers inside the package

## Product Boundaries

The first release should optimize for:

- predictable TypeScript APIs
- a small public surface area
- easy React integration
- customizable styling without requiring Tailwind
- strong correctness and solvability guarantees

The first release should not optimize for:

- scraping or rendering third-party websites
- all-framework support beyond the framework-agnostic core
- advanced authoring tools
- enterprise licensing features

## Naming Direction

Working names:

- scope: `@mtsanaissi`
- engine package: `sliding-ui-puzzle-core`
- React package: `sliding-ui-puzzle-react`

Final npm availability needs to be checked before publishing.

## Initial Monetization Surfaces

The package itself should be free to maximize adoption.

Initial support surfaces:

- GitHub Sponsors
- Buy Me a Coffee
- contact path for custom integrations or implementation help

These should appear in package documentation and the demo app, but they are not product features.

## Release Principle

Keep v1 narrow, reliable, and easy to explain. Validate adoption for the sliding puzzle mechanic before expanding into new puzzle types or paid platform features.
