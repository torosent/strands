import type { BoardWord, Cell, StrandsBoard } from '../types/game';

// NYT Strands board: 6 columns x 8 rows. The theme words and the spangram use
// every cell exactly once. Words bend: each letter touches the next in any of
// the 8 directions.
export const ROWS = 8;
export const COLS = 6;
const SIZE = ROWS * COLS;
const MAX_TRIES = 300;
const STEPS_PER_TRY = 20000;

const rowOf = (i: number) => Math.floor(i / COLS);
const colOf = (i: number) => i % COLS;

const NEIGHBORS: number[][] = Array.from({ length: SIZE }, (_, i) => {
  const out: number[] = [];
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      const r = rowOf(i) + dr;
      const c = colOf(i) + dc;
      if ((dr || dc) && r >= 0 && r < ROWS && c >= 0 && c < COLS) out.push(r * COLS + c);
    }
  }
  return out;
});

const shuffle = <T,>(items: T[]): T[] => {
  const result = [...items];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
};

const freeDegree = (free: boolean[], i: number) => NEIGHBORS[i].filter(n => free[n]).length;

// Every connected group of free cells must be exactly fillable by some of the remaining words.
function fillable(free: boolean[], lengths: number[]): boolean {
  const sums = new Set<number>([0]);
  for (const len of lengths) for (const s of [...sums]) sums.add(s + len);

  const seen = new Array(SIZE).fill(false);
  for (let start = 0; start < SIZE; start++) {
    if (!free[start] || seen[start]) continue;
    let size = 0;
    const stack = [start];
    seen[start] = true;
    while (stack.length) {
      const i = stack.pop()!;
      size++;
      for (const n of NEIGHBORS[i]) if (free[n] && !seen[n]) { seen[n] = true; stack.push(n); }
    }
    if (!sums.has(size)) return false;
  }
  return true;
}

type Budget = { steps: number };

// Random self-avoiding path of `length` free cells from `start`, accepted only if `ok` passes.
// Prefers cells with few free neighbours so it doesn't strand single cells.
// On success the path's cells stay marked as used.
function findPath(
  free: boolean[], start: number, length: number, ok: (path: number[]) => boolean, budget: Budget
): number[] | null {
  const path = [start];
  free[start] = false;
  const extend = (): boolean => {
    if (--budget.steps < 0) return false;
    if (path.length === length) return ok(path);
    const next = shuffle(NEIGHBORS[path[path.length - 1]].filter(n => free[n]))
      .sort((a, b) => freeDegree(free, a) - freeDegree(free, b));
    for (const n of next) {
      free[n] = false;
      path.push(n);
      if (extend()) return true;
      path.pop();
      free[n] = true;
    }
    return false;
  };
  if (extend()) return path;
  free[start] = true;
  return null;
}

// Paths per word (index into `words`, spangram last), or null if this try got stuck.
function tryLayout(spangram: string, words: string[]): number[][] | null {
  const free: boolean[] = new Array(SIZE).fill(true);
  const budget: Budget = { steps: STEPS_PER_TRY };
  const paths: number[][] = [];

  // Spangram: starts on one side and reaches the opposite one.
  // Top to bottom needs at least 8 letters, left to right at least 6.
  const vertical = spangram.length >= ROWS && Math.random() < 0.5;
  const sideA = (i: number) => (vertical ? rowOf(i) === 0 : colOf(i) === 0);
  const sideB = (i: number) => (vertical ? rowOf(i) === ROWS - 1 : colOf(i) === COLS - 1);
  const [from, to] = Math.random() < 0.5 ? [sideA, sideB] : [sideB, sideA];
  const wordLengths = words.map(w => w.length);
  const starts = shuffle([...Array(SIZE).keys()].filter(from));
  let span: number[] | null = null;
  for (const start of starts) {
    span = findPath(free, start, spangram.length, p => p.some(to) && fillable(free, wordLengths), budget);
    if (span || budget.steps < 0) break;
  }
  if (!span) return null;
  paths[words.length] = span;

  // Theme words: start each at the most boxed-in free cell, as its first or last letter.
  const place = (left: number[]): boolean => {
    if (left.length === 0) return true;
    const freeCells = shuffle([...Array(SIZE).keys()].filter(i => free[i]));
    const cell = freeCells.reduce((a, b) => (freeDegree(free, b) < freeDegree(free, a) ? b : a));
    for (const w of shuffle(left)) {
      const rest = left.filter(x => x !== w);
      const restLengths = rest.map(x => words[x].length);
      const path = findPath(free, cell, words[w].length, () => fillable(free, restLengths), budget);
      if (path) {
        paths[w] = Math.random() < 0.5 ? path : [...path].reverse();
        if (place(rest)) return true;
        path.forEach(i => { free[i] = true; });
      }
      if (budget.steps < 0) return false;
    }
    return false;
  };
  return place([...words.keys()]) ? paths : null;
}

