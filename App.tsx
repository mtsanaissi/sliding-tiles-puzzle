import React, { useState, useEffect, useCallback } from 'react';
import { Tile } from './components/Tile';
import { MenuOverlay } from './components/MenuOverlay';
import { LEVELS } from './constants';
import { GridState } from './types';

// Constants
const SCRAMBLE_MOVES = 200;

export default function App() {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gridSize, setGridSize] = useState(3);
  const [gridState, setGridState] = useState<GridState>([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSolved, setIsSolved] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [showTileNumbers, setShowTileNumbers] = useState(true);

  // Derived constants
  const tileCount = gridSize * gridSize;
  const emptyTileId = tileCount - 1;

  // Initialize Solved State: [0, 1, 2, ..., tileCount-1]
  const getSolvedState = useCallback((): GridState => {
      return Array.from({ length: tileCount }, (_, i) => i);
  }, [tileCount]);

  // Check if Solved
  const checkWin = useCallback((currentGrid: GridState) => {
    const won = currentGrid.every((tileId, index) => tileId === index);
    return won;
  }, []);

  // Scramble Logic
  const scrambleBoard = useCallback(() => {
    let board = getSolvedState();
    let emptyIdx = board.indexOf(emptyTileId);
    let previousEmptyIdx = -1;

    for (let i = 0; i < SCRAMBLE_MOVES; i++) {
      const neighbors = [];
      const row = Math.floor(emptyIdx / gridSize);
      const col = emptyIdx % gridSize;

      if (row > 0) neighbors.push(emptyIdx - gridSize); // Up
      if (row < gridSize - 1) neighbors.push(emptyIdx + gridSize); // Down
      if (col > 0) neighbors.push(emptyIdx - 1); // Left
      if (col < gridSize - 1) neighbors.push(emptyIdx + 1); // Right

      const validNeighbors = neighbors.filter(idx => idx !== previousEmptyIdx);
      
      const targetIdx = validNeighbors.length > 0 
        ? validNeighbors[Math.floor(Math.random() * validNeighbors.length)]
        : neighbors[Math.floor(Math.random() * neighbors.length)];

      [board[emptyIdx], board[targetIdx]] = [board[targetIdx], board[emptyIdx]];
      previousEmptyIdx = emptyIdx;
      emptyIdx = targetIdx;
    }

    // Solvability check not strictly needed here as we reverse-move scramble, 
    // but ensures last tiles aren't swapped oddly if logic drifts.
    // The reverse-move method guarantees solvability.

    return board;
  }, [gridSize, emptyTileId, getSolvedState]);

  // Reset Board when Level or Grid Size changes
  useEffect(() => {
    setIsSolved(false);
    setIsAnimating(false);
    const newBoard = scrambleBoard();
    setGridState(newBoard);
    setGameStarted(true);
  }, [currentLevelIndex, gridSize, scrambleBoard]);

  const handleTileClick = (clickedIndex: number) => {
    if (isSolved || isAnimating || !gameStarted) return;

    const tileId = gridState[clickedIndex];
    if (tileId === emptyTileId) return;

    const emptyIndex = gridState.indexOf(emptyTileId);
    const row = Math.floor(clickedIndex / gridSize);
    const col = clickedIndex % gridSize;
    const emptyRow = Math.floor(emptyIndex / gridSize);
    const emptyCol = emptyIndex % gridSize;

    const isAdjacent = 
      (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
      (Math.abs(col - emptyCol) === 1 && row === emptyRow);

    if (isAdjacent) {
      const newGrid = [...gridState];
      [newGrid[clickedIndex], newGrid[emptyIndex]] = [newGrid[emptyIndex], newGrid[clickedIndex]];
      setGridState(newGrid);

      if (checkWin(newGrid)) {
        handleWin();
      }
    }
  };

  const handleWin = () => {
    setIsSolved(true);
    if (window.confetti) {
      window.confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.6 },
        colors: ['#fca5a5', '#86efac', '#fde047', '#93c5fd']
      });
    }

    // After winning, show menu instead of auto-advancing
    setTimeout(() => {
      setIsMenuOpen(true);
    }, 3000);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsMenuOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleLevelSelect = (levelId: number) => {
    const index = LEVELS.findIndex(l => l.id === levelId);
    if (index !== -1) {
        if (index === currentLevelIndex) {
            // Soft reset
            setGridState(scrambleBoard());
            setIsSolved(false);
        }
        setCurrentLevelIndex(index);
        setIsMenuOpen(false);
    }
  };

  const handleGridSizeChange = (newSize: number) => {
      if (newSize !== gridSize) {
          setGameStarted(false);
          setGridSize(newSize);
          // Effect will trigger re-scramble
      }
  };

  const handleNextLevel = () => {
    const nextIndex = (currentLevelIndex + 1) % LEVELS.length;
    setCurrentLevelIndex(nextIndex);
    setIsMenuOpen(false);
  };

  const handlePrevLevel = () => {
    const prevIndex = (currentLevelIndex - 1 + LEVELS.length) % LEVELS.length;
    setCurrentLevelIndex(prevIndex);
    setIsMenuOpen(false);
  };

  const handleScramble = () => {
      setGridState(scrambleBoard());
      setIsSolved(false);
      setIsMenuOpen(false);
  };

  const handleSolve = () => {
      setGridState(getSolvedState());
      setIsSolved(true);
      setIsMenuOpen(false);
  };

  if (!gameStarted) return null;

  const currentLevel = LEVELS[currentLevelIndex];
  // Re-generate tile IDs based on current tileCount
  const tileIds = Array.from({ length: tileCount }, (_, i) => i);

  return (
    <div className="relative w-screen h-screen bg-slate-900 overflow-hidden select-none">
      
      <MenuOverlay 
        isOpen={isMenuOpen} 
        onClose={() => setIsMenuOpen(false)}
        onSelectLevel={handleLevelSelect}
        onNextLevel={handleNextLevel}
        onPrevLevel={handlePrevLevel}
        onScramble={handleScramble}
        onSolve={handleSolve}
        showTileNumbers={showTileNumbers}
        onToggleNumbers={() => setShowTileNumbers(prev => !prev)}
        gridSize={gridSize}
        onSetGridSize={handleGridSizeChange}
      />

      {/* The Game Area */}
      <div className="w-full h-full relative">
         {tileIds.map((id) => {
            const currentPositionIndex = gridState.indexOf(id);
            const isContentEmpty = id === emptyTileId;
            
            return (
              <Tile
                key={`tile-${id}`}
                id={id} 
                index={currentPositionIndex}
                isEmpty={isContentEmpty}
                onClick={handleTileClick}
                gridSize={gridSize}
                content={currentLevel.content}
                theme={currentLevel.theme}
                showNumbers={showTileNumbers}
              />
            );
         })}
      </div>
    </div>
  );
}