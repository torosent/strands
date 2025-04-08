'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Cell as CellType } from '@/types/game';

// Cell component for individual letters
const Cell = ({ cell }: { cell: CellType }) => {
  const { startSelection, moveSelection, isCellSelectable } = useGame();
  const isSelectable = isCellSelectable(cell);

  return (
    <div 
      className={`
        relative flex items-center justify-center w-full h-full aspect-square
        cursor-pointer select-none transition-all
        ${cell.isFound ? 'text-white' : 'text-gray-900 dark:text-white'}
        ${cell.isSelected ? 'scale-110 z-10' : ''}
      `}
      onPointerDown={(e) => {
        e.preventDefault();
        if (!cell.isFound) startSelection(cell);
      }}
      onPointerEnter={(e) => {
        e.preventDefault();
        if (isSelectable) moveSelection(cell);
      }}
    >
      <div 
        className={`
          flex items-center justify-center w-full h-full rounded-full
          font-bold text-lg sm:text-xl transition-all shadow-sm
          ${cell.isSelected ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-500' : ''}
          ${cell.isFound ? 'bg-blue-600 dark:bg-blue-600' : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-transparent'}
        `}
      >
        {cell.letter}
      </div>
    </div>
  );
};

// Line component to draw paths between selected cells
const SelectionPath = ({ selectedCells }: { selectedCells: CellType[] }) => {
  const [paths, setPaths] = useState<string[]>([]);
  const boardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (selectedCells.length < 2 || !boardRef.current) return;

    const paths: string[] = [];
    const cellWidth = boardRef.current.offsetWidth / 8;
    const cellHeight = boardRef.current.offsetHeight / 6;

    for (let i = 0; i < selectedCells.length - 1; i++) {
      const from = selectedCells[i];
      const to = selectedCells[i + 1];

      // Calculate centers of the cells
      const fromX = (from.col + 0.5) * cellWidth;
      const fromY = (from.row + 0.5) * cellHeight;
      const toX = (to.col + 0.5) * cellWidth;
      const toY = (to.row + 0.5) * cellHeight;

      paths.push(`M${fromX},${fromY} L${toX},${toY}`);
    }

    setPaths(paths);
  }, [selectedCells]);

  if (selectedCells.length < 2) return null;

  return (
    <svg 
      className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none" 
      style={{ position: 'absolute' }}
    >
      {paths.map((path, index) => (
        <path
          key={index}
          d={path}
          stroke="rgba(234, 179, 8, 0.8)"
          strokeWidth="10"
          fill="none"
          strokeLinecap="round"
          className="dark:stroke-yellow-600"
        />
      ))}
    </svg>
  );
};

export default function Board() {
  const { puzzle, gameState, endSelection } = useGame();
  const boardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state when component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle pointer up to end selection
  useEffect(() => {
    const handlePointerUp = () => {
      if (gameState.selectedCells.length > 0) {
        endSelection();
      }
    };

    document.addEventListener('pointerup', handlePointerUp);
    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
    };
  }, [gameState.selectedCells, endSelection]);

  // Return a simplified, stable version for server rendering
  if (!mounted) {
    return (
      <div className="relative w-full max-w-md mx-auto aspect-[4/3] touch-none bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700">
        <div className="grid grid-rows-6 grid-cols-8 w-full h-full gap-1.5">
          {Array(6).fill(0).map((_, rowIndex) => (
            Array(8).fill(0).map((_, colIndex) => (
              <div key={`${rowIndex}-${colIndex}`} className="relative flex items-center justify-center w-full h-full aspect-square">
                <div className="flex items-center justify-center w-full h-full rounded-full font-bold text-lg sm:text-xl bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-transparent">
                  {" "}
                </div>
              </div>
            ))
          ))}
        </div>
      </div>
    );
  }

  return (
    <div 
      className="relative w-full max-w-md mx-auto aspect-[4/3] touch-none bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      ref={boardRef}
    >
      {/* Selection path overlay */}
      <SelectionPath selectedCells={gameState.selectedCells} />

      {/* Board grid */}
      <div className="grid grid-rows-6 grid-cols-8 w-full h-full gap-1.5">
        {puzzle.board.cells.map((row, rowIndex) => (
          row.map((cell, colIndex) => (
            <Cell 
              key={`${rowIndex}-${colIndex}`} 
              cell={cell} 
            />
          ))
        ))}
      </div>

      {/* Current word display */}
      {gameState.currentWord && (
        <div className="absolute -bottom-10 left-0 w-full text-center font-bold text-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 py-2 rounded-md shadow-sm border border-gray-200 dark:border-transparent">
          {gameState.currentWord}
        </div>
      )}
    </div>
  );
}