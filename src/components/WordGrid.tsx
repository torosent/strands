'use client';

import React from 'react';
import { useGame } from '@/context/GameContext';

export default function WordGrid() {
  const { shuffledWords, gameState, selectWord } = useGame();
  const colorHexes = ['#f87171', '#3b82f6', '#10b981', '#facc15', '#a78bfa', '#ec4899', '#6366f1', '#14b8a6'];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
      {shuffledWords.map((word, idx) => {
        // assign a unique color for each word
        const styleColor = { backgroundColor: colorHexes[idx % colorHexes.length], color: '#fff' };
        return (
          <button
            key={word.id}
            onClick={() => selectWord(word)}
            disabled={gameState.isComplete || gameState.answersRevealed || false}
            style={styleColor}
            className="px-4 py-2 rounded-md font-medium transition-all hover:opacity-80 cursor-pointer"
          >
            {word.word}
          </button>
        );
      })}
    </div>
  );
}