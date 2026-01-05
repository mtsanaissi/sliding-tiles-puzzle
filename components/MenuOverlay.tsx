import React, { useState, useEffect } from 'react';
import { LEVELS } from '../constants';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectLevel: (levelId: number) => void;
  onNextLevel: () => void;
  onPrevLevel: () => void;
  onScramble: () => void;
  onSolve: () => void;
  showTileNumbers: boolean;
  onToggleNumbers: () => void;
  gridSize: number;
  onSetGridSize: (size: number) => void;
}

export const MenuOverlay: React.FC<MenuOverlayProps> = ({ 
  isOpen, 
  onClose, 
  onSelectLevel, 
  onNextLevel, 
  onPrevLevel,
  onScramble,
  onSolve,
  showTileNumbers,
  onToggleNumbers,
  gridSize,
  onSetGridSize
}) => {
  const [view, setView] = useState<'main' | 'howto'>('main');

  // Reset view to main when menu opens
  useEffect(() => {
    if (isOpen) {
      setView('main');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-900/60 backdrop-blur-md animate-fade-in p-4">
      <div className="bg-white rounded-3xl p-8 max-w-sm w-full shadow-2xl text-center border-4 border-sky-200 max-h-[90vh] overflow-y-auto">
        
        {view === 'main' ? (
            <>
                <h2 className="text-3xl font-bold text-slate-800 mb-6 font-['Fredoka']">Menu</h2>
                
                {/* Level Selection */}
                <div className="space-y-2 mb-4">
                {LEVELS.map((level) => (
                    <button
                    key={level.id}
                    onClick={() => onSelectLevel(level.id)}
                    className="w-full py-2 rounded-xl bg-slate-100 hover:bg-sky-100 text-slate-700 hover:text-sky-700 font-bold text-lg transition-colors shadow-sm"
                    >
                    {level.name}
                    </button>
                ))}
                </div>

                {/* Grid Size Selector */}
                <div className="mb-4 bg-slate-50 p-2 rounded-xl">
                   <p className="text-xs font-bold text-slate-400 uppercase mb-2">Grid Size</p>
                   <div className="flex gap-2">
                     <button 
                       onClick={() => onSetGridSize(3)}
                       className={`flex-1 py-2 rounded-lg font-bold transition-all ${gridSize === 3 ? 'bg-sky-500 text-white shadow-md' : 'bg-white text-slate-500 border hover:bg-slate-100'}`}
                     >
                       3x3
                     </button>
                     <button 
                       onClick={() => onSetGridSize(4)}
                       className={`flex-1 py-2 rounded-lg font-bold transition-all ${gridSize === 4 ? 'bg-sky-500 text-white shadow-md' : 'bg-white text-slate-500 border hover:bg-slate-100'}`}
                     >
                       4x4
                     </button>
                   </div>
                </div>

                {/* Toggles & Misc */}
                <div className="flex gap-3 mb-4">
                     <button
                        onClick={onToggleNumbers}
                        className={`flex-1 py-2 rounded-xl font-bold transition-colors shadow-sm border-2 text-sm ${showTileNumbers ? 'bg-sky-100 border-sky-300 text-sky-800' : 'bg-slate-100 border-slate-300 text-slate-500'}`}
                     >
                        #{showTileNumbers ? ' ON' : ' OFF'}
                     </button>
                     <button
                        onClick={() => setView('howto')}
                        className="flex-1 py-2 bg-yellow-100 hover:bg-yellow-200 border-2 border-yellow-300 text-yellow-800 rounded-xl font-bold transition-colors shadow-sm text-sm"
                     >
                        <i className="fa-solid fa-question-circle mr-1"></i> Help
                     </button>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 mb-4">
                    <button
                        onClick={onScramble}
                        className="flex-1 py-3 bg-amber-400 hover:bg-amber-500 text-white rounded-xl font-bold transition-colors shadow-md active:scale-95"
                    >
                        <i className="fa-solid fa-shuffle mr-2"></i> Scramble
                    </button>
                    <button
                        onClick={onSolve}
                        className="flex-1 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-colors shadow-md active:scale-95"
                    >
                        <i className="fa-solid fa-eye mr-2"></i> Solution
                    </button>
                </div>

                {/* Navigation Buttons */}
                <div className="flex gap-3 mb-4">
                    <button 
                        onClick={onPrevLevel}
                        className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                        <i className="fa-solid fa-arrow-left"></i> Prev
                    </button>
                    <button 
                        onClick={onNextLevel}
                        className="flex-1 py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors flex items-center justify-center gap-2 shadow-md active:scale-95"
                    >
                        Next <i className="fa-solid fa-arrow-right"></i>
                    </button>
                </div>
            </>
        ) : (
            <>
                <h2 className="text-3xl font-bold text-slate-800 mb-6 font-['Fredoka']">How to Play</h2>
                <div className="text-left text-slate-600 mb-8 space-y-4">
                    <p>
                        <i className="fa-solid fa-hand-pointer text-sky-500 mr-2"></i>
                        The goal is to rearrange the scrambled tiles to form the complete page content.
                    </p>
                    <p>
                        <i className="fa-solid fa-arrows-up-down-left-right text-sky-500 mr-2"></i>
                        Click on any tile adjacent to the <strong>Empty Space</strong> to slide it into that spot.
                    </p>
                    <p>
                        <i className="fa-solid fa-shapes text-sky-500 mr-2"></i>
                        Use the <strong>Background Shapes</strong> and colors to guide you.
                    </p>
                    <p>
                         <i className="fa-solid fa-trophy text-sky-500 mr-2"></i>
                        Order tiles from 1 to {gridSize * gridSize - 1} (left-to-right) to win!
                    </p>
                </div>
                <button
                    onClick={() => setView('main')}
                    className="w-full py-3 bg-sky-500 hover:bg-sky-600 text-white rounded-xl font-bold transition-colors shadow-md active:scale-95 mb-4"
                >
                    Back to Menu
                </button>
            </>
        )}

        <button
          onClick={onClose}
          className="text-slate-400 hover:text-slate-600 font-semibold transition-colors"
        >
          Close (ESC)
        </button>
      </div>
    </div>
  );
};