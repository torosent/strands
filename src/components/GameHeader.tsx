'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { useTheme } from '@/context/ThemeContext';

export default function GameHeader() {
  const { puzzle, gameState } = useGame();
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const infoButtonRef = useRef<HTMLButtonElement>(null);
  
  // Use useEffect to handle client-side only code
  useEffect(() => {
    setMounted(true);

    // Add click outside listener to close tooltip
    function handleClickOutside(event: MouseEvent) {
      if (
        tooltipRef.current && 
        infoButtonRef.current && 
        !tooltipRef.current.contains(event.target as Node) && 
        !infoButtonRef.current.contains(event.target as Node)
      ) {
        setShowTooltip(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  const totalWords = puzzle.board.words.length;
  const foundWords = gameState.foundWords.length;
  const progress = totalWords > 0 ? (foundWords / totalWords) * 100 : 0;

  // Toggle tooltip visibility
  const toggleTooltip = () => {
    setShowTooltip(!showTooltip);
  };

  // If not mounted yet, use a pre-rendered version that won't change on client
  if (!mounted) {
    return (
      <div className="flex flex-col items-center mb-4 text-center">
        <div className="flex justify-between items-center w-full mb-4">
          <h1 className="text-2xl md:text-3xl font-bold">Strands</h1>
          <div className="flex">
            <div className="w-6 h-6 mr-2"></div> {/* Placeholder for info button */}
            <div className="w-6 h-6"></div> {/* Placeholder for theme toggle */}
          </div>
        </div>
        
        <div className="mb-2">
          <p className="text-sm text-gray-600">
            Loading puzzle...
          </p>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-2">
          <div className="h-2.5 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center mb-6 text-center bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">Strands</h1>
        <div className="flex items-center space-x-2">
          {/* Info button */}
          <button 
            ref={infoButtonRef}
            onClick={toggleTooltip}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors relative"
            aria-label="How to play"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800 dark:text-gray-200">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M12 16v-4"></path>
              <path d="M12 8h.01"></path>
            </svg>
          </button>

          {/* Theme toggle button */}
          <button 
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-800">
                <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"></path>
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-300">
                <circle cx="12" cy="12" r="4"></circle>
                <path d="M12 2v2"></path>
                <path d="M12 20v2"></path>
                <path d="m4.93 4.93 1.41 1.41"></path>
                <path d="m17.66 17.66 1.41 1.41"></path>
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="m6.34 17.66-1.41 1.41"></path>
                <path d="m19.07 4.93-1.41 1.41"></path>
              </svg>
            )}
          </button>

          {/* How to Play tooltip */}
          {showTooltip && (
            <div 
              ref={tooltipRef}
              className="absolute right-0 top-14 z-50 bg-white dark:bg-gray-800 rounded-lg p-4 shadow-lg border border-gray-200 dark:border-gray-700 w-64 text-left animate-fade-in"
            >
              <h3 className="text-md font-semibold mb-2 text-gray-900 dark:text-white">How to Play</h3>
              <ul className="text-sm text-gray-700 dark:text-gray-300 space-y-2 list-disc list-inside">
                <li>Drag or tap letters to create words</li>
                <li>If tapping, double tap the last letter to submit</li>
                <li>Theme words fill the board entirely</li>
                <li>Theme words stay highlighted in blue when found</li>
                <li>No theme words overlap</li>
              </ul>
            </div>
          )}
        </div>
      </div>
      
      <div className="mb-3">
        <p className="text-base font-bold text-gray-900 dark:text-gray-300">
          {`Puzzle #${puzzle.id}`}
        </p>
      </div>
      
      <div className="mb-4">
        <p className="text-md font-semibold text-gray-900 dark:text-white">
          Find theme words to fill the board
        </p>
      </div>
      
      {/* Theme is now always visible */}
      <div className="bg-blue-50 dark:bg-blue-900 py-3 px-4 rounded-md mb-4 animate-fade-in border border-blue-200 dark:border-blue-800 shadow-sm w-full">
        <p className="text-blue-800 dark:text-blue-100 font-medium">
          Theme: <span className="font-bold">{puzzle.theme}</span>
        </p>
      </div>
      
      <div className="w-full bg-gray-300 dark:bg-gray-700 rounded-full h-3 mb-2 shadow-inner">
        <div 
          className="bg-blue-600 h-3 rounded-full transition-all"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className="text-base font-bold text-gray-900 dark:text-gray-300">
        {`${foundWords} of ${totalWords} words found`}
      </div>
    </div>
  );
}