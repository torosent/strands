'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { GameState, StrandsGame, Cell, BoardWord } from '@/types/game';
import { getPuzzle, getRandomPuzzle } from '@/data/puzzles';
import { loadDictionary } from '@/data/dictionary';
import { matchThemeWord, sameCell } from '@/data/board';

// NYT Strands rules
const MIN_WORD_LENGTH = 4;

type GameContextType = {
  puzzle: StrandsGame;
  gameState: GameState;
  currentWord: string;
  foundCount: number;
  canHint: boolean;  // a hint would show something new
  pressCell: (cell: Cell) => void;
  moveSelection: (cell: Cell) => void;
  submit: () => void;
  clearSelection: () => void;
  resetGame: () => void;
  giveHint: () => void;
  loadPuzzle: () => void;
  revealAnswers: () => void;
};

const newGameState = (): GameState => ({
  selectedCells: [],
  nonThemeWords: [],
  hintsUsed: 0,
  hintShowsOrder: false,
  isComplete: false,
  startTime: new Date(),
  answersRevealed: false,
});

// The next letter must touch the last one (diagonals count) and not be used yet.
const canExtend = (selected: Cell[], cell: Cell) => {
  const last = selected[selected.length - 1];
  return (
    !!last &&
    !cell.isFound &&
    Math.abs(last.row - cell.row) <= 1 &&
    Math.abs(last.col - cell.col) <= 1 &&
    !selected.some(c => sameCell(c, cell))
  );
};

const GameContext = createContext<GameContextType | undefined>(undefined);

