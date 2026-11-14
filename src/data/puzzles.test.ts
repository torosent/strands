import { test } from 'node:test';
import assert from 'node:assert/strict';
import { puzzleThemes, getPuzzle } from './puzzles.ts';
import { generateBoard, cover, spansBoard, matchThemeWord, ROWS, COLS } from './board.ts';
import type { StrandsBoard } from '../types/game';

test('puzzle data follows the NYT rules', () => {
  const names = puzzleThemes.map(t => t.theme);
  assert.equal(new Set(names).size, names.length, 'theme names are unique');

  for (const { theme, spangram, words } of puzzleThemes) {
    const all = [spangram, ...words];
    assert.equal(all.join('').length, ROWS * COLS, `${theme}: words must fill the board exactly`);
    assert.ok(all.every(w => /^[A-Z]{4,}$/.test(w)), `${theme}: words are 4+ letters A-Z`);
    assert.equal(new Set(all).size, all.length, `${theme}: duplicate word`);
  }
});

test('every board is filled by the words along touching cells, spangram side to side', () => {
  for (const { theme, spangram, words } of puzzleThemes) {
    for (let run = 0; run < 10; run++) {
      const board = generateBoard(spangram, words);
      assert.deepEqual(board.words.map(w => w.word).sort(), [spangram, ...words].sort(), theme);

      for (const w of board.words) {
        assert.equal(w.cells.map(c => c.letter).join(''), w.word, theme);
        w.cells.slice(1).forEach((c, i) => {
          const prev = w.cells[i];
          assert.equal(Math.max(Math.abs(c.row - prev.row), Math.abs(c.col - prev.col)), 1, `${theme}: ${w.word} has a gap`);
        });
      }

      const used = board.words.flatMap(w => w.cells.map(c => `${c.row},${c.col}`));
      assert.equal(new Set(used).size, ROWS * COLS, `${theme}: every cell used exactly once`);

      const span = board.words.filter(w => w.isSpangram);
      assert.equal(span.length, 1, theme);
      const rows = span[0].cells.map(c => c.row);
      const cols = span[0].cells.map(c => c.col);
      const acrossSides = (cols.includes(0) && cols.includes(COLS - 1)) || (rows.includes(0) && rows.includes(ROWS - 1));
      assert.ok(acrossSides, `${theme}: spangram must touch two opposite sides`);
    }
  }
});

test('cover finds a fill for the words still to find, and none when cells are left over', () => {
  for (const { theme, spangram, words } of puzzleThemes.slice(0, 20)) {
    const board = generateBoard(spangram, words);
    const letters = board.cells.flat().map(c => c.letter);
    const [found, ...rest] = board.words;
    const free = letters.map((_, i) => !found.cells.some(c => c.row * COLS + c.col === i));
    const fill = cover(letters, free, rest.map(w => w.word));
    assert.ok(fill, theme);
    fill.forEach((path, i) => assert.equal(path.map(p => letters[p]).join(''), rest[i].word, theme));

    // Leave one word out: its cells can't be filled, so there is no cover
    assert.equal(cover(letters, free, rest.slice(1).map(w => w.word)), null, theme);
  }
  assert.ok(spansBoard([{ row: 3, col: 0 }, { row: 3, col: COLS - 1 }]));
  assert.ok(!spansBoard([{ row: 0, col: 0 }, { row: 1, col: 1 }]));
});

// Every path of touching cells that spells `word` (cell indices row * COLS + col)
function pathsSpelling(letters: string[], word: string): number[][] {
  const out: number[][] = [];
  const grow = (path: number[]) => {
    if (path.length === word.length) return void out.push([...path]);
    const last = path[path.length - 1];
    for (let n = 0; n < letters.length; n++) {
      const near = Math.abs(Math.floor(n / COLS) - Math.floor(last / COLS)) <= 1 && Math.abs((n % COLS) - (last % COLS)) <= 1;
      if (near && !path.includes(n) && letters[n] === word[path.length]) { path.push(n); grow(path); path.pop(); }
    }
  };
  letters.forEach((l, i) => { if (l === word[0]) grow([i]); });
  return out;
}

// The words' cells after a match: each spells its word, they don't overlap, they fill the board
function assertValidLayout(board: StrandsBoard, paths: Map<number, { row: number; col: number }[]>, theme: string) {
  const letters = board.cells.flat().map(c => c.letter);
  const used = new Set<number>();
  for (const w of board.words) {
    const cells = paths.get(w.id) ?? w.cells;
    assert.equal(cells.map(c => letters[c.row * COLS + c.col]).join(''), w.word, theme);
    cells.forEach(c => used.add(c.row * COLS + c.col));
    if (w.isSpangram) assert.ok(spansBoard(cells), `${theme}: spangram must span`);
  }
  assert.equal(used.size, ROWS * COLS, `${theme}: words must fill the board`);
}

test('a theme word counts on its own cells, or on any path that leaves the rest fillable', () => {
  let accepted = 0;
  let rejected = 0;
  for (const { theme, spangram, words } of puzzleThemes.slice(0, 60)) {
    const board = generateBoard(spangram, words);
    const cells = board.cells.flat();
    const letters = cells.map(c => c.letter);
    for (const w of board.words) {
      for (const path of pathsSpelling(letters, w.word).slice(0, 20)) {
        const selected = path.map(i => cells[i]);
        const ownCells = w.cells.every(c => path.includes(c.row * COLS + c.col));
        const others = board.words.filter(x => x !== w);
        const fillable = (!w.isSpangram || spansBoard(selected)) && cover(
          letters, cells.map((_, i) => !path.includes(i)), others.map(x => x.word),
          (i, p) => !others[i].isSpangram || spansBoard(p.map(q => cells[q]))
        ) !== null;

        const result = matchThemeWord(board, selected);
        assert.equal(!!result, ownCells || fillable, `${theme}: ${w.word}`);
        if (!result) { rejected++; continue; }
        assert.equal(result.word.id, w.id, theme);
        assertValidLayout(board, result.paths, theme);
        if (!ownCells) accepted++;
      }
    }
  }
  // Both cases really happen, so the checks above are exercised
  assert.ok(accepted > 0, 'some word was accepted on another path');
  assert.ok(rejected > 0, 'some path was rejected');
});

test('getPuzzle returns the same untouched board every time', () => {
  assert.equal(getPuzzle(1), getPuzzle(1));
});
