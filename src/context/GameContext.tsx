'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import { GameState, StrandsGame, Cell, BoardWord, Word } from '@/types/game';
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
  removeWord: (word: BoardWord) => void;
  shuffledWords: Word[];  // Add shuffledWords property
  selectWord: (word: Word) => void;  // Add selectWord function
  revealAnswers: () => void;  // Add revealAnswers function
};

const initialGameState: GameState = {
  selectedCells: [],
  foundWords: [],
  selectedWords: [],
  currentWord: '',
  isComplete: false,
  showHint: false,
  usedHint: false,
  startTime: new Date(),
  answersRevealed: false,  // initialize answersRevealed
};

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const [puzzle, setPuzzle] = useState<StrandsGame>(getPuzzle());
  const [gameState, setGameState] = useState<GameState>(initialGameState);
  const [isDragging, setIsDragging] = useState(false);
  const [shuffledWords, setShuffledWords] = useState<Word[]>([]);

  // Initialize the game
  useEffect(() => {
    loadPuzzle();
  }, []);

  // Create shuffled words whenever puzzle changes
  useEffect(() => {
    if (puzzle && puzzle.board && puzzle.board.words) {
      // Create simplified Word objects from BoardWords
      const words = puzzle.board.words.map(boardWord => ({
        id: boardWord.id,
        word: boardWord.word
      }));
      
      // Shuffle the array
      const shuffled = [...words].sort(() => Math.random() - 0.5);
      setShuffledWords(shuffled);
    }
  }, [puzzle]);

  // Check if a cell is adjacent to the last selected cell with better diagonal support
  const isAdjacent = (cell1: Cell, cell2: Cell): boolean => {
    const rowDiff = Math.abs(cell1.row - cell2.row);
    const colDiff = Math.abs(cell1.col - cell2.col);
    
    // Basic adjacency check (same as before)
    const isBasicAdjacent = (rowDiff <= 1 && colDiff <= 1) && !(rowDiff === 0 && colDiff === 0);
    
    // If cells are already adjacent in the basic sense, return true
    if (isBasicAdjacent) return true;
    
    // Enhanced diagonal detection - check if the cells form a straight line with one cell in between
    // This helps when moving the finger quickly in diagonal directions
    if (gameState.selectedCells.length >= 2) {
      const previousCell = gameState.selectedCells[gameState.selectedCells.length - 2];
      
      // Check if we're continuing in the same direction (diagonal pattern)
      const prevRowDiff = cell2.row - previousCell.row;
      const prevColDiff = cell2.col - previousCell.col;
      const curRowDiff = cell1.row - cell2.row;
      const curColDiff = cell1.col - cell2.col;
      
      // If we're moving in the same diagonal direction, allow selection even if cells aren't immediately adjacent
      if (
        Math.sign(prevRowDiff) === Math.sign(curRowDiff) &&
        Math.sign(prevColDiff) === Math.sign(curColDiff) &&
        rowDiff <= 2 && colDiff <= 2 // Still limit the jump distance
      ) {
        return true;
      }
    }
    
    return false;
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

  // Remove a word from the list of selected words
  const removeWord = (word: BoardWord) => {
    // Find the word in the selected words
    const wordIndex = gameState.selectedWords.findIndex(w => w.id === word.id);
    
    // If the word exists, remove it
    if (wordIndex !== -1) {
      const updatedSelectedWords = [...gameState.selectedWords];
      updatedSelectedWords.splice(wordIndex, 1);
      
      setGameState(prev => ({
        ...prev,
        selectedWords: updatedSelectedWords
      }));
    }
  };

  // Select a word from the grid
  const selectWord = (word: Word) => {
    // Check if the word is already selected
    const isAlreadySelected = gameState.selectedWords.some(w => w.id === word.id);
    
    // If already selected, do nothing
    if (isAlreadySelected) {
      return;
    }

    // Find the corresponding BoardWord in the puzzle
    const boardWord = puzzle.board.words.find(w => w.id === word.id);
    
    if (boardWord) {
      // Add the word to selectedWords
      setGameState(prev => ({
        ...prev,
        selectedWords: [...prev.selectedWords, boardWord]
      }));
    }
  };

  // Reveal all answers by marking every word and its cells as found
  const revealAnswers = () => {
    // Mark all words as found and assign a unique colorIndex to each
    const updatedWords = puzzle.board.words.map((word, index) => ({ 
      ...word, 
      isFound: true,
      colorIndex: index  // Assign unique color index for each word
    }));
    // Mark corresponding cells as found
    const updatedCells = puzzle.board.cells.map(row => 
      row.map(cell => {
        const isPartOfAnyWord = puzzle.board.words.some(w => 
          w.cells.some(c => c.row === cell.row && c.col === cell.col)
        );
        return isPartOfAnyWord 
          ? { ...cell, isFound: true, isSelected: false } 
          : cell;
      })
    );

    setPuzzle(prev => ({
      ...prev,
      board: {
        ...prev.board,
        words: updatedWords,
        cells: updatedCells
      }
    }));

    setGameState(prev => ({
      ...prev,
      foundWords: updatedWords,
      answersRevealed: true  // mark answers revealed without completing
    }));
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
      isAdjacent,
      removeWord,
      shuffledWords,
      selectWord,
      revealAnswers
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