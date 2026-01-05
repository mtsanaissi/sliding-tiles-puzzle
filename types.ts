import { ReactNode } from "react";

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

export type GridState = number[]; // Array of 9 numbers representing tile IDs at positions 0-8
