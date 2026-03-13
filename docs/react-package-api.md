# React Package API

This document records the v1 React API decisions for `@mtsanaissi/sliding-ui-puzzle-react`.

## Public Surface

The package exposes:

- `useSlidingPuzzle`
- `SlidingPuzzleBoard`
- `SlidingPuzzle`

## State Model

The initial package API is uncontrolled by default.

- `useSlidingPuzzle` owns the board state and exposes imperative actions.
- `SlidingPuzzle` is the convenience component that uses the hook internally.
- `SlidingPuzzleBoard` is the lower-level rendering primitive for consumers who want custom controls around the board.

This keeps v1 small while still giving consumers an escape hatch for custom UI.

## Content Model

Puzzle content is provided as React content through the `content` prop.

The package does not attempt DOM capture or arbitrary webpage capture in v1.

## Callbacks

The hook and convenience component support:

- `onMove`
- `onScramble`
- `onSolve`

## Customization Boundary

The board supports:

- `gap`
- `borderRadius`
- `animationDuration`
- `showNumbers`
- `emptyTilePlaceholder`
- `renderTileOverlay`
- class and style props for board and tiles

## Explicit Non-Goals

The React package does not ship:

- menu overlays
- level selection UI
- product-specific themes
- browser-extension behavior
- jigsaw rendering
