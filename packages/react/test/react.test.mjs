import test from "node:test";
import assert from "node:assert/strict";

import React, { act } from "react";
import ReactDOMClient from "react-dom/client";
import { JSDOM } from "jsdom";

import {
  SlidingPuzzle,
  SlidingPuzzleBoard,
  useSlidingPuzzle,
} from "../dist/index.js";

const setupDom = () => {
  const dom = new JSDOM("<!doctype html><html><body></body></html>", {
    url: "http://localhost/",
  });

  Object.defineProperty(globalThis, "IS_REACT_ACT_ENVIRONMENT", {
    configurable: true,
    value: true,
  });
  Object.defineProperty(globalThis, "window", {
    configurable: true,
    value: dom.window,
  });
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: dom.window.document,
  });
  Object.defineProperty(globalThis, "navigator", {
    configurable: true,
    value: dom.window.navigator,
  });
  Object.defineProperty(globalThis, "HTMLElement", {
    configurable: true,
    value: dom.window.HTMLElement,
  });
  Object.defineProperty(globalThis, "Node", {
    configurable: true,
    value: dom.window.Node,
  });
  Object.defineProperty(globalThis, "Event", {
    configurable: true,
    value: dom.window.Event,
  });
  Object.defineProperty(globalThis, "MouseEvent", {
    configurable: true,
    value: dom.window.MouseEvent,
  });

  return dom;
};

const renderIntoDom = async (element) => {
  const dom = setupDom();
  const container = document.createElement("div");
  document.body.appendChild(container);
  const root = ReactDOMClient.createRoot(container);

  await act(async () => {
    root.render(element);
  });

  return {
    dom,
    container,
    root,
    cleanup: async () => {
      await act(async () => {
        root.unmount();
      });
      dom.window.close();
      delete globalThis.window;
      delete globalThis.document;
      delete globalThis.navigator;
      delete globalThis.HTMLElement;
      delete globalThis.Node;
      delete globalThis.Event;
      delete globalThis.MouseEvent;
      delete globalThis.IS_REACT_ACT_ENVIRONMENT;
    },
  };
};

test("SlidingPuzzleBoard forwards tile clicks with board index and tile id", async () => {
  const clicks = [];
  const rendered = await renderIntoDom(
    React.createElement(SlidingPuzzleBoard, {
      board: [0, 1, 2, 3, 4, 5, 6, 8, 7],
      gridSize: 3,
      content: React.createElement("div", null, "Board"),
      onTileClick: (index, tileId) => {
        clicks.push([index, tileId]);
      },
      showNumbers: true,
    }),
  );

  const firstTileButton = rendered.container.querySelector('button[aria-label="Move tile 1 to position 1"]');

  await act(async () => {
    firstTileButton.dispatchEvent(
      new rendered.dom.window.MouseEvent("click", { bubbles: true }),
    );
  });

  assert.deepEqual(clicks, [[0, 0]]);

  await rendered.cleanup();
});

test("useSlidingPuzzle updates board state after a mounted interaction", async () => {
  const Harness = () => {
    const puzzle = useSlidingPuzzle({
      autoScramble: false,
      gridSize: 3,
    });

    return React.createElement(
      "div",
      null,
      React.createElement("output", { "data-testid": "board" }, puzzle.board.join(",")),
      React.createElement(
        "button",
        {
          type: "button",
          onClick: () => {
            puzzle.moveTile(7);
          },
        },
        "Move tile 8",
      ),
    );
  };

  const rendered = await renderIntoDom(React.createElement(Harness));

  const output = rendered.container.querySelector('[data-testid="board"]');
  const button = rendered.container.querySelector("button");

  assert.equal(output.textContent, "0,1,2,3,4,5,6,7,8");

  await act(async () => {
    button.dispatchEvent(
      new rendered.dom.window.MouseEvent("click", { bubbles: true }),
    );
  });

  assert.equal(output.textContent, "0,1,2,3,4,5,6,8,7");

  await rendered.cleanup();
});

test("SlidingPuzzle triggers onSolve when a mounted board reaches the solved state", async () => {
  let solvedBoard = null;

  const rendered = await renderIntoDom(
    React.createElement(SlidingPuzzle, {
      autoScramble: false,
      content: React.createElement("div", null, "Puzzle"),
      gridSize: 3,
      initialBoard: [0, 1, 2, 3, 4, 5, 6, 8, 7],
      onSolve: (board) => {
        solvedBoard = board;
      },
    }),
  );

  const solveButton = rendered.container.querySelector(
    'button[aria-label="Move tile 8 to position 9"]',
  );

  await act(async () => {
    solveButton.dispatchEvent(
      new rendered.dom.window.MouseEvent("click", { bubbles: true }),
    );
  });

  assert.deepEqual(solvedBoard, [0, 1, 2, 3, 4, 5, 6, 7, 8]);

  await rendered.cleanup();
});

test("SlidingPuzzleBoard applies presentation props to the mounted DOM", async () => {
  const rendered = await renderIntoDom(
    React.createElement(SlidingPuzzleBoard, {
      board: [0, 1, 2, 3, 4, 5, 6, 8, 7],
      borderRadius: 24,
      boardStyle: { background: "rgb(10, 20, 30)" },
      content: React.createElement("div", null, "Decorated"),
      gap: 4,
      gridSize: 3,
      showNumbers: true,
    }),
  );

  const board = rendered.container.firstElementChild;
  const numberBadges = rendered.container.querySelectorAll("span");

  assert.match(board.getAttribute("style"), /background: rgb\(10, 20, 30\)/);
  assert.equal(numberBadges.length >= 8, true);

  await rendered.cleanup();
});
