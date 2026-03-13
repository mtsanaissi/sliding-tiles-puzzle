import type { CSSProperties } from "react";
import type { GridSize } from "@mtsanaissi/sliding-ui-puzzle-core";

export interface TilePosition {
  row: number;
  col: number;
}

export const getTilePosition = (
  index: number,
  gridSize: GridSize,
): TilePosition => ({
  row: Math.floor(index / gridSize),
  col: index % gridSize,
});

export const getTileDimensions = (gridSize: GridSize) => ({
  widthPercent: 100 / gridSize,
  heightPercent: 100 / gridSize,
});

export const getTilePlacementStyle = (
  boardIndex: number,
  gridSize: GridSize,
  gap: number,
  animationDuration: number,
): CSSProperties => {
  const { row, col } = getTilePosition(boardIndex, gridSize);
  const { widthPercent, heightPercent } = getTileDimensions(gridSize);

  return {
    position: "absolute",
    width: `${widthPercent}%`,
    height: `${heightPercent}%`,
    left: `${col * widthPercent}%`,
    top: `${row * heightPercent}%`,
    padding: `${gap}px`,
    transition: `all ${animationDuration}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    boxSizing: "border-box",
  };
};

export const getContentViewportStyle = (
  originalCol: number,
  originalRow: number,
  gridSize: GridSize,
): CSSProperties => ({
  position: "absolute",
  width: `${gridSize * 100}%`,
  height: `${gridSize * 100}%`,
  left: `-${originalCol * 100}%`,
  top: `-${originalRow * 100}%`,
  display: "flex",
  flexDirection: "column",
  pointerEvents: "none",
});
