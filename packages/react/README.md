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
- Node.js `18+`
- ESM-compatible bundler/runtime

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
    <div style={{ width: 360, height: 360 }}>
      <SlidingPuzzle
        gridSize={3}
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
    </div>
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
      <div style={{ width: 420, height: 420 }}>
        <SlidingPuzzleBoard
          board={puzzle.board}
          content={<img alt="Poster" src="/poster.jpg" style={{ width: "100%", height: "100%", objectFit: "cover" }} />}
          gridSize={4}
          onTileClick={(index) => {
            puzzle.moveTile(index);
          }}
        />
      </div>

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
- `content`

Key customization props:

- layout: `gap`, `borderRadius`, `aspectRatio`, `animationDuration`
- styling: `className`, `boardStyle`, `tileClassName`, `tileStyle`, `tileFrameClassName`, `tileFrameStyle`, `contentClassName`, `contentStyle`, `emptyTileClassName`, `emptyTileStyle`
- tile UI: `showNumbers`, `numberBadgeStyle`, `numberTextStyle`
- behavior: `disabled`, `onTileClick`
- rendering hooks: `renderTileOverlay`, `renderEmptyTile`, `emptyTilePlaceholder`
- accessibility: `getTileAriaLabel`

Behavior notes:

- the board fills the width and height of its parent container
- content is sliced by percentage positioning rather than image processing
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

- Give the parent container an explicit size; the board itself is size-agnostic.
- Use `aspectRatio={1}` when you want a square board regardless of parent height.
- Use `renderTileOverlay` for badges, gradients, or tile-level chrome without mutating the source content.
- Use class names when integrating with a design system and inline style props for one-off customization.
- Tailwind is not required by the package.

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
