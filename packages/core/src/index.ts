export type TileId = number;
export type Board = TileId[];
export type GridSize = number;

export interface PuzzleState {
  board: Board;
  gridSize: GridSize;
  emptyTileId: TileId;
  isSolved: boolean;
}

export interface MoveResult {
  board: Board;
  moved: boolean;
  fromIndex: number;
  toIndex: number;
  movedTileId: TileId | null;
  isSolved: boolean;
}

export interface ScrambleOptions {
  gridSize: GridSize;
  moves?: number;
  random?: () => number;
  startBoard?: Board;
}

export const DEFAULT_SCRAMBLE_MOVES = 200;

// Public API is exported from this module. File-local helpers below remain internal.
const isValidGridSize = (gridSize: GridSize): boolean =>
  Number.isInteger(gridSize) && gridSize >= 2;

const assertGridSize = (gridSize: GridSize): void => {
  if (!isValidGridSize(gridSize)) {
    throw new Error(`Invalid grid size: ${gridSize}`);
  }
};

const cloneBoard = (board: Board): Board => [...board];

const getRandomIndex = (length: number, random: () => number): number =>
  Math.floor(random() * length);

export const getTileCount = (gridSize: GridSize): number => {
  assertGridSize(gridSize);
  return gridSize * gridSize;
};

export const getEmptyTileId = (gridSize: GridSize): TileId =>
  getTileCount(gridSize) - 1;

export const createSolvedBoard = (gridSize: GridSize): Board =>
  Array.from({ length: getTileCount(gridSize) }, (_, index) => index);

export const isSolvedBoard = (board: Board): boolean =>
  board.every((tileId, index) => tileId === index);

export const getAdjacentIndexes = (
  index: number,
  gridSize: GridSize,
): number[] => {
  assertGridSize(gridSize);

  const row = Math.floor(index / gridSize);
  const col = index % gridSize;
  const adjacent: number[] = [];

  if (row > 0) adjacent.push(index - gridSize);
  if (row < gridSize - 1) adjacent.push(index + gridSize);
  if (col > 0) adjacent.push(index - 1);
  if (col < gridSize - 1) adjacent.push(index + 1);

  return adjacent;
};

export const getEmptyIndex = (board: Board, gridSize: GridSize): number => {
  const emptyIndex = board.indexOf(getEmptyTileId(gridSize));

  if (emptyIndex === -1) {
    throw new Error("Board does not contain the empty tile");
  }

  return emptyIndex;
};

export const canMoveTile = (
  board: Board,
  index: number,
  gridSize: GridSize,
): boolean => {
  const emptyTileId = getEmptyTileId(gridSize);

  if (board[index] === emptyTileId) {
    return false;
  }

  const emptyIndex = getEmptyIndex(board, gridSize);
  return getAdjacentIndexes(emptyIndex, gridSize).includes(index);
};

export const moveTile = (
  board: Board,
  index: number,
  gridSize: GridSize,
): MoveResult => {
  const emptyIndex = getEmptyIndex(board, gridSize);
  const movedTileId = board[index] ?? null;

  if (!canMoveTile(board, index, gridSize)) {
    return {
      board,
      moved: false,
      fromIndex: index,
      toIndex: emptyIndex,
      movedTileId,
      isSolved: isSolvedBoard(board),
    };
  }

  const nextBoard = cloneBoard(board);
  [nextBoard[index], nextBoard[emptyIndex]] = [
    nextBoard[emptyIndex],
    nextBoard[index],
  ];

  return {
    board: nextBoard,
    moved: true,
    fromIndex: index,
    toIndex: emptyIndex,
    movedTileId,
    isSolved: isSolvedBoard(nextBoard),
  };
};

export const scrambleBoard = ({
  gridSize,
  moves = DEFAULT_SCRAMBLE_MOVES,
  random = Math.random,
  startBoard,
}: ScrambleOptions): Board => {
  let board = cloneBoard(startBoard ?? createSolvedBoard(gridSize));
  let emptyIndex = getEmptyIndex(board, gridSize);
  let previousEmptyIndex = -1;

  for (let move = 0; move < moves; move += 1) {
    const adjacentIndexes = getAdjacentIndexes(emptyIndex, gridSize);
    const candidateIndexes = adjacentIndexes.filter(
      (index) => index !== previousEmptyIndex,
    );
    const nextIndexes =
      candidateIndexes.length > 0 ? candidateIndexes : adjacentIndexes;
    const targetIndex = nextIndexes[getRandomIndex(nextIndexes.length, random)];

    [board[emptyIndex], board[targetIndex]] = [
      board[targetIndex],
      board[emptyIndex],
    ];
    previousEmptyIndex = emptyIndex;
    emptyIndex = targetIndex;
  }

  return board;
};

export const createPuzzleState = (
  gridSize: GridSize,
  board: Board = createSolvedBoard(gridSize),
): PuzzleState => ({
  board,
  gridSize,
  emptyTileId: getEmptyTileId(gridSize),
  isSolved: isSolvedBoard(board),
});

export const serializeBoard = (board: Board): string => board.join(",");

export const deserializeBoard = (value: string): Board =>
  value
    .split(",")
    .filter((part) => part.length > 0)
    .map((part) => Number.parseInt(part, 10));
