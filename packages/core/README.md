# @mtsanaissi/sliding-ui-puzzle-core

Framework-agnostic sliding-puzzle logic for board creation, legal moves, solvable scrambling, solved-state checks, and board serialization.

This package is published on npm and follows Semantic Versioning for release updates.

## Install

```bash
pnpm add @mtsanaissi/sliding-ui-puzzle-core
```

Requirements:

- Node.js `18+`
- ESM-compatible runtime or bundler

## Best fit

Use this package when you need:

- puzzle rules without any UI dependency
- deterministic scrambling for tests or seeded gameplay
- board state that can be stored, restored, or synchronized
- a foundation for React or non-React puzzle interfaces

## Quick example

```ts
import {
  createSolvedBoard,
  moveTile,
  scrambleBoard,
  serializeBoard,
} from "@mtsanaissi/sliding-ui-puzzle-core";

const gridSize = 3;
const start = scrambleBoard({ gridSize, moves: 40 });
const result = moveTile(start, 7, gridSize);

console.log(result.moved);
console.log(serializeBoard(result.board));
console.log(createSolvedBoard(gridSize));
```

## Public API

Types:

- `Board`
- `GridSize`
- `TileId`
- `PuzzleState`
- `MoveResult`
- `ScrambleOptions`

Constants:

- `DEFAULT_SCRAMBLE_MOVES`

Board helpers:

- `getTileCount(gridSize)`
- `getEmptyTileId(gridSize)`
- `createSolvedBoard(gridSize)`
- `isSolvedBoard(board)`
- `getAdjacentIndexes(index, gridSize)`
- `getEmptyIndex(board, gridSize)`
- `canMoveTile(board, index, gridSize)`
- `moveTile(board, index, gridSize)`
- `scrambleBoard(options)`
- `createPuzzleState(gridSize, board?)`
- `serializeBoard(board)`
- `deserializeBoard(value)`

## API notes

- `createSolvedBoard` returns tiles in solved order where the empty tile is the last tile id.
- `moveTile` is immutable. Illegal moves return the original board reference with `moved: false`.
- `scrambleBoard` generates reachable states by applying legal moves from a solved or provided starting board.
- `scrambleBoard` accepts a custom `random()` function so tests can be deterministic.
- `serializeBoard` and `deserializeBoard` use a comma-separated format intended for URLs, storage, or simple persistence layers.

## Supported use cases

- game-state engines for custom frontends
- URL- or local-storage-backed puzzle sessions
- educational demos that need predictable move validation
- shared core logic for React, canvas, or server-side simulation code

## Constraints and limitations

- `gridSize` must be an integer `>= 2`
- only square sliding puzzles are supported
- the package does not provide a renderer, accessibility layer, or input bindings
- board validity beyond empty-tile presence is assumed to be controlled by the consumer

## Related package

If you want ready-made React primitives, use [`@mtsanaissi/sliding-ui-puzzle-react`](../react/README.md).

## Support

- Issues: [github.com/mtsanaissi/sliding-tiles-puzzle/issues](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues)
- Source: [github.com/mtsanaissi/sliding-tiles-puzzle](https://github.com/mtsanaissi/sliding-tiles-puzzle)
- Support guide: [SUPPORT.md](../../SUPPORT.md)
- Custom integration: [integration request issue form](https://github.com/mtsanaissi/sliding-tiles-puzzle/issues/new?template=integration-request.yml)
- Sponsor: [github.com/sponsors/mtsanaissi](https://github.com/sponsors/mtsanaissi)
- Donate: [buymeacoffee.com/mtsanaissi](https://buymeacoffee.com/mtsanaissi)
