import React, {
  type CSSProperties,
  type ReactElement,
  type ReactNode,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  DEFAULT_SCRAMBLE_MOVES,
  createSolvedBoard,
  getEmptyTileId,
  getTileCount,
  isSolvedBoard,
  moveTile,
  scrambleBoard,
  type Board,
  type GridSize,
  type MoveResult,
} from "@mtsanaissi/sliding-ui-puzzle-core";
import {
  getContentViewportStyle,
  getTilePlacementStyle,
  getTilePosition,
} from "./layout.js";

export interface UseSlidingPuzzleOptions {
  gridSize: GridSize;
  scrambleMoves?: number;
  initialBoard?: Board;
  autoScramble?: boolean;
  onMove?: (result: MoveResult) => void;
  onScramble?: (board: Board) => void;
  onSolve?: (board: Board) => void;
}

export interface UseSlidingPuzzleResult {
  board: Board;
  emptyTileId: number;
  tileCount: number;
  isSolved: boolean;
  moveTile: (index: number) => MoveResult;
  scramble: () => Board;
  solve: () => Board;
  reset: () => Board;
  setBoard: React.Dispatch<React.SetStateAction<Board>>;
}

export interface SlidingPuzzleTileRenderProps {
  tileId: number;
  boardIndex: number;
  originalRow: number;
  originalCol: number;
  isEmpty: boolean;
  isSolved: boolean;
}

export interface SlidingPuzzleBoardProps {
  board: Board;
  gridSize: GridSize;
  content: ReactElement;
  className?: string;
  width?: CSSProperties["width"];
  height?: CSSProperties["height"];
  boardStyle?: CSSProperties;
  tileClassName?: string;
  tileStyle?: CSSProperties;
  tileFrameClassName?: string;
  tileFrameStyle?: CSSProperties;
  contentClassName?: string;
  contentStyle?: CSSProperties;
  emptyTileClassName?: string;
  emptyTileStyle?: CSSProperties;
  gap?: number;
  borderRadius?: number;
  animationDuration?: number;
  showNumbers?: boolean;
  aspectRatio?: number | string;
  disabled?: boolean;
  emptyTilePlaceholder?: ReactNode;
  numberBadgeStyle?: CSSProperties;
  numberTextStyle?: CSSProperties;
  onTileClick?: (index: number, tileId: number) => void;
  renderTileOverlay?: (
    props: SlidingPuzzleTileRenderProps,
  ) => ReactNode;
  renderEmptyTile?: (
    props: SlidingPuzzleTileRenderProps,
  ) => ReactNode;
  getTileAriaLabel?: (props: SlidingPuzzleTileRenderProps) => string;
}

export interface SlidingPuzzleProps
  extends Omit<SlidingPuzzleBoardProps, "board" | "onTileClick">,
    UseSlidingPuzzleOptions {}

const DEFAULT_NUMBER_BADGE_STYLE: CSSProperties = {
  position: "absolute",
  top: 8,
  right: 8,
  zIndex: 2,
  minWidth: 22,
  height: 22,
  paddingInline: 6,
  borderRadius: 9999,
  background: "rgba(15, 23, 42, 0.82)",
  boxShadow: "0 1px 2px rgba(15, 23, 42, 0.28)",
  backdropFilter: "blur(6px)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  pointerEvents: "none",
};

const DEFAULT_NUMBER_TEXT_STYLE: CSSProperties = {
  color: "rgba(248, 250, 252, 0.96)",
  fontWeight: 800,
  fontSize: 10,
  lineHeight: 1,
};

const CONTENT_ELEMENT_ERROR =
  "content must be a single React element with a rectangular root. Pass one element such as <div />, <img />, or a single custom component.";

const hasDefinedValue = (value: unknown): value is NonNullable<unknown> =>
  value !== undefined && value !== null;

const validateContentElement = (
  content: unknown,
  ownerName: string,
): ReactElement => {
  if (!React.isValidElement(content) || content.type === React.Fragment) {
    throw new TypeError(`${ownerName} ${CONTENT_ELEMENT_ERROR}`);
  }

  return content;
};

