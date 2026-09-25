# @mtsanaissi/sliding-ui-puzzle-react

React hook and rendering primitives for turning React content into a sliding puzzle inside any container.

This package is published on npm and follows Semantic Versioning for release updates.

## Install

```bash
pnpm add @mtsanaissi/sliding-ui-puzzle-react @mtsanaissi/sliding-ui-puzzle-core react react-dom
```

Requirements:

- React `19`
- React DOM `19`
- Node.js `22+`
- ESM-compatible bundler/runtime. The package is ESM-only and its export map has no `require` condition, so CommonJS `require()` is unsupported and throws `ERR_PACKAGE_PATH_NOT_EXPORTED`.

## Package shape

The package exposes three top-level entry points:

- `useSlidingPuzzle`: state and actions for custom puzzle UIs
- `SlidingPuzzleBoard`: visual board primitive for an existing board state
- `SlidingPuzzle`: convenience component that wires the hook to the board

The package is intentionally small. Product-specific menus, scoreboards, overlays, persistence, and theming remain consumer-owned concerns.

## Quickstart

```tsx
import { SlidingPuzzle } from "@mtsanaissi/sliding-ui-puzzle-react";

export function SimplePuzzle() {
  return (
    <SlidingPuzzle
      gridSize={3}
      width={360}
      content={
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "grid",
            placeItems: "center",
            background: "linear-gradient(135deg, #0f172a, #1d4ed8)",
            color: "white",
            fontSize: 40,
            fontWeight: 800,
          }}
        >
          PLAY
        </div>
      }
      showNumbers
    />
  );
}
```

## Hook example

```tsx
import {
  SlidingPuzzleBoard,
  useSlidingPuzzle,
} from "@mtsanaissi/sliding-ui-puzzle-react";

export function CustomPuzzle() {
  const puzzle = useSlidingPuzzle({
    gridSize: 4,
    scrambleMoves: 120,
    autoScramble: true,
  });

  return (
    <section>
      <SlidingPuzzleBoard
        board={puzzle.board}
        content={<img alt="Poster" src="/poster.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
        gridSize={4}
        onTileClick={(index) => {
          puzzle.moveTile(index);
        }}
        width={420}
      />

      <button onClick={() => puzzle.scramble()}>Scramble</button>
      <button onClick={() => puzzle.solve()}>Solve</button>
      <p>{puzzle.isSolved ? "Solved" : "Keep going"}</p>
    </section>
  );
}
```

## `useSlidingPuzzle`

Options:

- `gridSize`: required square board size
- `scrambleMoves`: optional scramble depth, defaults to `DEFAULT_SCRAMBLE_MOVES`
- `initialBoard`: optional starting board
- `autoScramble`: defaults to `true`
- `onMove(result)`: called after successful moves
- `onScramble(board)`: called after scramble
- `onSolve(board)`: called when a move or `solve()` reaches a solved board

Returned state and actions:

- `board`
- `emptyTileId`
- `tileCount`
- `isSolved`
- `moveTile(index)`
- `scramble()`
- `solve()`
- `reset()`
- `setBoard()`

## `SlidingPuzzleBoard`

Required props:

- `board`
- `gridSize`
- `content`: a single React element that acts as the rectangular puzzle surface

Key customization props:

- layout: `width`, `height`, `gap`, `borderRadius`, `aspectRatio`, `animationDuration`
- styling: `className`, `boardStyle`, `tileClassName`, `tileStyle`, `tileFrameClassName`, `tileFrameStyle`, `contentClassName`, `contentStyle`, `emptyTileClassName`, `emptyTileStyle`
- tile UI: `showNumbers`, `numberBadgeStyle`, `numberTextStyle`
- behavior: `disabled`, `onTileClick`
- rendering hooks: `renderTileOverlay`, `renderEmptyTile`, `emptyTilePlaceholder`
- accessibility: `getTileAriaLabel`

Behavior notes:

- the board still fills its parent container by default
- passing `width` without `height` uses a square fallback, which covers the common embed case without an extra wrapper
- content is sliced by percentage positioning rather than image processing
- `content` must be one rectangular React element; fragments, strings, arrays, and multiple sibling nodes are not supported
- interactive tiles render as `button` elements
- the empty tile is rendered separately and is never clickable

## `SlidingPuzzle`

`SlidingPuzzle` combines `useSlidingPuzzle` and `SlidingPuzzleBoard`.

Use it when you want:

- the default board interaction model
- minimal setup
- solve and scramble callbacks without building your own control shell

Drop down to `useSlidingPuzzle` plus `SlidingPuzzleBoard` when you need custom HUDs, move counters, persistence, analytics, or alternate controls.

## Supported use cases

- interactive marketing components built from live React content
- image puzzles using `img`, `picture`, or art components
- product demos with custom controls and solve flows
- embedded puzzle modules inside dashboards, docs, or event pages

## Styling guidance

- Either size the parent container or pass `width` and `height` directly to the package component.
- Use `width={360}` without `height` when you want the package to fall back to a square board.
- Use `aspectRatio={1}` when you want a square board that still follows a parent-driven width.
- Use `renderTileOverlay` for badges, gradients, or tile-level chrome without mutating the source content.
- Default tile numbers now use a darker badge and lighter text so they stay readable over darker content. Override with `numberBadgeStyle` and `numberTextStyle` when your design needs a different treatment.
- Use class names when integrating with a design system and inline style props for one-off customization.
- Tailwind is not required by the package.

## Content contract

- Pass one React element that renders the full puzzle surface, such as a single `div`, `img`, `picture`, or custom component.
- Do not pass strings, arrays, multiple siblings, or `React.Fragment`; the package throws at runtime for those unsupported shapes.
- The package does not attempt DOM capture or layout normalization for arbitrary content trees.

## Accessibility guidance

- Tiles are buttons, which provides baseline focusability and click semantics.
- Use `getTileAriaLabel` when default tile numbering is not descriptive enough for your content.
- Add your own surrounding instructions, status text, and completion messaging when the puzzle is part of a broader experience.
- Full keyboard puzzle controls are not implemented yet, so plan additional accessibility work if keyboard-only play is required in v1.

## Visual examples

The local demo app includes:

- UI puzzle example
- image puzzle example
- hook-driven custom controls example

Source: [`examples/vite-demo/App.tsx`](../../examples/vite-demo/App.tsx)

## Limitations

- no DOM capture or screenshot-to-puzzle pipeline
- no built-in persistence, timers, move counters, or menu overlays
- no first-class keyboard movement model yet
- square sliding boards only
- ESM-only packaging

## Support

- Issues: [github.com/mtsanaissi/sliding-tiles-puzzle/issues](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues)
- Source: [github.com/mtsanaissi/sliding-tiles-puzzle](https://github.com/mtsanaissi/sliding-tiles-puzzle)
- Support guide: [SUPPORT.md](../../SUPPORT.md)
- Custom integration: [integration request issue form](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues/new?template=integration-request.yml)
- Sponsor: [github.com/sponsors/mtsanaissi](https://github.com/sponsors/mtsanaissi)
- Donate: [buymeacoffee.com/mtsanaissi](https://buymeacoffee.com/mtsanaissi)
