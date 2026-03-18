import React, { useEffect, useState } from "react";
import { MenuOverlay } from "./components/MenuOverlay";
import { LEVELS } from "./constants";
import {
  SlidingPuzzleBoard,
  useSlidingPuzzle,
} from "../../packages/react/src";

type DemoMode = "ui" | "image" | "custom";

interface ExampleSwitcherProps {
  activeMode: DemoMode;
  onSelect: (mode: DemoMode) => void;
}

const EXAMPLE_LABELS: Record<DemoMode, string> = {
  ui: "UI Puzzle",
  image: "Image Puzzle",
  custom: "Custom Controls",
};

const ExampleSwitcher = ({
  activeMode,
  onSelect,
}: ExampleSwitcherProps) => (
  <div className="absolute top-4 left-4 z-40 flex gap-2 rounded-2xl bg-white/70 p-2 shadow-xl backdrop-blur-md">
    {(Object.keys(EXAMPLE_LABELS) as DemoMode[]).map((mode) => (
      <button
        key={mode}
        type="button"
        onClick={() => onSelect(mode)}
        className={`rounded-xl px-4 py-2 text-sm font-bold transition-colors ${
          activeMode === mode
            ? "bg-slate-900 text-white"
            : "bg-white/70 text-slate-700 hover:bg-slate-100"
        }`}
      >
        {EXAMPLE_LABELS[mode]}
      </button>
    ))}
  </div>
);

const SUPPORT_LINKS = {
  issues: "https://github.com/mtsanaissi/sliding-tiles-puzzle/issues",
  support: "https://github.com/mtsanaissi/sliding-tiles-puzzle/blob/main/SUPPORT.md",
  integration:
    "https://github.com/mtsanaissi/sliding-tiles-puzzle/issues/new?template=integration-request.yml",
  sponsors: "https://github.com/sponsors/mtsanaissi",
  donate: "https://buymeacoffee.com/mtsanaissi",
} as const;

const SupportDock = () => (
  <div className="pointer-events-auto absolute bottom-4 right-4 z-40 w-[min(24rem,calc(100vw-2rem))] rounded-[1.75rem] border border-white/15 bg-slate-950/82 p-4 text-white shadow-2xl backdrop-blur-md">
    <p className="text-[0.65rem] font-bold uppercase tracking-[0.35em] text-cyan-300">
      Support
    </p>
    <p className="mt-3 text-lg font-black tracking-tight">
      Keep the package free. Use issues for bugs and the integration form for
      bespoke work.
    </p>
    <div className="mt-4 flex flex-wrap gap-2 text-sm font-bold">
      <a
        className="rounded-full bg-cyan-300 px-4 py-2 text-slate-950 transition hover:bg-cyan-200"
        href={SUPPORT_LINKS.issues}
        rel="noreferrer"
        target="_blank"
      >
        Report issue
      </a>
      <a
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:bg-white/10"
        href={SUPPORT_LINKS.integration}
        rel="noreferrer"
        target="_blank"
      >
        Request integration
      </a>
      <a
        className="rounded-full border border-white/15 bg-white/5 px-4 py-2 transition hover:bg-white/10"
        href={SUPPORT_LINKS.support}
        rel="noreferrer"
        target="_blank"
      >
        Support guide
      </a>
      <a
        className="rounded-full border border-cyan-300/40 bg-cyan-300/10 px-4 py-2 transition hover:bg-cyan-300/20"
        href={SUPPORT_LINKS.sponsors}
        rel="noreferrer"
        target="_blank"
      >
        Sponsor
      </a>
      <a
        className="rounded-full border border-amber-300/40 bg-amber-300/10 px-4 py-2 transition hover:bg-amber-300/20"
        href={SUPPORT_LINKS.donate}
        rel="noreferrer"
        target="_blank"
      >
        Buy me a coffee
      </a>
    </div>
    <p className="mt-3 text-xs leading-5 text-slate-300">
      GitHub Sponsors and Buy Me a Coffee are both live, so the demo now links
      directly to them alongside the issue and integration paths.
    </p>
  </div>
);

