'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '@/context/GameContext';
import { Cell as CellType } from '@/types/game';

// Define color palette for revealed words
const WORD_COLORS = [
  'bg-red-500',      // 0
  'bg-blue-600',     // 1
  'bg-green-600',    // 2
  'bg-yellow-500',   // 3
  'bg-purple-500',   // 4
  'bg-pink-500',     // 5
  'bg-indigo-600',   // 6
  'bg-teal-500',     // 7
];

// Cell component for individual letters
const Cell = ({ cell }: { cell: CellType }) => {
  const { startSelection, moveSelection, isCellSelectable, puzzle, gameState } = useGame();
  const isSelectable = isCellSelectable(cell);
  const cellRef = useRef<HTMLDivElement>(null);
  
  // Check if this cell is hinted
  const isHinted = gameState.hintedCells.some(
    hc => hc.row === cell.row && hc.col === cell.col
  );
  
  // Get the color for this cell based on which word it belongs to
  const getCellColor = () => {
    if (!cell.isFound) return 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-transparent';
    
    // Find which word this cell belongs to
    const wordForCell = puzzle.board.words.find(word => 
      word.isFound && word.cells.some(c => c.row === cell.row && c.col === cell.col)
    );
    
    if (wordForCell && wordForCell.colorIndex !== undefined) {
      return WORD_COLORS[wordForCell.colorIndex % WORD_COLORS.length];
    }
    
    // Default blue color if no colorIndex is set
    return 'bg-blue-600 dark:bg-blue-600';
  };

  // Register this cell's ref with parent
  useEffect(() => {
    if (cellRef.current) {
      cellRef.current.dataset.row = cell.row.toString();
      cellRef.current.dataset.col = cell.col.toString();
    }
  }, [cell.row, cell.col]);

  return (
    <div 
      ref={cellRef}
      data-row={cell.row}
      data-col={cell.col}
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
      onTouchStart={(e) => {
        e.preventDefault();
        if (!cell.isFound) startSelection(cell);
      }}
    >
      <div 
        className={`
          flex items-center justify-center w-full h-full rounded-full
          font-bold text-lg sm:text-xl transition-all shadow-sm
          ${cell.isSelected ? 'bg-yellow-400 text-gray-900 dark:bg-yellow-500' : ''}
          ${cell.isFound ? getCellColor() : 'bg-white dark:bg-gray-700 border-2 border-gray-300 dark:border-transparent'}
          ${isHinted && !cell.isFound ? 'border-4 border-yellow-500 dark:border-yellow-400' : ''}
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
      {/* Thicker background path for better visibility */}
      {paths.map((path, index) => (
        <path
          key={`bg-${index}`}
          d={path}
          stroke="rgba(234, 179, 8, 0.3)"
          strokeWidth="16"
          fill="none"
          strokeLinecap="round"
          className="dark:stroke-yellow-600/30"
        />
      ))}
      
      {/* Main selection path */}
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
      
      {/* Direction indicators on path to help with diagonal selection */}
      {selectedCells.length > 1 && selectedCells.slice(1).map((cell, index) => {
        const prevCell = selectedCells[index];
        const cellWidth = boardRef.current ? boardRef.current.offsetWidth / 8 : 0;
        const cellHeight = boardRef.current ? boardRef.current.offsetHeight / 6 : 0;
        
        const x = ((prevCell.col + cell.col) / 2 + 0.5) * cellWidth;
        const y = ((prevCell.row + cell.row) / 2 + 0.5) * cellHeight;
        
        return (
          <circle
            key={`indicator-${index}`}
            cx={x}
            cy={y}
            r={5}
            fill="white"
            stroke="rgba(234, 179, 8, 1)"
            strokeWidth={2}
            className="opacity-80"
          />
        );
      })}
    </svg>
  );
};

export default function Board() {
  const { puzzle, gameState, endSelection, moveSelection } = useGame();
  const boardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state when component mounts on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Handle touch move at the board level for better mobile support
  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    const touch = e.touches[0];
    if (!touch || !boardRef.current) return;

    // Find which cell the touch is over
    const elements = document.elementsFromPoint(touch.clientX, touch.clientY);
    const cellElement = elements.find(el => 
      el.hasAttribute('data-row') && el.hasAttribute('data-col')
    ) as HTMLElement;

    if (cellElement) {
      const row = parseInt(cellElement.dataset.row || '0', 10);
      const col = parseInt(cellElement.dataset.col || '0', 10);
      const cell = puzzle.board.cells[row]?.[col];
      
      if (cell) {
        moveSelection(cell);
      }
    }
  };

  // Handle pointer up to end selection
  useEffect(() => {
    const handlePointerUp = () => {
      if (gameState.selectedCells.length > 0) {
        endSelection();
      }
    };

    const handleTouchEnd = () => {
      if (gameState.selectedCells.length > 0) {
        endSelection();
      }
    };

    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('touchend', handleTouchEnd);
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
    className="relative w-full max-w-md mx-auto aspect-[4/3] touch-none bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
    ref={boardRef}
    onTouchMove={handleTouchMove}
    >
      {/* Selection path overlay */}
      <SelectionPath selectedCells={gameState.selectedCells} />

      {/* Board grid */}
      <div className="grid grid-rows-6 grid-cols-8 w-full gap-1.5 min-h-0"> 
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