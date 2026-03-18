# Sliding UI Puzzle

Reusable sliding-puzzle packages for turning board state or React-rendered content into a playable sliding tile experience.

This workspace is organized around two publishable packages:

- `@mtsanaissi/sliding-ui-puzzle-core`: framework-agnostic board logic, solvable scrambling, and serialization helpers
- `@mtsanaissi/sliding-ui-puzzle-react`: React hook and rendering primitives for UI, image, and custom-control puzzle experiences

The repo also includes a Vite demo app that exercises the supported v1 use cases.

## What ships in v1

- Solvable board generation for `2x2` and larger square grids
- Immutable move logic and solved-state detection
- React hook state management with scramble, solve, reset, and move actions
- Visual board rendering for arbitrary React content inside any sized container
- Styling hooks that do not require Tailwind in consumer apps
- Demo examples for UI puzzles, image puzzles, and custom HUD/control layouts

## Workspace layout

- `packages/core`: puzzle engine package
- `packages/react`: React package
- `examples/vite-demo`: manual QA and documentation demo
- `docs/`: packaging, rendering, and testing notes used to define the v1 scope
- `tasks/`: local task ledger for release preparation work

## Quickstart

Prerequisites:

- Node.js `18+`
- `pnpm`

Install workspace dependencies:

```bash
pnpm install
```

Run the demo app:

```bash
pnpm dev
```

Build every package:

```bash
pnpm build
```

Run tests:

```bash
pnpm test
```

## Consumer installation

Install the published packages from npm:

```bash
pnpm add @mtsanaissi/sliding-ui-puzzle-core
pnpm add @mtsanaissi/sliding-ui-puzzle-react react react-dom
```

The published packages are ESM-only and target Node.js `18+`.

## Release status

The initial `0.1.0` package release is published on npm. Ongoing releases are published through the tag-driven GitHub Actions workflow documented in [`docs/release-engineering.md`](./docs/release-engineering.md).

## React example

```tsx
import { SlidingPuzzle } from "@mtsanaissi/sliding-ui-puzzle-react";

export function MarketingPuzzle() {
  return (
    <SlidingPuzzle
      gridSize={4}
      width={420}
      content={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #fde68a, #93c5fd)",
            fontSize: 48,
            fontWeight: 800,
          }}
        >
          Launch Day
        </div>
      }
      showNumbers
      onSolve={() => {
        console.log("Solved");
      }}
    />
  );
}
```

For hook-driven composition, see [`packages/react/README.md`](./packages/react/README.md).

## Supported use cases

- Marketing or landing-page puzzle modules built from React content
- Image or poster puzzles rendered through an `img` or other media node
- Product demos or experiments that need custom controls around puzzle state
- Framework-agnostic game logic usage through the core package without React

## Styling and accessibility

- Consumer apps can size the board through a parent container or with package-level `width` and `height` props.
- Passing `width` without `height` gives the React package a square fallback for common embed cases.
- Tile slicing is percentage-based, so the same content works across supported grid sizes.
- React content must be passed as one rectangular element rather than loose nodes or fragments.
- Interactive tiles render as native `button` elements.
- Touch interaction uses `touch-action: manipulation` by default.
- Styling is customizable with class names, inline style props, tile overlay hooks, empty-tile render hooks, and number badge overrides.
- Keyboard interaction is not yet implemented as a first-class v1 feature; consumers should treat current semantics as a base for future accessibility work.

## Demo examples

The Vite demo includes three documentation-grade examples:

- UI puzzle: reconstruct a styled product-like interface
- Image puzzle: solve a poster-style illustration puzzle
- Custom controls: compose `useSlidingPuzzle` with your own HUD and actions

Source: [`examples/vite-demo/App.tsx`](./examples/vite-demo/App.tsx)

## Limitations

- v1 supports square sliding puzzles only
- The React package does not capture arbitrary webpages or screenshots
- No built-in menu system, level selector, persistence layer, or jigsaw rendering is included
- Packages are ESM-only at the moment

## Documentation

- [Core package README](./packages/core/README.md)
- [React package README](./packages/react/README.md)
- [Documentation inventory](./docs/documentation-inventory.md)
- [Package product scope](./docs/package-product-scope.md)
- [Rendering and styling notes](./docs/rendering-and-styling.md)
- [Build and packaging notes](./docs/build-and-packaging.md)
- [Release engineering notes](./docs/release-engineering.md)
- [Support guide](./SUPPORT.md)
- [Testing notes](./docs/testing.md)

## Support

- Issues and bug reports: [github.com/mtsanaissi/sliding-tiles-puzzle/issues](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues)
- Support guide: [SUPPORT.md](./SUPPORT.md)
- Custom integration inquiries: [integration request issue form](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues/new?template=integration-request.yml)
- Sponsor the project: [github.com/sponsors/mtsanaissi](https://github.com/sponsors/mtsanaissi)
- Buy me a coffee: [buymeacoffee.com/mtsanaissi](https://buymeacoffee.com/mtsanaissi)

## Status

This repo now ships published npm packages and keeps support and monetization surfaces separate from the package feature set.