const ArtImage = () => (
  <img
    alt="Colorful geometric poster"
    className="h-full w-full object-cover"
    src={`data:image/svg+xml;utf8,${encodeURIComponent(`
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1200">
        <defs>
          <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#fef3c7"/>
            <stop offset="50%" stop-color="#fca5a5"/>
            <stop offset="100%" stop-color="#bfdbfe"/>
          </linearGradient>
        </defs>
        <rect width="1200" height="1200" fill="url(#bg)"/>
        <circle cx="950" cy="250" r="220" fill="#1f2937" fill-opacity="0.15"/>
        <circle cx="250" cy="960" r="260" fill="#0f766e" fill-opacity="0.20"/>
        <rect x="120" y="120" width="380" height="220" rx="36" fill="#ffffff" fill-opacity="0.65"/>
        <rect x="620" y="620" width="420" height="260" rx="44" fill="#ffffff" fill-opacity="0.55"/>
        <path d="M180 760 C 320 560, 520 540, 720 700 S 1010 900, 1120 760" stroke="#7c3aed" stroke-width="42" fill="none" stroke-linecap="round"/>
        <path d="M120 450 L 420 620 L 270 900 Z" fill="#f97316" fill-opacity="0.65"/>
        <text x="150" y="240" font-family="Fredoka, sans-serif" font-size="94" font-weight="700" fill="#0f172a">PLAYFUL</text>
        <text x="650" y="760" font-family="Fredoka, sans-serif" font-size="112" font-weight="700" fill="#0f172a">PUZZLE</text>
      </svg>
    `)}`}
  />
);

