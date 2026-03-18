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

Puzzle content is provided through the `content` prop as a single `ReactElement`.

- supported examples: one `div`, `img`, `picture`, or custom component element
- unsupported examples: strings, arrays, multiple sibling nodes, and `React.Fragment`
- runtime behavior: the package throws when unsupported content shapes are passed

The package assumes that one element represents the rectangular puzzle surface. It does not attempt DOM capture or arbitrary webpage capture in v1.

## Callbacks

The hook and convenience component support:

- `onMove`
- `onScramble`
- `onSolve`

## Customization Boundary

The board supports:

- `width`
- `height`
- `gap`
- `borderRadius`
- `animationDuration`
- `aspectRatio`
- `showNumbers`
- `numberBadgeStyle`
- `numberTextStyle`
- `emptyTilePlaceholder`
- `renderTileOverlay`
- class and style props for board and tiles

Sizing behavior:

- without explicit size props, the board fills its parent container
- `width` without `height` falls back to a square board
- explicit `height` or `aspectRatio` takes precedence over that fallback

## Explicit Non-Goals

The React package does not ship:

- menu overlays
- level selection UI
- product-specific themes
- browser-extension behavior
- jigsaw rendering
