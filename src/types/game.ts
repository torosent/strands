export interface Cell {
  row: number;
  col: number;
  letter: string;
  isFound: boolean;
}

export interface BoardWord {
  id: number;
  word: string;
  isFound: boolean;
  isSpangram: boolean;
  cells: Cell[];  // in reading order
}

export interface StrandsBoard {
  cells: Cell[][];  // 8 rows x 6 columns
  words: BoardWord[];  // theme words and the spangram
}

export interface StrandsGame {
  id: number;
  theme: string;
  spangram: string;
  board: StrandsBoard;
}

export interface GameState {
  selectedCells: Cell[];
  nonThemeWords: string[];  // every 3 earn a hint
  hintsUsed: number;
  hintWordId?: number;  // theme word whose letters a hint is showing
  hintShowsOrder: boolean;  // second hint on the same word: show its letter order
  message?: string;  // feedback for the last try, e.g. "Too short"
  isComplete: boolean;
  startTime: Date;
  endTime?: Date;
  answersRevealed: boolean;
}

export type ThemeMode = 'light' | 'dark';
