import React from "react";
import { LevelData } from "./types";

export const PROMPT_COUNT = 9;

// Helper for common page layout wrapper
const PageLayout = ({ children }: { children?: React.ReactNode }) => (
  <div className="w-full h-full flex flex-col items-center justify-between text-center relative overflow-hidden">
    {children}
  </div>
);

// Level 1: Landing Page
const Level1 = (
  <PageLayout>
    {/* Geometry Guides for Level 1 - Increased Visibility */}
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large diagonal stripe top-left to bottom-right */}
        <div className="absolute -top-[20%] -left-[20%] w-[140%] h-[20%] bg-orange-400/50 rotate-45 transform origin-bottom-left"></div>
        {/* Large Circle bottom-right */}
        <div className="absolute -bottom-[10%] -right-[10%] w-[60vmin] h-[60vmin] border-[4vmin] border-yellow-500/50 rounded-full"></div>
        {/* Small square top-right */}
        <div className="absolute top-[10%] right-[5%] w-[10vmin] h-[10vmin] bg-amber-400/50 rotate-12 rounded-lg"></div>
    </div>

    {/* Top Section - Tiles 0, 1, 2 (Row 1) */}
    <div className="w-full h-1/3 flex flex-col justify-center items-center z-10">
      <h1 className="text-[14vmin] leading-[0.9] font-black text-slate-800 tracking-tighter drop-shadow-sm w-full pt-32">
        SLIDING<br/>
        <span className="text-white drop-shadow-md text-[16vmin]">TILES</span><br/>
        PUZZLE
      </h1>
    </div>
    
    {/* Middle Section - Tiles 3, 4, 5 (Row 2) */}
    <div className="w-full h-1/3 flex flex-row justify-between items-center px-2 z-10 pl-32 pt-16">
      <div className="flex flex-col items-start w-1/3 pl-4">
        <i className="fa-solid fa-hand-pointer text-[8vmin] text-slate-800/80 mb-2 animate-bounce-slow"></i>
        <span className="text-[3vmin] font-bold text-slate-700 uppercase tracking-wide leading-none text-left">Click<br/>to Move</span>
      </div>
      
      {/* Center decoration (Tile 4) */}
      <div className="w-1/3 flex justify-center opacity-60">
         <i className="fa-solid fa-arrows-up-down-left-right text-[8vmin] text-slate-500"></i>
      </div>

      <div className="flex flex-col items-end w-1/3 pr-32 pt-16">
         <i className="fa-solid fa-arrow-down-1-9 text-[8vmin] text-slate-800/80 mb-2"></i>
        <span className="text-[3vmin] font-bold text-slate-700 uppercase tracking-wide leading-none text-right">Order<br/>to Win</span>
      </div>
    </div>

    {/* Bottom Section - Tiles 6, 7, 8 (Row 3) */}
    <div className="w-full h-1/3 flex flex-col justify-center items-center z-10 pb-8">
      <div className="bg-white/40 backdrop-blur-sm px-10 py-5 rounded-full border-2 border-white/50 shadow-sm mt-4">
        <span className="text-[3vmin] font-bold text-slate-800">
          Press <span className="bg-slate-800 text-white px-3 py-1 rounded mx-1">ESC</span> for Menu
        </span>
      </div>
    </div>
  </PageLayout>
);

// Level 2: History
const Level2 = (
  <PageLayout>
     {/* Geometry Guides for Level 2 - Increased Visibility */}
     <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Large Diamond in Center */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70vmin] h-[70vmin] border-[4vmin] border-sky-400/40 rotate-45 rounded-[3rem]"></div>
        {/* Curved Path Bottom */}
        <svg className="absolute bottom-0 left-0 w-full h-[30%] text-blue-500/30" viewBox="0 0 100 100" preserveAspectRatio="none">
            <path d="M0 100 C 30 0 70 0 100 100" fill="currentColor" />
        </svg>
        {/* Floating Icons Background */}
        <i className="fa-solid fa-puzzle-piece text-[30vmin] absolute -top-4 -left-4 rotate-12 text-sky-800/10"></i>
        <i className="fa-solid fa-puzzle-piece text-[30vmin] absolute top-20 -right-10 -rotate-12 text-sky-800/10"></i>
     </div>

     {/* Top - Tile 0, 1, 2 */}
     <div className="z-10 h-1/3 flex flex-col justify-center items-center w-full pt-6">
       <div className="flex items-center justify-center gap-4 w-full">
         <i className="fa-solid fa-clock-rotate-left text-[7vmin] text-sky-600"></i>
         <h2 className="text-[7vmin] font-black text-slate-800 uppercase tracking-tight">History</h2>
       </div>
     </div>
       
     {/* Middle - Tiles 3, 4, 5 */}
     <div className="z-10 h-1/3 w-full flex items-center justify-between px-2">
        <div className="w-1/2 text-left bg-white/40 p-4 rounded-r-2xl backdrop-blur-sm border-l-4 border-sky-400">
             <p className="text-[3vmin] font-bold text-slate-700 leading-tight mb-2">
               The "15-Puzzle" craze started in
             </p>
             <div className="text-[12vmin] leading-none font-black text-sky-600 drop-shadow-sm">
               1880
             </div>
        </div>
        
        <div className="w-[5%]"></div> 

        <div className="w-[45%] text-right pr-2">
             <p className="text-[2.8vmin] font-medium text-slate-700 leading-snug">
               Invented by<br/>
               <strong className="text-[3.5vmin] text-slate-900">Noyes Chapman</strong>,<br/>
               it is a classic algorithm problem.
             </p>
        </div>
     </div>

     {/* Bottom - Tiles 6, 7 */}
     <div className="h-1/3 w-full flex justify-center items-center pb-8 z-10">
         <span className="text-[4.5vmin] font-black text-slate-800 bg-sky-200/60 px-8 py-3 rounded-2xl border-2 border-sky-300/50">
           SOLVE TO CONTINUE
         </span>
     </div>
  </PageLayout>
);

