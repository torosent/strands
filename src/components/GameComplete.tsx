'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useGame } from '@/context/GameContext';

// Fireworks component for celebration effect
const Fireworks = () => {
  const [fireworks, setFireworks] = useState<React.ReactNode[]>([]);
  
  const createFirework = useCallback(() => {
    const colors = ['#FF5252', '#FFD740', '#64FFDA', '#448AFF', '#E040FB', '#69F0AE'];
    
    const firework = {
      id: Date.now(),
      x: Math.random() * 100 - 50, // Random position
      y: -(Math.random() * 50 + 50), // Start below viewport
      size: Math.random() * 2 + 1,
      color: colors[Math.floor(Math.random() * colors.length)]
    };
    
    return (
      <div 
        key={firework.id}
        className="firework"
        style={{
          '--x': `${firework.x}vw`,
          '--initialY': `${firework.y}vh`,
          '--initialSize': `${firework.size}vmin`,
          '--finalSize': `${firework.size * 5}vmin`,
          '--duration': `${Math.random() * 1 + 0.5}s`,
          '--color': firework.color,
          opacity: 1
        } as React.CSSProperties}
        onAnimationEnd={() => {
          setFireworks(prev => prev.filter(fw => 
            React.isValidElement(fw) && fw.key !== firework.id.toString()
          ));
        }}
      >
        {[...Array(8)].map((_, i) => (
          <div 
            key={i} 
            className="firework-particle"
            style={{
              '--x': `${Math.cos(Math.PI * 2 / 8 * i) * 50}px`,
              '--y': `${Math.sin(Math.PI * 2 / 8 * i) * 50}px`,
              '--duration': `${Math.random() * 1 + 0.5}s`,
            } as React.CSSProperties}
          />
        ))}
      </div>
    );
  }, []);
  
  useEffect(() => {
    // Launch fireworks at staggered intervals
    const interval = setInterval(() => {
      setFireworks(prev => [...prev, createFirework()]);
    }, 300);
    
    // Stop after a few seconds
    const timeout = setTimeout(() => {
      clearInterval(interval);
    }, 3000);
    
    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [createFirework]);
  
  return <div className="fireworks-container">{fireworks}</div>;
};

export default function GameComplete() {
  const { puzzle, gameState, loadPuzzle } = useGame();
  const [showFireworks, setShowFireworks] = useState(false);
  
  useEffect(() => {
    // Start fireworks animation with a slight delay
    const timer = setTimeout(() => {
      setShowFireworks(true);
    }, 200);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Calculate time taken
  const startTime = gameState.startTime || new Date();
  const endTime = gameState.endTime || new Date();
  const timeTaken = Math.floor((endTime.getTime() - startTime.getTime()) / 1000);
  const minutes = Math.floor(timeTaken / 60);
  const seconds = timeTaken % 60;
  
  const totalWords = puzzle.board.words.length;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      {showFireworks && <Fireworks />}
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