// Puzzles from getPuzzle are never mutated: every change below builds new objects,
// so reloading a puzzle always gives a clean board.
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [puzzle, setPuzzle] = useState<StrandsGame>(getRandomPuzzle);
  const [gameState, setGameState] = useState<GameState>(newGameState);
  const currentWord = gameState.selectedCells.map(c => c.letter).join('');
  const foundCount = puzzle.board.words.filter(w => w.isFound).length;
  const activeHint = puzzle.board.words.find(w => w.id === gameState.hintWordId && !w.isFound);
  const nextHintWord = puzzle.board.words.find(w => !w.isFound && !w.isSpangram);
  const canHint = activeHint ? !gameState.hintShowsOrder : !!nextHintWord;

  // Load the word list once the page is idle, so the first non-theme word is checked
  // without delay but the big parse doesn't compete with the first touches.
  useEffect(() => {
    const load = () => { loadDictionary().catch(() => {}); };  // a failed load retries on submit
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(load);
      return () => cancelIdleCallback(id);
    }
    const id = setTimeout(load, 1000);
    return () => clearTimeout(id);
  }, []);

  // Tap or press on a letter: extends the selection when it touches the last letter,
  // goes back to it when already selected, and submits when it is the last letter again.
  const pressCell = (cell: Cell) => {
    if (cell.isFound) return;
    const selected = gameState.selectedCells;
    const at = selected.findIndex(c => sameCell(c, cell));
    if (at >= 0 && at === selected.length - 1) return submit();
    setGameState(prev => ({
      ...prev,
      message: undefined,
      selectedCells: at >= 0 ? selected.slice(0, at + 1) : canExtend(selected, cell) ? [...selected, cell] : [cell],
    }));
  };

  // Dragging: extend to a touching letter, or step back onto the previous one
  const moveSelection = (cell: Cell) => {
    setGameState(prev => {
      const selected = prev.selectedCells;
      if (selected.length >= 2 && sameCell(selected[selected.length - 2], cell)) {
        return { ...prev, selectedCells: selected.slice(0, -1) };
      }
      return canExtend(selected, cell) ? { ...prev, selectedCells: [...selected, cell] } : prev;
    });
  };

  const clearSelection = () => {
    setGameState(prev => ({ ...prev, selectedCells: [] }));
  };

  const endTry = (message: string) => {
    setGameState(prev => ({ ...prev, selectedCells: [], message }));
  };

  // `paths` holds new cells for every word whose place moved (see matchThemeWord)
  const markFound = (word: BoardWord, paths: Map<number, Cell[]>) => {
    const wordCells = paths.get(word.id)!;
    setPuzzle(prev => ({
      ...prev,
      board: {
        cells: prev.board.cells.map(row =>
          row.map(cell => (wordCells.some(c => sameCell(c, cell)) ? { ...cell, isFound: true } : cell))
        ),
        words: prev.board.words.map(w => ({
          ...w,
          cells: paths.get(w.id) ?? w.cells,
          isFound: w.isFound || w.id === word.id,
        })),
      },
    }));
    const isComplete = puzzle.board.words.every(w => w.isFound || w.id === word.id);
    setGameState(prev => {
      const hintDone = prev.hintWordId === word.id;
      return {
        ...prev,
        selectedCells: [],
        message: word.isSpangram ? 'SPANGRAM!' : undefined,
        hintWordId: hintDone ? undefined : prev.hintWordId,
        hintShowsOrder: hintDone ? false : prev.hintShowsOrder,
        isComplete,
        endTime: isComplete ? new Date() : undefined,
      };
    });
  };

  // Check the selected letters
  const submit = () => {
    const selected = gameState.selectedCells;
    if (selected.length === 0) return;
    const word = currentWord;

    const themeWord = matchThemeWord(puzzle.board, selected);
    if (themeWord) return markFound(themeWord.word, themeWord.paths);
    if (word.length < MIN_WORD_LENGTH) return endTry('Too short');
    if (gameState.nonThemeWords.includes(word) || puzzle.board.words.some(w => w.isFound && w.word === word)) {
      return endTry('Already found');
    }

    // The list may still be loading. If the player moved on meanwhile (new letters,
    // reset, new puzzle), the selection array changed and the late answer is dropped.
    const answer = (update: (prev: GameState) => GameState) =>
      setGameState(prev => (prev.selectedCells === selected ? update(prev) : prev));
    loadDictionary().then(
      dictionary => answer(prev => {
        if (!dictionary.has(word)) return { ...prev, selectedCells: [], message: 'Not in word list' };
        if (prev.nonThemeWords.includes(word)) return { ...prev, selectedCells: [], message: 'Already found' };
        return { ...prev, selectedCells: [], message: `${word}: not a theme word`, nonThemeWords: [...prev.nonThemeWords, word] };
      }),
      () => answer(prev => ({ ...prev, selectedCells: [], message: 'Word list unavailable, try again' }))
    );
  };

  // A hint outlines the letters of a theme word (never the spangram).
  // A second hint while that word is still showing reveals its letter order.
  // Nothing new to show: say why, so the button does not seem broken
  const giveHint = () => {
    if (!canHint) return endTry(activeHint ? 'The hint already shows that word' : 'Only the spangram is left');
    if (activeHint) {
      setGameState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1, hintShowsOrder: true }));
    } else if (nextHintWord) {
      setGameState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1, hintWordId: nextHintWord.id, hintShowsOrder: false }));
    }
  };

  const loadPuzzle = () => {
    setPuzzle(getRandomPuzzle());
    setGameState(newGameState());
  };

  // Same puzzle, back to its untouched original
  const resetGame = () => {
    setPuzzle(getPuzzle(puzzle.id));
    setGameState(newGameState());
  };

  // Give up: show every word. Not part of the NYT game.
  const revealAnswers = () => {
    setPuzzle(prev => ({
      ...prev,
      board: {
        words: prev.board.words.map(w => ({ ...w, isFound: true })),
        cells: prev.board.cells.map(row => row.map(cell => ({ ...cell, isFound: true }))),
      },
    }));
    setGameState(prev => ({
      ...prev,
      selectedCells: [],
      hintWordId: undefined,
      message: undefined,
      answersRevealed: true,
    }));
  };

  return (
    <GameContext.Provider value={{
      puzzle,
      gameState,
      currentWord,
      foundCount,
      canHint,
      pressCell,
      moveSelection,
      submit,
      clearSelection,
      resetGame,
      giveHint,
      loadPuzzle,
      revealAnswers,
    }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