// Level 3: Credits
const Level3 = (
  <PageLayout>
    {/* Geometry Guides for Level 3 - Increased Visibility */}
    <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Skewed Column Right */}
        <div className="absolute top-0 right-[20%] w-[15%] h-full bg-rose-400/40 -skew-x-12"></div>
        {/* Horizontal Bars Left */}
        <div className="absolute top-[30%] left-0 w-[40%] h-[5vmin] bg-pink-500/20 rounded-r-full"></div>
        <div className="absolute top-[40%] left-0 w-[20%] h-[5vmin] bg-pink-500/20 rounded-r-full"></div>
        {/* Triangle Bottom Left */}
        <div className="absolute bottom-[10%] left-[10%] w-0 h-0 border-l-[10vmin] border-r-[10vmin] border-b-[20vmin] border-l-transparent border-r-transparent border-b-red-400/40 rotate-12"></div>
    </div>

    {/* Top - Tiles 0, 1, 2 */}
    <div className="flex flex-col justify-center items-center w-full h-1/3 pt-4 z-10">
      <h2 className="text-[9vmin] font-black text-pink-600 mb-2 tracking-tighter">CREDITS</h2>
      <div className="w-full max-w-[80%] h-2 bg-pink-300 rounded-full"></div>
    </div>
      
    {/* Middle - Tiles 3, 4, 5 */}
    <div className="w-full h-1/3 grid grid-cols-2 gap-x-4 gap-y-6 items-center px-4 z-10">
        <div className="text-right">
          <p className="text-[2.5vmin] text-pink-800/60 font-bold uppercase tracking-widest">Created By</p>
        </div>
        <div className="text-left">
          <p className="text-[4vmin] text-slate-800 font-bold leading-none">Marcelo<br/>Anaissi</p>
        </div>

        <div className="text-right">
           <p className="text-[2.5vmin] text-pink-800/60 font-bold uppercase tracking-widest">Built With</p>
        </div>
        <div className="flex items-center gap-3 text-left">
          <i className="fa-brands fa-google text-blue-500 text-[3vmin]"></i>
          <p className="text-[3.5vmin] text-slate-800 font-bold">Google AI Studio</p>
        </div>
        
         <div className="text-right">
           <p className="text-[2.5vmin] text-pink-800/60 font-bold uppercase tracking-widest">Prompts Used</p>
        </div>
        <div className="text-left">
           <div className="inline-block bg-white px-5 py-2 rounded-xl border-2 border-pink-200 shadow-sm transform -rotate-2">
            <p className="text-[4vmin] text-slate-800 font-black font-mono">{PROMPT_COUNT}</p>
           </div>
        </div>
    </div>

    {/* Bottom - Tiles 6, 7 */}
    <div className="w-full h-1/3 flex justify-center items-center pb-10 z-10">
      <p className="text-[5vmin] font-black text-slate-800 flex items-center gap-3 bg-white/20 px-6 py-2 rounded-full">
        Thanks for Playing! <i className="fa-solid fa-heart text-red-500 animate-pulse"></i>
      </p>
    </div>
  </PageLayout>
);


export const LEVELS: LevelData[] = [
  { 
    id: 1, 
    name: "Home", 
    content: Level1,
    theme: "bg-gradient-to-br from-yellow-100 via-orange-100 to-amber-100" 
  },
  { 
    id: 2, 
    name: "History", 
    content: Level2,
    theme: "bg-gradient-to-br from-sky-100 via-blue-100 to-indigo-100" 
  },
  { 
    id: 3, 
    name: "Credits", 
    content: Level3,
    theme: "bg-gradient-to-br from-pink-100 via-rose-100 to-red-50" 
  },
];