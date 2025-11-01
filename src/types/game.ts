export interface Word {
  id: number;
  word: string;
}

export interface Cell {
  row: number;
  col: number;
  letter: string;
  isSelected: boolean;
  isFound: boolean;
  belongsToWords: number[];  // IDs of words this cell belongs to (now only 0 or 1 word since overlapping is not allowed)
}

export interface BoardWord {
  id: number;
  word: string;
  isFound: boolean;
  cells: Cell[];
  colorIndex?: number;  // Index for color assignment when revealed
}

export interface StrandsBoard {
  cells: Cell[][];  // 6x8 grid
  words: BoardWord[];
  width: number;
  height: number;
}

export interface StrandsGame {
  id: number;
  date: string;
  theme: string;
  board: StrandsBoard;
  bonusWord: string;
}

export interface GameState {
  selectedCells: Cell[];
  foundWords: BoardWord[];
  selectedWords: BoardWord[];  // Add this line to track selected words
  currentWord: string;
  isComplete: boolean;
  showHint: boolean;
  usedHint: boolean;
  startTime?: Date;
  endTime?: Date;
  lastTapTime?: number;
  lastTappedCell?: Cell;
  answersRevealed?: boolean;  // Track if answers have been revealed
  hintedCells: { row: number; col: number }[];  // Track cells revealed by hints
}

export type ThemeMode = 'light' | 'dark';