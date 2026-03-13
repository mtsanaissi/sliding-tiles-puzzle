# AI Agent Development Guidelines - Sliding Tile UI Puzzle

## Project Overview
**Sliding Tile UI Puzzle** is an interactive, web-based puzzle game where users rearrange tiles to reconstruct a complete user interface or image. The project features multiple difficulty levels (grid sizes), themed content, and smooth animations. It is designed to be highly interactive and visually engaging.

## Tech Stack
- **Framework:** [React 19](https://react.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Package Manager:** [pnpm](https://pnpm.io/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) (CDN version)
- **Animations/Effects:** [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)
- **Icons:** [Font Awesome](https://fontawesome.com/)
- **Fonts:** [Google Fonts (Fredoka)](https://fonts.google.com/specimen/Fredoka)

## Main Development Guidelines for AI Agents

### 1. Architectural Patterns
- **Component Modularity:** Keep components small and specialized. Visual tiles are separated from the main game logic and overlay menus.
- **State Management:** The application relies on React's `useState` and `useCallback` for game state (grid positions, current level, move logic). Centralize shared types in `types.ts`.
- **Pure Logic vs. UI:** Keep game logic (e.g., scramble algorithms, adjacency checks) decoupled from styling where possible.

### 2. Styling & UI
- **Utility-First CSS:** Use Tailwind CSS classes for all styling. Avoid custom CSS files unless specific animations or overrides are required (as seen in `index.html`).
- **Responsive Design:** Ensure the puzzle remains playable and visually appealing across different screen sizes. Use relative units (%, vh, vw) for grid layouts.
- **Interactive Feedback:** Maintain high-quality visual feedback for user actions (hover states, tile transitions, win effects).

### 3. Performance & Optimization
- **Memoization:** Use `useCallback` for expensive functions or those passed as dependencies to `useEffect`.
- **Re-renders:** Be cautious with state updates in the grid to avoid unnecessary re-renders of all tiles when only two move.
- **Transitions:** Use CSS transitions (`tile-transition` class) for smooth tile movement rather than manual frame updates.

### 4. Development Standards
- **Strict Typing:** Always define interfaces for props and state. Utilize the existing `types.ts` and `constants.tsx` files to maintain consistency.
- **Verification:** After modifying game logic (e.g., movement or scrambling), verify that the puzzle remains solvable.
- **Documentation:** Comment on complex logic, especially coordinate calculations in `Tile.tsx`.

## Project Structure
- `/components`: UI components like `Tile` and `MenuOverlay`.
- `App.tsx`: Main game loop and state management.
- `constants.tsx`: Level definitions and game settings.
- `types.ts`: TypeScript interfaces and types.
- `index.html`: Entry point with global styles and CDN dependencies.
