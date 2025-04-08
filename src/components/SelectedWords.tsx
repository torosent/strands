'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function SelectedWords() {
  const { gameState, removeWord } = useGame();
  
  if (gameState.selectedWords.length === 0) {
    return (
      <div className="min-h-[60px] flex items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4">
        <p className="text-gray-500 dark:text-gray-400">Select words to find the common theme</p>
      </div>
    );
  }

  return (
    <div className="min-h-[60px] border-2 border-blue-300 dark:border-blue-700 rounded-lg p-4">
      <div className="flex flex-wrap gap-2">
        {gameState.selectedWords.map((word) => (
          <div
            key={word.id}
            className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 px-3 py-1 rounded-full flex items-center"
          >
            <span className="mr-1">{word.word}</span>
            <button
              onClick={() => removeWord(word)}
              className="text-blue-800 dark:text-blue-200 hover:text-blue-950 dark:hover:text-white"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6 6 18"></path>
                <path d="m6 6 12 12"></path>
              </svg>
              <span className="sr-only">Remove {word.word}</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}