'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function GameControls() {
  const { gameState, clearSelection, resetGame, loadPuzzle, revealAnswers, useHint } = useGame();

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3 justify-center">
        {gameState.selectedCells.length > 0 && (
          <button
            onClick={clearSelection}
            className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium border border-gray-300 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
          >
            Clear
          </button>
        )}
        
        <button
          onClick={resetGame}
          className="bg-white hover:bg-gray-100 text-gray-800 px-4 py-2 rounded-md font-medium border border-gray-300 shadow-sm dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white dark:border-gray-600"
        >
          Reset
        </button>
        
        <button
          onClick={() => loadPuzzle()}
          className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md font-medium shadow-sm dark:bg-purple-600 dark:hover:bg-purple-700"
        >
          New Puzzle
        </button>
        
        {!gameState.isComplete && !gameState.answersRevealed && (
          <button
            onClick={useHint}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-md font-medium shadow-sm dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            Hint
          </button>
        )}
        
        {!gameState.isComplete && (
          <button
            onClick={revealAnswers}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md font-medium shadow-sm"
          >
            Reveal Answers
          </button>
        )}
      </div>
    </div>
  );
}