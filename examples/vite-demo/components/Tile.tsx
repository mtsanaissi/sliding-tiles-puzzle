import React, { ReactNode } from 'react';

interface TileProps {
  id: number; // The visual ID of the tile content
  index: number; // The current grid position
  onClick: (index: number) => void;
  isEmpty: boolean;
  gridSize: number; 
  content: ReactNode; // The FULL page content
  theme: string; 
  showNumbers: boolean;
}

export const Tile: React.FC<TileProps> = ({ id, index, onClick, isEmpty, gridSize, content, theme, showNumbers }) => {
  // 1. Where is this tile currently positioned on the screen? (GRID POSITION)
  const currentCol = index % gridSize;
  const currentRow = Math.floor(index / gridSize);
  
  // 2. Which part of the original image does this tile show? (SOURCE POSITION)
  const originalCol = id % gridSize;
  const originalRow = Math.floor(id / gridSize);

  // Dimensions
  const tileWidthPercent = 100 / gridSize;
  const tileHeightPercent = 100 / gridSize;

  if (isEmpty) {
    return (
      <div
        className="absolute transition-all duration-300 ease-in-out"
        style={{
          width: `${tileWidthPercent}%`,
          height: `${tileHeightPercent}%`,
          left: `${currentCol * tileWidthPercent}%`,
          top: `${currentRow * tileHeightPercent}%`,
          padding: '2px', 
          zIndex: 0,
        }}
      >
        <div className="w-full h-full rounded-xl bg-slate-900/10 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"></div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onClick(index)}
      className="absolute tile-transition cursor-pointer touch-manipulation z-10 overflow-hidden"
      style={{
        width: `${tileWidthPercent}%`,
        height: `${tileHeightPercent}%`,
        left: `${currentCol * tileWidthPercent}%`,
        top: `${currentRow * tileHeightPercent}%`,
        padding: '1px', // The gap between tiles
      }}
    >
      {/* 
        The Tile Container: 
        - Rounded corners to look like a piece.
        - Overflow hidden to mask the content.
      */}
      <div className={`w-full h-full rounded-xl overflow-hidden relative shadow-sm border border-black/5 ${theme}`}>
        
        {/* Order Indicator */}
        {showNumbers && (
            <div className="absolute top-2 right-2 z-20 w-5 h-5 bg-black/10 rounded-full flex items-center justify-center pointer-events-none">
                <span className="text-black/50 font-bold text-[10px]">{id + 1}</span>
            </div>
        )}

        {/* 
           The Inner Content:
           - Sized to be the FULL Grid (Scale Factor = gridSize * 100%).
           - Shifted negatively so the correct sector shows through this tile's window.
        */}
        <div 
          className="absolute flex flex-col pointer-events-none" 
          style={{
            width: `${gridSize * 100}%`, 
            height: `${gridSize * 100}%`,
            left: `-${originalCol * 100}%`, 
            top: `-${originalRow * 100}%`,
          }}
        >
          {content}
        </div>
      </div>
    </div>
  );
};