'use client';

import React from 'react';
import { useGame, WORDS_PER_HINT } from '@/context/GameContext';

export default function GameControls() {
  const { gameState, clearSelection, resetGame, loadPuzzle, revealAnswers, giveHint, hintsLeft, hintProgress, canHint } = useGame();

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
            onClick={giveHint}
            disabled={!canHint}
            aria-label={hintsLeft > 0 ? `Hint, ${hintsLeft} available` : `Hint: ${hintProgress} of ${WORDS_PER_HINT} non-theme words found`}
            className="relative overflow-hidden bg-yellow-500 hover:bg-yellow-600 disabled:bg-gray-200 disabled:text-yellow-900 disabled:hover:bg-gray-200 disabled:cursor-not-allowed dark:disabled:bg-gray-700 dark:disabled:text-yellow-100 text-white px-4 py-2 rounded-md font-medium shadow-sm dark:bg-yellow-600 dark:hover:bg-yellow-700"
          >
            {/* Fills up with non-theme words: every WORDS_PER_HINT earn a hint */}
            {hintsLeft <= 0 && (
              <span className="absolute inset-y-0 left-0 bg-yellow-300/60 dark:bg-yellow-600/50" style={{ width: `${(hintProgress / WORDS_PER_HINT) * 100}%` }} />
            )}
            <span className="relative">{hintsLeft > 1 ? `Hint (${hintsLeft})` : 'Hint'}</span>
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