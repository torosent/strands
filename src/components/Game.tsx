'use client';

import React from 'react';
import Board from './Board';
import GameHeader from './GameHeader';
import GameControls from './GameControls';
import GameComplete from './GameComplete';
import { useGame } from '@/context/GameContext';

export default function Game() {
  const { gameState } = useGame();

  return (
    <div className="max-w-lg mx-auto py-6 px-4 sm:px-6">
      <GameHeader />
      
      <div className="my-8">
        <Board />
      </div>
      
      <div className="mt-16 mb-8">
        <GameControls />
      </div>

      {gameState.isComplete && (
        <GameComplete />
      )}
    </div>
  );
}