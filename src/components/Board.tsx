'use client';

import React, { useEffect, useRef } from 'react';
import { useGame } from '@/context/GameContext';
import { BoardWord, Cell as CellType } from '@/types/game';
import { ROWS, COLS, sameCell } from '@/data/board';

// NYT colors: theme words blue, spangram yellow, current selection grey
const LOOKS = {
  selected: 'bg-slate-300 text-gray-900 dark:bg-slate-500 dark:text-white',
  word: 'bg-sky-300 text-gray-900 dark:bg-sky-600 dark:text-white',
  spangram: 'bg-yellow-300 text-gray-900 dark:bg-yellow-500',
  hinted: 'bg-sky-50 dark:bg-gray-700 text-gray-900 dark:text-white ring-4 ring-inset ring-sky-400',
  plain: 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white',
};
const LINE_COLORS = {
  selected: 'stroke-slate-300 dark:stroke-slate-500',
  word: 'stroke-sky-300 dark:stroke-sky-600',
  spangram: 'stroke-yellow-300 dark:stroke-yellow-500',
  hintOrder: 'stroke-sky-500',
};

// Revealed answers: every theme word gets its own color (cell, line), so the words can be told apart
const REVEAL_COLORS = [
  ['bg-rose-300 text-gray-900 dark:bg-rose-600 dark:text-white', 'stroke-rose-300 dark:stroke-rose-600'],
  ['bg-emerald-300 text-gray-900 dark:bg-emerald-600 dark:text-white', 'stroke-emerald-300 dark:stroke-emerald-600'],
  ['bg-violet-300 text-gray-900 dark:bg-violet-600 dark:text-white', 'stroke-violet-300 dark:stroke-violet-600'],
  ['bg-orange-300 text-gray-900 dark:bg-orange-600 dark:text-white', 'stroke-orange-300 dark:stroke-orange-600'],
  ['bg-sky-300 text-gray-900 dark:bg-sky-600 dark:text-white', 'stroke-sky-300 dark:stroke-sky-600'],
  ['bg-pink-300 text-gray-900 dark:bg-pink-600 dark:text-white', 'stroke-pink-300 dark:stroke-pink-600'],
  ['bg-lime-300 text-gray-900 dark:bg-lime-600 dark:text-white', 'stroke-lime-300 dark:stroke-lime-600'],
  ['bg-teal-300 text-gray-900 dark:bg-teal-600 dark:text-white', 'stroke-teal-300 dark:stroke-teal-600'],
];

const Cell = ({ cell, look, selected }: { cell: CellType; look: string; selected: boolean }) => (
  <div
    data-row={cell.row}
    data-col={cell.col}
    className={`relative z-10 flex items-center justify-center aspect-square cursor-pointer select-none ${selected ? 'scale-110' : ''} transition-transform`}
  >
    <div className={`flex items-center justify-center w-full h-full rounded-full font-bold text-lg sm:text-xl pointer-events-none transition-colors ${look}`}>
      {cell.letter}
    </div>
  </div>
);

// Line through cells, drawn in grid units (1 unit = 1 cell) so nothing needs measuring
const Strand = ({ cells, className, dashed }: { cells: CellType[]; className: string; dashed?: boolean }) =>
  cells.length < 2 ? null : (
    <polyline
      points={cells.map(c => `${c.col + 0.5},${c.row + 0.5}`).join(' ')}
      fill="none"
      strokeWidth={dashed ? 3 : 10}
      strokeDasharray={dashed ? '6 6' : undefined}
      strokeLinecap="round"
      strokeLinejoin="round"
      vectorEffect="non-scaling-stroke"
      className={className}
    />
  );