const ImagePuzzleExample = () => {
  const [showNumbers, setShowNumbers] = useState(false);
  const puzzle = useSlidingPuzzle({
    gridSize: 4,
    scrambleMoves: 180,
    autoScramble: true,
  });

  return (
    <div className="flex h-full w-full items-center justify-center bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.9),_rgba(191,219,254,0.85),_rgba(15,23,42,0.18))] p-6">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[1.2fr_360px]">
        <div className="min-h-[70vh] rounded-[2rem] bg-white/50 p-4 shadow-2xl backdrop-blur-md">
          <SlidingPuzzleBoard
            aspectRatio={1}
            board={puzzle.board}
            borderRadius={28}
            content={<ArtImage />}
            gridSize={4}
            onTileClick={(index) => {
              puzzle.moveTile(index);
            }}
            showNumbers={showNumbers}
          />
        </div>

        <div className="rounded-[2rem] bg-slate-950/85 p-6 text-white shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-sky-300">
            Example Two
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight">Image Puzzle</h2>
          <p className="mt-4 text-sm leading-6 text-slate-300">
            The board consumes one plain React image element. This is the simpler
            package use case for posters, illustrations, product shots, or
            marketing art.
          </p>

          <div className="mt-6 grid gap-3">
            <button
              type="button"
              onClick={() => puzzle.scramble()}
              className="rounded-2xl bg-amber-400 px-4 py-3 font-bold text-slate-900 transition hover:bg-amber-300"
            >
              Scramble
            </button>
            <button
              type="button"
              onClick={() => puzzle.solve()}
              className="rounded-2xl bg-emerald-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-emerald-300"
            >
              Reveal Solution
            </button>
            <button
              type="button"
              onClick={() => setShowNumbers((value) => !value)}
              className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 font-bold transition hover:bg-white/10"
            >
              Numbers {showNumbers ? "Off" : "On"}
            </button>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-bold text-white">Solved</p>
              <p className="mt-2 text-2xl font-black">
                {puzzle.isSolved ? "Yes" : "No"}
              </p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="font-bold text-white">Tiles</p>
              <p className="mt-2 text-2xl font-black">{puzzle.tileCount - 1}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CustomPanelContent = () => (
  <div className="flex h-full w-full flex-col justify-between bg-[linear-gradient(160deg,_#082f49,_#0f172a_45%,_#1d4ed8)] p-10 text-white">
    <div>
      <p className="text-xs font-bold uppercase tracking-[0.35em] text-cyan-300">
        Package Demo
      </p>
      <h2 className="mt-4 max-w-md text-6xl font-black leading-none">
        Custom Controls
      </h2>
      <p className="mt-6 max-w-lg text-lg leading-7 text-slate-200">
        This example uses the hook directly and wraps the board with a custom
        HUD. It is the package-friendly version of building your own product UI
        around the puzzle state.
      </p>
    </div>

    <div className="grid max-w-xl grid-cols-3 gap-4">
      {[
        ["Moves", "Tracked externally"],
        ["Theme", "Fully custom"],
        ["Board", "Reusable primitive"],
      ].map(([label, value]) => (
        <div key={label} className="rounded-3xl bg-white/10 p-5 backdrop-blur-sm">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-200">
            {label}
          </p>
          <p className="mt-3 text-xl font-bold">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

const CustomControlsExample = () => {
  const [moves, setMoves] = useState(0);
  const puzzle = useSlidingPuzzle({
    gridSize: 3,
    scrambleMoves: 120,
    autoScramble: true,
    onMove: (result) => {
      if (result.moved) {
        setMoves((value) => value + 1);
      }
    },
    onScramble: () => {
      setMoves(0);
    },
    onSolve: () => {
      setMoves((value) => value);
    },
  });

  return (
    <div className="flex h-full w-full items-center justify-center bg-[linear-gradient(135deg,_#e0f2fe,_#dbeafe_45%,_#fae8ff)] p-6">
      <div className="grid w-full max-w-6xl gap-6 lg:grid-cols-[340px_1fr]">
        <div className="rounded-[2rem] bg-white/85 p-6 shadow-2xl backdrop-blur-md">
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-slate-500">
            Example Three
          </p>
          <h2 className="mt-3 text-4xl font-black tracking-tight text-slate-900">
            Custom HUD
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-600">
            The board component stays visual. Moves, progress, reset logic, and
            any surrounding UI can be composed with the hook around one puzzle
            surface element.
          </p>

          <div className="mt-8 grid gap-3">
            <button
              type="button"
              onClick={() => puzzle.scramble()}
              className="rounded-2xl bg-slate-900 px-4 py-3 font-bold text-white transition hover:bg-slate-700"
            >
              New Run
            </button>
            <button
              type="button"
              onClick={() => {
                puzzle.solve();
                setMoves(0);
              }}
              className="rounded-2xl bg-cyan-500 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-400"
            >
              Solve
            </button>
            <button
              type="button"
              onClick={() => {
                puzzle.reset();
                setMoves(0);
              }}
              className="rounded-2xl border border-slate-200 bg-white px-4 py-3 font-bold text-slate-700 transition hover:bg-slate-50"
            >
              Reset Initial
            </button>
          </div>

          <div className="mt-8 rounded-[1.5rem] bg-slate-100 p-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-slate-500">
              Progress
            </p>
            <p className="mt-3 text-4xl font-black text-slate-900">{moves}</p>
            <p className="mt-1 text-sm text-slate-600">moves recorded</p>
            <p className="mt-4 text-sm font-bold text-slate-700">
              {puzzle.isSolved ? "Solved state reached" : "Board still active"}
            </p>
          </div>
        </div>

        <div className="min-h-[72vh] rounded-[2rem] bg-slate-900/80 p-4 shadow-2xl">
          <SlidingPuzzleBoard
            aspectRatio={1}
            board={puzzle.board}
            borderRadius={28}
            content={<CustomPanelContent />}
            gap={4}
            gridSize={3}
            onTileClick={(index) => {
              puzzle.moveTile(index);
            }}
            renderTileOverlay={({ isSolved }) =>
              isSolved ? (
                <div className="absolute inset-x-0 top-0 z-10 h-2 bg-cyan-300/80" />
              ) : null
            }
            tileFrameStyle={{
              background: "rgba(255,255,255,0.96)",
            }}
          />
        </div>
      </div>
    </div>
  );
};

const UiPuzzleExample = () => {
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [gridSize, setGridSize] = useState(3);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showTileNumbers, setShowTileNumbers] = useState(true);

  const currentLevel = LEVELS[currentLevelIndex];
  const puzzle = useSlidingPuzzle({
    gridSize,
    scrambleMoves: 200,
    autoScramble: true,
    onSolve: () => {
      if (window.confetti) {
        window.confetti({
          particleCount: 200,
          spread: 100,
          origin: { y: 0.6 },
          colors: ["#fca5a5", "#86efac", "#fde047", "#93c5fd"],
        });
      }

      window.setTimeout(() => {
        setIsMenuOpen(true);
      }, 3000);
    },
  });

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen((value) => !value);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    puzzle.scramble();
  }, [currentLevelIndex, gridSize]);

  const handleLevelSelect = (levelId: number) => {
    const index = LEVELS.findIndex((level) => level.id === levelId);

    if (index !== -1) {
      if (index === currentLevelIndex) {
        puzzle.scramble();
      }

      setCurrentLevelIndex(index);
      setIsMenuOpen(false);
    }
  };

  return (
    <div className="relative h-full w-full overflow-hidden bg-slate-900 select-none">
      <MenuOverlay
        gridSize={gridSize}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onNextLevel={() => {
          setCurrentLevelIndex((value) => (value + 1) % LEVELS.length);
          setIsMenuOpen(false);
        }}
        onPrevLevel={() => {
          setCurrentLevelIndex((value) => (value - 1 + LEVELS.length) % LEVELS.length);
          setIsMenuOpen(false);
        }}
        onScramble={() => {
          puzzle.scramble();
          setIsMenuOpen(false);
        }}
        onSelectLevel={handleLevelSelect}
        onSetGridSize={(nextSize) => {
          setGridSize(nextSize);
        }}
        onSolve={() => {
          puzzle.solve();
          setIsMenuOpen(false);
        }}
        onToggleNumbers={() => setShowTileNumbers((value) => !value)}
        showTileNumbers={showTileNumbers}
      />

      <div className="h-full w-full">
        <SlidingPuzzleBoard
          board={puzzle.board}
          className="h-full w-full"
          content={currentLevel.content}
          contentClassName={currentLevel.theme}
          getTileAriaLabel={({ tileId, boardIndex }) =>
            `Move tile ${tileId + 1} from board position ${boardIndex + 1}`
          }
          gridSize={gridSize}
          onTileClick={(index) => {
            puzzle.moveTile(index);
          }}
          showNumbers={showTileNumbers}
          tileFrameStyle={{
            background: "transparent",
          }}
        />
      </div>
    </div>
  );
};

export default function App() {
  const [mode, setMode] = useState<DemoMode>("ui");

  return (
    <div className="relative h-screen w-screen overflow-hidden bg-slate-950">
      <ExampleSwitcher activeMode={mode} onSelect={setMode} />
      <SupportDock />

      {mode === "ui" ? null : (
        <div className="absolute top-4 right-4 z-40 rounded-2xl bg-slate-950/75 px-4 py-3 text-xs font-bold uppercase tracking-[0.25em] text-slate-200 shadow-xl backdrop-blur-md">
          Built with package primitives
        </div>
      )}

      {mode === "ui" ? <UiPuzzleExample /> : null}
      {mode === "image" ? <ImagePuzzleExample /> : null}
      {mode === "custom" ? <CustomControlsExample /> : null}
    </div>
  );
}
