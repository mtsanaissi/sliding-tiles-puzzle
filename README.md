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

## Package installation

Planned package names:

```bash
pnpm add @mtsanaissi/sliding-ui-puzzle-core
pnpm add @mtsanaissi/sliding-ui-puzzle-react react react-dom
```

The workspace currently builds ESM-only packages and targets Node.js `18+`.

## React example

```tsx
import { SlidingPuzzle } from "@mtsanaissi/sliding-ui-puzzle-react";

export function MarketingPuzzle() {
  return (
    <div style={{ width: 420, height: 420 }}>
      <SlidingPuzzle
        gridSize={4}
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
    </div>
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

- Consumer apps own the container size. The board fills the parent by default.
- Tile slicing is percentage-based, so the same content works across supported grid sizes.
- Interactive tiles render as native `button` elements.
- Touch interaction uses `touch-action: manipulation` by default.
- Styling is customizable with class names, inline style props, tile overlay hooks, and empty-tile render hooks.
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
- Final npm package-name availability still needs release-time verification

## Documentation

- [Core package README](./packages/core/README.md)
- [React package README](./packages/react/README.md)
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

This repo is preparing a first package release. Support and monetization surfaces are live and linked directly from the docs and demo.