export function generateBoard(spangram: string, words: string[]): StrandsBoard {
  const total = [spangram, ...words].join('').length;
  if (total !== SIZE) throw new Error(`Puzzle needs exactly ${SIZE} letters, has ${total}: ${spangram}`);

  for (let t = 0; t < MAX_TRIES; t++) {
    const paths = tryLayout(spangram, words);
    if (!paths) continue;

    const cells: Cell[][] = Array.from({ length: ROWS }, (_, row) =>
      Array.from({ length: COLS }, (_, col) => ({ row, col, letter: '', isFound: false }))
    );
    const all = [...words, spangram];
    const boardWords: BoardWord[] = all.map((word, w) => {
      const wordCells = paths[w].map(i => cells[rowOf(i)][colOf(i)]);
      wordCells.forEach((cell, k) => { cell.letter = word[k]; });
      return { id: w + 1, word, isFound: false, isSpangram: w === words.length, cells: wordCells };
    });
    return { cells, words: boardWords };
  }
  throw new Error(`Could not lay out puzzle: ${spangram}`);
}

type Pos = { row: number; col: number };
export const sameCell = (a: Pos, b: Pos) => a.row === b.row && a.col === b.col;

// Does a path touch two opposite sides of the board? (the spangram rule)
export const spansBoard = (cells: Pos[]) =>
  (cells.some(c => c.col === 0) && cells.some(c => c.col === COLS - 1)) ||
  (cells.some(c => c.row === 0) && cells.some(c => c.row === ROWS - 1));

// Random boards can have more than one solution. A traced theme word counts when the
// words still to find can exactly fill the cells that are left; this finds such a fill.
// `letters` and `free` are indexed row * COLS + col. Returns one path per word, or null.
export function cover(
  letters: string[], free: boolean[], words: string[], ok: (word: number, path: number[]) => boolean = () => true
): number[][] | null {
  const options = words.map((word, w) => {
    const out: number[][] = [];
    const grow = (path: number[]) => {
      if (path.length === word.length) {
        if (ok(w, path)) out.push([...path]);
        return;
      }
      for (const n of NEIGHBORS[path[path.length - 1]]) {
        if (free[n] && letters[n] === word[path.length] && !path.includes(n)) {
          path.push(n);
          grow(path);
          path.pop();
        }
      }
    };
    letters.forEach((letter, i) => { if (free[i] && letter === word[0]) grow([i]); });
    return out;
  });

  const used = free.map(f => !f);
  const result: number[][] = [];
  const left = new Set(words.keys());
  const solve = (): boolean => {
    if (left.size === 0) return used.every(Boolean);
    // Try the word with the fewest places left first
    let best = -1;
    let bestPaths: number[][] = [];
    for (const w of left) {
      const paths = options[w].filter(p => p.every(i => !used[i]));
      if (paths.length === 0) return false;
      if (best < 0 || paths.length < bestPaths.length) { best = w; bestPaths = paths; }
    }
    left.delete(best);
    for (const path of bestPaths) {
      path.forEach(i => { used[i] = true; });
      result[best] = path;
      if (solve()) return true;
      path.forEach(i => { used[i] = false; });
    }
    left.add(best);
    return false;
  };
  return solve() ? result : null;
}

// Is the selection a theme word? On its own cells it always is. A random board can have
// more than one solution, so on other cells it also counts when the words still to find
// can fill the rest of the board; those words then move to that fill.
// Returns the word and the new cells of every word that moved (the found one included).
export function matchThemeWord(board: StrandsBoard, selected: Cell[]) {
  const word = selected.map(c => c.letter).join('');
  const match = board.words.find(w => !w.isFound && w.word === word);
  if (!match) return undefined;
  if (match.cells.every(c => selected.some(s => sameCell(s, c)))) {
    return { word: match, paths: new Map([[match.id, match.cells]]) };
  }
  if (match.isSpangram && !spansBoard(selected)) return undefined;

  const cells = board.cells.flat();
  const free = cells.map(c => !c.isFound && !selected.some(s => sameCell(s, c)));
  const others = board.words.filter(w => !w.isFound && w.id !== match.id);
  const fill = cover(cells.map(c => c.letter), free, others.map(w => w.word), (i, path) =>
    !others[i].isSpangram || spansBoard(path.map(p => cells[p]))
  );
  if (!fill) return undefined;
  const paths = new Map(others.map((w, i) => [w.id, fill[i].map(p => cells[p])]));
  paths.set(match.id, selected);
  return { word: match, paths };
}