const getBoardSizingStyle = ({
  width,
  height,
  aspectRatio,
  boardStyle,
}: Pick<
  SlidingPuzzleBoardProps,
  "width" | "height" | "aspectRatio" | "boardStyle"
>): Pick<CSSProperties, "width" | "height" | "aspectRatio"> => {
  const hasExplicitWidth =
    hasDefinedValue(width) || hasDefinedValue(boardStyle?.width);
  const hasExplicitHeight =
    hasDefinedValue(height) || hasDefinedValue(boardStyle?.height);
  const hasExplicitAspectRatio =
    hasDefinedValue(aspectRatio) || hasDefinedValue(boardStyle?.aspectRatio);
  const resolvedAspectRatio =
    aspectRatio ??
    boardStyle?.aspectRatio ??
    (!hasExplicitHeight && !hasExplicitAspectRatio && hasExplicitWidth
      ? 1
      : undefined);

  return {
    width: width ?? boardStyle?.width ?? "100%",
    height:
      height ??
      boardStyle?.height ??
      (resolvedAspectRatio === undefined && !hasExplicitWidth
        ? "100%"
        : undefined),
    aspectRatio: resolvedAspectRatio,
  };
};

export const useSlidingPuzzle = ({
  gridSize,
  scrambleMoves = DEFAULT_SCRAMBLE_MOVES,
  initialBoard,
  autoScramble = true,
  onMove,
  onScramble,
  onSolve,
}: UseSlidingPuzzleOptions): UseSlidingPuzzleResult => {
  const createInitialBoard = (): Board => {
    if (initialBoard) {
      return [...initialBoard];
    }

    if (autoScramble) {
      return scrambleBoard({ gridSize, moves: scrambleMoves });
    }

    return createSolvedBoard(gridSize);
  };

  const [board, setBoard] = useState<Board>(createInitialBoard);

  useEffect(() => {
    setBoard(createInitialBoard());
  }, [gridSize, scrambleMoves, initialBoard, autoScramble]);

  const isSolved = useMemo(() => isSolvedBoard(board), [board]);
  const emptyTileId = useMemo(() => getEmptyTileId(gridSize), [gridSize]);
  const tileCount = useMemo(() => getTileCount(gridSize), [gridSize]);

  const handleMoveTile = (index: number): MoveResult => {
    const result = moveTile(board, index, gridSize);

    if (result.moved) {
      setBoard(result.board);
      onMove?.(result);

      if (result.isSolved) {
        onSolve?.(result.board);
      }
    }

    return result;
  };

  const handleScramble = (): Board => {
    const nextBoard = scrambleBoard({ gridSize, moves: scrambleMoves });
    setBoard(nextBoard);
    onScramble?.(nextBoard);
    return nextBoard;
  };

  const handleSolve = (): Board => {
    const solvedBoard = createSolvedBoard(gridSize);
    setBoard(solvedBoard);
    onSolve?.(solvedBoard);
    return solvedBoard;
  };

  const handleReset = (): Board => {
    const nextBoard = createInitialBoard();
    setBoard(nextBoard);
    return nextBoard;
  };

  return {
    board,
    emptyTileId,
    tileCount,
    isSolved,
    moveTile: handleMoveTile,
    scramble: handleScramble,
    solve: handleSolve,
    reset: handleReset,
    setBoard,
  };
};

