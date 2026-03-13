# Rendering And Styling

This document records the v1 rendering decisions for `@mtsanaissi/sliding-ui-puzzle-react`.

## Rendering Model

The board renderer assumes only that the parent provides size.

- By default the board fills the width and height of its container.
- Consumers may also provide `aspectRatio` to keep the board square or force another ratio.
- Tile slicing is percentage-based, so the viewport logic scales with any container size.

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
