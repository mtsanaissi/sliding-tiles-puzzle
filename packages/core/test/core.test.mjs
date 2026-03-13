import test from "node:test";
import assert from "node:assert/strict";

import {
  createPuzzleState,
  createSolvedBoard,
  canMoveTile,
  deserializeBoard,
  getAdjacentIndexes,
  getEmptyIndex,
  getEmptyTileId,
  isSolvedBoard,
  moveTile,
  scrambleBoard,
  serializeBoard,
} from "../dist/index.js";

const createSequenceRandom = (...values) => {
  let index = 0;

  return () => {
    const value = values[index] ?? values[values.length - 1] ?? 0;
    index += 1;
    return value;
  };
};

test("createSolvedBoard returns the solved board for a 3x3 puzzle", () => {
  assert.deepEqual(createSolvedBoard(3), [0, 1, 2, 3, 4, 5, 6, 7, 8]);
});

test("getAdjacentIndexes returns correct neighbors for center and corner tiles", () => {
  assert.deepEqual(getAdjacentIndexes(4, 3), [1, 7, 3, 5]);
  assert.deepEqual(getAdjacentIndexes(0, 3), [3, 1]);
});

test("canMoveTile only allows tiles adjacent to the empty space", () => {
  const board = createSolvedBoard(3);

  assert.equal(canMoveTile(board, 5, 3), true);
  assert.equal(canMoveTile(board, 7, 3), true);
  assert.equal(canMoveTile(board, 4, 3), false);
  assert.equal(canMoveTile(board, 8, 3), false);
});

test("moveTile returns an immutable updated board for a legal move", () => {
  const board = createSolvedBoard(3);
  const result = moveTile(board, 7, 3);

  assert.equal(result.moved, true);
  assert.deepEqual(board, [0, 1, 2, 3, 4, 5, 6, 7, 8]);
  assert.deepEqual(result.board, [0, 1, 2, 3, 4, 5, 6, 8, 7]);
  assert.equal(result.isSolved, false);
  assert.equal(getEmptyIndex(result.board, 3), 7);
});

test("moveTile preserves the board for an illegal move", () => {
  const board = createSolvedBoard(3);
  const result = moveTile(board, 4, 3);

  assert.equal(result.moved, false);
  assert.equal(result.board, board);
  assert.equal(result.isSolved, true);
});

test("scrambleBoard keeps the empty tile and produces a solvable non-solved board", () => {
  const board = scrambleBoard({
    gridSize: 3,
    moves: 12,
    random: createSequenceRandom(0.1, 0.7, 0.2, 0.9, 0.3, 0.4),
  });

  assert.equal(board.length, 9);
  assert.equal(board.includes(getEmptyTileId(3)), true);
  assert.equal(isSolvedBoard(board), false);
});

test("scrambleBoard is deterministic with a deterministic random source", () => {
  const createRandom = () =>
    createSequenceRandom(0.2, 0.8, 0.4, 0.6, 0.1, 0.9, 0.3);

  const first = scrambleBoard({
    gridSize: 4,
    moves: 16,
    random: createRandom(),
  });
  const second = scrambleBoard({
    gridSize: 4,
    moves: 16,
    random: createRandom(),
  });

  assert.deepEqual(first, second);
});

test("serialization helpers round-trip a board", () => {
  const board = [0, 1, 2, 3, 4, 8, 6, 7, 5];

  assert.deepEqual(deserializeBoard(serializeBoard(board)), board);
});

test("createPuzzleState exposes derived metadata for a board", () => {
  const board = [0, 1, 2, 3, 4, 8, 6, 7, 5];
  const state = createPuzzleState(3, board);

  assert.equal(state.gridSize, 3);
  assert.equal(state.emptyTileId, 8);
  assert.equal(state.isSolved, false);
  assert.deepEqual(state.board, board);
});
