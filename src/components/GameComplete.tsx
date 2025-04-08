'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function GameComplete() {
  const { puzzle, gameState, loadPuzzle } = useGame();
  
  // Calculate time taken
  const startTime = gameState.startTime || new Date();
  const endTime = gameState.endTime || new Date();
  const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  
  const totalWords = puzzle.board.words.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-lg animate-fade-in border border-gray-200 dark:border-gray-700">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-900 dark:text-white">
          Puzzle Complete!
        </h2>
        
        <div className="mb-6">
          <p className="text-center mb-2 text-gray-700 dark:text-gray-300">
            You found all {totalWords} words with the theme:
          </p>
          <p className="text-xl font-bold text-center mb-4 text-blue-700 dark:text-blue-400">
            {puzzle.theme}
          </p>
          
          <div className="bg-blue-50 dark:bg-blue-900 p-4 rounded-md mb-4 border border-blue-200 dark:border-blue-800">
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Bonus word: <span className="font-bold">{puzzle.bonusWord}</span>
            </p>
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-4">
            <div className="flex justify-between text-gray-700 dark:text-gray-300 mb-2">
              <span className="font-medium">Time:</span>
              <span className="font-bold">{minutes}m {seconds}s</span>
            </div>
            
            <div className="flex justify-between text-gray-700 dark:text-gray-300">
              <span className="font-medium">Used hint:</span>
              <span className="font-bold">{gameState.usedHint ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={() => loadPuzzle()}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium shadow-sm dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            New Puzzle
          </button>
        </div>
      </div>
    </div>
  );
}