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
  belongsToWords: number[];  // IDs of words this cell belongs to
}

export interface BoardWord {
  id: number;
  word: string;
  isFound: boolean;
  cells: Cell[];
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
  currentWord: string;
  isComplete: boolean;
  showHint: boolean;
  usedHint: boolean;
  startTime?: Date;
  endTime?: Date;
  lastTapTime?: number;
  lastTappedCell?: Cell;
}

export type ThemeMode = 'light' | 'dark';