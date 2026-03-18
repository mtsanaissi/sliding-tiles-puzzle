# Rendering And Styling

This document records the v1 rendering decisions for `@mtsanaissi/sliding-ui-puzzle-react`.

## Rendering Model

The board renderer supports both parent-driven sizing and direct component sizing.

- By default the board fills the width and height of its container.
- Consumers may provide `width` and `height` directly on `SlidingPuzzleBoard` or `SlidingPuzzle`.
- When `width` is provided without `height`, the board falls back to a square ratio.
- Consumers may also provide `aspectRatio` to keep the board square or force another ratio explicitly.
- Tile slicing is percentage-based, so the viewport logic scales with any container size.
- Puzzle content must be supplied as one rectangular React element rather than loose nodes or fragments.

## Styling Model

The package does not require Tailwind.

Default rendering uses inline styles owned by the package, with opt-in overrides through:

- `boardStyle`
- `tileStyle`
- `tileFrameStyle`
- `contentStyle`
- `emptyTileStyle`
- `numberBadgeStyle`
- `numberTextStyle`
- related class name hooks

The built-in number badge defaults now bias toward dark badge chrome with light text so numbers remain legible over darker or busier puzzle content.

## Empty Tile Customization

The empty slot can be customized with:

- `emptyTilePlaceholder`
- `renderEmptyTile`

## Interaction Model

Interactive tiles render as buttons.

This gives the package:

- better semantics than clickable `div` elements
- touch-friendly interaction through `touch-action: manipulation`
- a cleaner path for future keyboard and accessibility improvements