export const SlidingPuzzleBoard = ({
  board,
  gridSize,
  content,
  className,
  width,
  height,
  boardStyle,
  tileClassName,
  tileStyle,
  tileFrameClassName,
  tileFrameStyle,
  contentClassName,
  contentStyle,
  emptyTileClassName,
  emptyTileStyle,
  gap = 2,
  borderRadius = 16,
  animationDuration = 300,
  showNumbers = false,
  aspectRatio,
  disabled = false,
  emptyTilePlaceholder,
  numberBadgeStyle,
  numberTextStyle,
  onTileClick,
  renderTileOverlay,
  renderEmptyTile,
  getTileAriaLabel,
}: SlidingPuzzleBoardProps) => {
  const emptyTileId = getEmptyTileId(gridSize);
  const isSolved = isSolvedBoard(board);
  const contentElement = validateContentElement(content, "SlidingPuzzleBoard");
  const boardSizingStyle = getBoardSizingStyle({
    width,
    height,
    aspectRatio,
    boardStyle,
  });
  const tileIds = useMemo(
    () => Array.from({ length: getTileCount(gridSize) }, (_, index) => index),
    [gridSize],
  );

  return (
    <div
      className={className}
      style={{
        position: "relative",
        ...boardStyle,
        ...boardSizingStyle,
      }}
    >
      {tileIds.map((tileId) => {
        const boardIndex = board.indexOf(tileId);
        const { row: originalRow, col: originalCol } = getTilePosition(
          tileId,
          gridSize,
        );
        const isEmpty = tileId === emptyTileId;
        const tileRenderProps: SlidingPuzzleTileRenderProps = {
          tileId,
          boardIndex,
          originalRow,
          originalCol,
          isEmpty,
          isSolved,
        };
        const baseStyle = getTilePlacementStyle(
          boardIndex,
          gridSize,
          gap,
          animationDuration,
        );

        if (isEmpty) {
          return (
            <div
              key={`tile-${tileId}`}
              className={emptyTileClassName}
              style={{
                ...baseStyle,
                zIndex: 0,
                cursor: "default",
                ...emptyTileStyle,
              }}
            >
              {renderEmptyTile?.(tileRenderProps) ??
                emptyTilePlaceholder ?? (
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius,
                    background: "rgba(15, 23, 42, 0.08)",
                    boxShadow: "inset 0 2px 10px rgba(0, 0, 0, 0.16)",
                  }}
                />
              )}
            </div>
          );
        }

        return (
          <button
            key={`tile-${tileId}`}
            type="button"
            onClick={() => onTileClick?.(boardIndex, tileId)}
            className={tileClassName}
            disabled={disabled}
            aria-label={
              getTileAriaLabel?.(tileRenderProps) ??
              `Move tile ${tileId + 1} to position ${boardIndex + 1}`
            }
            style={{
              ...baseStyle,
              ...tileStyle,
              zIndex: 1,
              overflow: "hidden",
              cursor: disabled || !onTileClick ? "default" : "pointer",
              touchAction: "manipulation",
              border: 0,
              background: "transparent",
            }}
          >
            <div
              className={tileFrameClassName}
              style={{
                width: "100%",
                height: "100%",
                position: "relative",
                overflow: "hidden",
                borderRadius,
                boxShadow: "0 1px 2px rgba(15, 23, 42, 0.16)",
                border: "1px solid rgba(15, 23, 42, 0.08)",
                background: "white",
                ...tileFrameStyle,
              }}
            >
              {showNumbers ? (
                <div
                  style={{
                    ...DEFAULT_NUMBER_BADGE_STYLE,
                    ...numberBadgeStyle,
                  }}
                >
                  <span
                    style={{
                      ...DEFAULT_NUMBER_TEXT_STYLE,
                      ...numberTextStyle,
                    }}
                  >
                    {tileId + 1}
                  </span>
                </div>
              ) : null}

              {renderTileOverlay?.(tileRenderProps)}

              <div
                className={contentClassName}
                style={{
                  ...getContentViewportStyle(originalCol, originalRow, gridSize),
                  ...contentStyle,
                }}
              >
                {contentElement}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export const SlidingPuzzle = ({
  gridSize,
  scrambleMoves,
  initialBoard,
  autoScramble,
  onMove,
  onScramble,
  onSolve,
  content,
  ...boardProps
}: SlidingPuzzleProps) => {
  const contentElement = validateContentElement(content, "SlidingPuzzle");
  const puzzle = useSlidingPuzzle({
    gridSize,
    scrambleMoves,
    initialBoard,
    autoScramble,
    onMove,
    onScramble,
    onSolve,
  });

  return (
    <SlidingPuzzleBoard
      {...boardProps}
      board={puzzle.board}
      content={contentElement}
      gridSize={gridSize}
      onTileClick={(index) => {
        puzzle.moveTile(index);
      }}
    />
  );
};