export default function Board() {
  const { puzzle, gameState, currentWord, pressCell, moveSelection, submit } = useGame();
  // Set while a finger or mouse button is down; `moved` tells a drag from a tap
  const press = useRef<{ start: CellType; moved: boolean } | null>(null);

  // Cell under the pointer. `strict` counts only the middle of the circle,
  // so a diagonal drag does not clip the neighbouring cells on the way.
  const cellAt = (e: React.PointerEvent, strict: boolean) => {
    const el = document.elementFromPoint(e.clientX, e.clientY)?.closest<HTMLElement>('[data-row]');
    if (!el) return undefined;
    if (strict) {
      const r = el.getBoundingClientRect();
      const dist = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      if (dist > r.width * 0.4) return undefined;
    }
    return puzzle.board.cells[Number(el.dataset.row)]?.[Number(el.dataset.col)];
  };

  // Releasing after a drag submits the word; after a tap the selection stays for more taps.
  // A cancelled press (e.g. the browser took over the touch) just ends the press.
  useEffect(() => {
    const onUp = () => {
      if (press.current?.moved) submit();
      press.current = null;
    };
    const onCancel = () => { press.current = null; };
    document.addEventListener('pointerup', onUp);
    document.addEventListener('pointercancel', onCancel);
    return () => {
      document.removeEventListener('pointerup', onUp);
      document.removeEventListener('pointercancel', onCancel);
    };
  }, [submit]);

  const isSelected = (cell: CellType) => gameState.selectedCells.some(c => sameCell(c, cell));
  const hintWord = puzzle.board.words.find(w => w.id === gameState.hintWordId && !w.isFound);
  const foundWordOf = (cell: CellType) =>
    puzzle.board.words.find(w => w.isFound && w.cells.some(c => sameCell(c, cell)));
  // [cell classes, line classes] of a found word
  const colorsOf = (w: BoardWord) =>
    w.isSpangram ? [LOOKS.spangram, LINE_COLORS.spangram]
    : gameState.answersRevealed ? REVEAL_COLORS[(w.id - 1) % REVEAL_COLORS.length]
    : [LOOKS.word, LINE_COLORS.word];
  const lookOf = (cell: CellType) => {
    if (isSelected(cell)) return LOOKS.selected;
    const found = cell.isFound && foundWordOf(cell);
    if (found) return colorsOf(found)[0];
    if (hintWord?.cells.some(c => sameCell(c, cell))) return LOOKS.hinted;
    return LOOKS.plain;
  };

  return (
    <div
      className="relative w-full max-w-sm mx-auto bg-white dark:bg-gray-800 px-4 py-3 rounded-lg shadow-md border border-gray-200 dark:border-gray-700"
      style={{ touchAction: 'none' }}
      onPointerDown={(e) => {
        const cell = cellAt(e, false);
        if (!cell || cell.isFound) return;
        e.preventDefault();
        press.current = { start: cell, moved: false };
        pressCell(cell);
      }}
      onPointerMove={(e) => {
        if (!press.current) return;
        // No button down: the release happened where we couldn't see it (e.g. outside the window)
        if (e.buttons === 0) { press.current = null; return; }
        const cell = cellAt(e, true);
        if (!cell) return;
        // Wobbling on the first letter is still a tap; once moved, going back onto it steps back
        if (!sameCell(cell, press.current.start)) press.current.moved = true;
        if (press.current.moved) moveSelection(cell);
      }}
    >
      <div className="relative">
        <svg viewBox={`0 0 ${COLS} ${ROWS}`} className="absolute inset-0 w-full h-full pointer-events-none">
          {puzzle.board.words.filter(w => w.isFound).map(w => (
            <Strand key={w.id} cells={w.cells} className={colorsOf(w)[1]} />
          ))}
          {hintWord && gameState.hintShowsOrder && (
            <Strand cells={hintWord.cells} className={LINE_COLORS.hintOrder} dashed />
          )}
          <Strand cells={gameState.selectedCells} className={LINE_COLORS.selected} />
        </svg>

        <div className="grid grid-cols-6 gap-1.5">
          {puzzle.board.cells.flat().map(cell => (
            <Cell key={`${cell.row}-${cell.col}`} cell={cell} look={lookOf(cell)} selected={isSelected(cell)} />
          ))}
        </div>
      </div>

      {/* Current word, or feedback on the last try */}
      {(currentWord || gameState.message) && (
        <div className="absolute -bottom-10 left-0 w-full text-center font-bold text-xl text-gray-900 dark:text-white bg-white dark:bg-gray-800 py-2 rounded-md shadow-sm border border-gray-200 dark:border-transparent">
          {currentWord || gameState.message}
        </div>
      )}
    </div>
  );
}
