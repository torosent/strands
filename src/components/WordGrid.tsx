'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';
import { Word } from '@/types/game';

export default function WordGrid() {
  const { shuffledWords, gameState, selectWord } = useGame();

  const isWordSelected = (word: Word) => {
    return gameState.selectedWords.some(w => w.id === word.id);
  };

  const isWordFound = (word: Word) => {
    return gameState.foundWords.some(w => w.id === word.id);
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {shuffledWords.map((word) => (
        <button
          key={word.id}
          onClick={() => selectWord(word)}
          disabled={isWordFound(word) || gameState.isComplete}
          className={`
            px-4 py-2 rounded-md font-medium transition-all
            ${isWordFound(word) 
              ? 'bg-green-500 dark:bg-green-700 text-white opacity-60 cursor-not-allowed' 
              : isWordSelected(word)
                ? 'bg-blue-500 dark:bg-blue-700 text-white scale-105' 
                : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-white'
            }
          `}
        >
          {word.word}
        </button>
      ))}
    </div>
  );
}