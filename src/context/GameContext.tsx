'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { GameState, StrandsGame, Cell, BoardWord } from '@/types/game';
import { getPuzzle, getRandomPuzzle } from '@/data/puzzles';

type GameContextType = {
  puzzle: StrandsGame;
  gameState: GameState;
  startSelection: (cell: Cell) => void;
  moveSelection: (cell: Cell) => void;
  endSelection: () => void;
  tapCell: (cell: Cell) => void;
  clearSelection: () => void;
  resetGame: () => void;
  showHint: () => void;
  loadPuzzle: (puzzleId?: number) => void;
  isCellSelectable: (cell: Cell) => boolean;
  isAdjacent: (cell1: Cell, cell2: Cell) => boolean;
};

const initialGameState: GameState = {
  selectedCells: [],
  foundWords: [],
  currentWord: '',
  isComplete: false,
  showHint: false,
  usedHint: false,
  startTime: new Date(),
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [puzzle, setPuzzle] = useState<StrandsGame>(getPuzzle());
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isDragging, setIsDragging] = useState(false);

  // Initialize the game
  useEffect(() => {
    loadPuzzle();
  }, []);

  // Check if a cell is adjacent to the last selected cell
  const isAdjacent = (cell1: Cell, cell2: Cell): boolean => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    return (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
  };

  // Check if a cell can be selected
  const isCellSelectable = (cell: Cell): boolean => {
    // Can't select a cell that's already part of a found word
    if (cell.isFound) return false;
    
    // First cell in a selection is always selectable
    if (gameState.selectedCells.length === 0) return true;
    
    // Can't select a cell that's already selected
    if (gameState.selectedCells.some(c => c.row === cell.row && c.col === cell.col)) {
      return false;
    }
    
    // Must be adjacent to the last selected cell
    const lastCell = gameState.selectedCells[gameState.selectedCells.length - 1];
    return isAdjacent(cell, lastCell);
  };

  // Start selection (drag or tap)
  const startSelection = (cell: Cell) => {
    if (cell.isFound) return;
    
    setIsDragging(true);
    const updatedCells = [...puzzle.board.cells];
    updatedCells[cell.row][cell.col] = { ...cell, isSelected: true };
    
    setGameState(prev => ({
      ...prev,
      selectedCells: [cell],
      currentWord: cell.letter
    }));
    
    // Update the puzzle board's cell selection state
    setPuzzle(prev => ({
      ...prev,
      board: {
        ...prev.board,
        cells: updatedCells
      }
    }));
  };

  // Continue selection during drag
  const moveSelection = (cell: Cell) => {
    if (!isDragging || cell.isFound) return;
    if (!isCellSelectable(cell)) return;
    
    const updatedCells = [...puzzle.board.cells];
    updatedCells[cell.row][cell.col] = { ...cell, isSelected: true };
    
    setGameState(prev => ({
      ...prev,
      selectedCells: [...prev.selectedCells, cell],
      currentWord: prev.currentWord + cell.letter
    }));
    
    // Update the puzzle board's cell selection state
    setPuzzle(prev => ({
      ...prev,
      board: {
        ...prev.board,
        cells: updatedCells
      }
    }));
  };

  // Handle tapping on cells
  const tapCell = (cell: Cell) => {
    if (cell.isFound) return;
    
    const now = Date.now();
    const doubleTapThreshold = 300; // ms
    
    // If it's a double tap on the last cell, end selection
    if (
      gameState.lastTapTime && 
      gameState.lastTappedCell &&
      now - gameState.lastTapTime < doubleTapThreshold &&
      cell.row === gameState.lastTappedCell.row &&
      cell.col === gameState.lastTappedCell.col
    ) {
      endSelection();
      return;
    }
    
    // First tap or continuing selection
    if (gameState.selectedCells.length === 0) {
      startSelection(cell);
    } else if (isCellSelectable(cell)) {
      moveSelection(cell);
    }
    
    setGameState(prev => ({
      ...prev,
      lastTapTime: now,
      lastTappedCell: cell
    }));
  };

  // End the selection and validate the word
  const endSelection = () => {
    setIsDragging(false);
    
    // Find if the current selection forms a valid word
    const selectedWord = gameState.currentWord;
    const foundWord = puzzle.board.words.find(word => 
      word.word === selectedWord && !word.isFound
    );
    
    if (foundWord) {
      // Mark all cells in the word as found
      const updatedCells = puzzle.board.cells.map((row, rowIndex) => 
        row.map((cell, colIndex) => {
          // Check if this cell is part of the found word
          const isPartOfFoundWord = foundWord.cells.some(
            wordCell => wordCell.row === rowIndex && wordCell.col === colIndex
          );
          
          // If cell is part of found word, mark as found and remove selection
          if (isPartOfFoundWord) {
            return { 
              ...cell, 
              isFound: true,
              isSelected: false 
            };
          }
          
          // Otherwise reset selection but keep other properties
          return { 
            ...cell, 
            isSelected: false 
          };
        })
      );
      
      // Mark word as found
      const updatedWords = puzzle.board.words.map(word => 
        word.id === foundWord.id ? { ...word, isFound: true } : word
      );
      
      // First update the puzzle to immediately show the blue found word
      setPuzzle(prev => ({
        ...prev,
        board: {
          ...prev.board,
          words: updatedWords,
          cells: updatedCells
        }
      }));
      
      // Then update the game state
      setGameState(prev => {
        const updatedFoundWords = [...prev.foundWords, foundWord];
        const allWordsFound = updatedFoundWords.length === puzzle.board.words.length;
        
        return {
          ...prev,
          foundWords: updatedFoundWords,
          selectedCells: [], // Clear selected cells
          currentWord: '',   // Clear current word
          isComplete: allWordsFound,
          endTime: allWordsFound ? new Date() : undefined
        };
      });
    } else {
      // Clear selection if not a valid word
      clearSelection();
    }
  };

  // Clear current selection
  const clearSelection = () => {
    // Reset all cells' isSelected state
    const updatedCells = puzzle.board.cells.map(row => 
      row.map(cell => ({ ...cell, isSelected: false }))
    );
    
    setPuzzle(prev => ({
      ...prev,
      board: {
        ...prev.board,
        cells: updatedCells
      }
    }));
    
    setGameState(prev => ({
      ...prev,
      selectedCells: [],
      currentWord: ''
    }));
  };

  // Show a hint (reveals the theme)
  const showHint = () => {
    setGameState(prev => ({
      ...prev,
      showHint: true,
      usedHint: true
    }));
  };

  // Load a specific puzzle or today's puzzle
  const loadPuzzle = (puzzleId?: number) => {
    const newPuzzle = puzzleId ? getPuzzle(puzzleId) : getRandomPuzzle();
    setPuzzle(newPuzzle);
    
    // Reset game state
    setGameState({
      ...initialGameState,
      startTime: new Date()
    });
  };

  // Reset the game with the same puzzle
  const resetGame = () => {
    // Reset all cells' isSelected and isFound states
    const updatedCells = puzzle.board.cells.map(row => 
      row.map(cell => ({ ...cell, isSelected: false, isFound: false }))
    );
    
    // Reset all words' isFound states
    const updatedWords = puzzle.board.words.map(word => ({ ...word, isFound: false }));
    
    setPuzzle(prev => ({
      ...prev,
      board: {
        ...prev.board,
        cells: updatedCells,
        words: updatedWords
      }
    }));
    
    setGameState({
      ...initialGameState,
      startTime: new Date()
    });
  };

  return (
    <GameContext.Provider value={{
      puzzle,
      gameState,
      startSelection,
      moveSelection,
      endSelection,
      tapCell,
      clearSelection,
      resetGame,
      showHint,
      loadPuzzle,
      isCellSelectable,
      isAdjacent
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