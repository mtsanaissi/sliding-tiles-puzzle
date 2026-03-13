import { ReactNode } from "react";
import type { Board } from "../../packages/core/src";

export interface LevelData {
  id: number;
  name: string;
  content: ReactNode; // The single full-page content component
  theme: string; // Background class for the whole page
}

// Declaration for canvas-confetti CDN
declare global {
  interface Window {
    confetti: any;
  }
}

export type GridState = Board;
