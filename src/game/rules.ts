import { STAGE_PUZZLES, type CrosswordPuzzle, type WordClue } from './puzzles.ts';

export const HINT_LETTER_COST = 50;
export const HINT_WORD_COST = 100;
export const INITIAL_CURRENCY = 300;

export interface GridCell {
  row: number;
  col: number;
  isPlayable: boolean;
  solution: string;
  userInput: string;
  clueNumber?: number;
  acrossWordId?: string;
  downWordId?: string;
  isSolvedLocked: boolean;
  isHintRevealed: boolean;
  isWrongAlert: boolean;
}

export interface StrokePoint {
  x: number;
  y: number;
}

export type Stroke = StrokePoint[];

export function buildCrosswordGrid(puzzle: CrosswordPuzzle): GridCell[][] {
  const grid: GridCell[][] = Array.from({ length: puzzle.size }, (_, r) =>
    Array.from({ length: puzzle.size }, (_, c) => ({
      row: r,
      col: c,
      isPlayable: false,
      solution: '',
      userInput: '',
      isSolvedLocked: false,
      isHintRevealed: false,
      isWrongAlert: false,
    }))
  );

  for (const word of puzzle.words) {
    const chars = Array.from(word.answer);
    for (let i = 0; i < chars.length; i++) {
      const r = word.direction === 'across' ? word.row : word.row + i;
      const c = word.direction === 'across' ? word.col + i : word.col;

      if (r < 0 || r >= puzzle.size || c < 0 || c >= puzzle.size) {
        throw new Error(`Word ${word.id} (${word.answer}) out of bounds at (${r}, ${c})`);
      }

      const cell = grid[r][c];
      if (cell.isPlayable && cell.solution !== chars[i]) {
        throw new Error(
          `Intersection conflict at (${r}, ${c}): "${cell.solution}" vs "${chars[i]}" in puzzle ${puzzle.id}`
        );
      }

      cell.isPlayable = true;
      cell.solution = chars[i];
      if (i === 0 && cell.clueNumber === undefined) {
        cell.clueNumber = word.number;
      }
      if (word.direction === 'across') {
        cell.acrossWordId = word.id;
      } else {
        cell.downWordId = word.id;
      }
    }
  }

  return grid;
}

export function getWordCells(word: WordClue): Array<{ row: number; col: number }> {
  const length = Array.from(word.answer).length;
  return Array.from({ length }, (_, i) => ({
    row: word.direction === 'across' ? word.row : word.row + i,
    col: word.direction === 'across' ? word.col + i : word.col,
  }));
}

export function evaluateWordState(
  grid: GridCell[][],
  word: WordClue
): { isFilled: boolean; isCorrect: boolean } {
  const coords = getWordCells(word);
  let isFilled = true;
  let isCorrect = true;

  for (const { row, col } of coords) {
    const cell = grid[row]?.[col];
    if (!cell || !cell.userInput) {
      isFilled = false;
      isCorrect = false;
    } else if (cell.userInput !== cell.solution) {
      isCorrect = false;
    }
  }

  return { isFilled, isCorrect };
}

export function isPuzzleComplete(grid: GridCell[][], puzzle: CrosswordPuzzle): boolean {
  return puzzle.words.every((w) => evaluateWordState(grid, w).isCorrect);
}

export function applyCellInput(
  grid: GridCell[][],
  puzzle: CrosswordPuzzle,
  solvedWordIds: Set<string>,
  row: number,
  col: number,
  char: string
): {
  nextGrid: GridCell[][];
  newlySolvedWords: WordClue[];
  wrongWordsTriggered: WordClue[];
  isCharCorrect: boolean;
  rewardEarned: number;
} {
  const nextGrid = grid.map((r) => r.map((c) => ({ ...c })));
  const target = nextGrid[row]?.[col];

  if (!target || !target.isPlayable || target.isSolvedLocked) {
    return {
      nextGrid,
      newlySolvedWords: [],
      wrongWordsTriggered: [],
      isCharCorrect: false,
      rewardEarned: 0,
    };
  }

  const trimmed = char.trim().slice(0, 1);
  target.userInput = trimmed;

  const isCharCorrect = trimmed.length > 0 && trimmed === target.solution;
  target.isWrongAlert = trimmed.length > 0 && trimmed !== target.solution;

  const newlySolvedWords: WordClue[] = [];
  const wrongWordsTriggered: WordClue[] = [];

  const relatedWordIds = [target.acrossWordId, target.downWordId].filter(
    (id): id is string => Boolean(id)
  );

  for (const wordId of relatedWordIds) {
    const word = puzzle.words.find((w) => w.id === wordId);
    if (!word) continue;

    const { isFilled, isCorrect } = evaluateWordState(nextGrid, word);
    if (isCorrect && !solvedWordIds.has(word.id)) {
      newlySolvedWords.push(word);
      for (const pos of getWordCells(word)) {
        nextGrid[pos.row][pos.col].isSolvedLocked = true;
        nextGrid[pos.row][pos.col].isWrongAlert = false;
      }
    } else if (isFilled && !isCorrect) {
      wrongWordsTriggered.push(word);
      for (const pos of getWordCells(word)) {
        const cell = nextGrid[pos.row][pos.col];
        if (!cell.isSolvedLocked && cell.userInput !== cell.solution) {
          cell.isWrongAlert = true;
        }
      }
    }
  }

  const rewardEarned = newlySolvedWords.length * puzzle.wordReward;

  return {
    nextGrid,
    newlySolvedWords,
    wrongWordsTriggered,
    isCharCorrect,
    rewardEarned,
  };
}

export function canAffordHint(currency: number, type: 'letter' | 'word'): boolean {
  const cost = type === 'letter' ? HINT_LETTER_COST : HINT_WORD_COST;
  return currency >= cost;
}

export function formatTimerMMSS(totalSeconds: number): string {
  const num = Number(totalSeconds);
  const clamped = Math.max(0, Math.floor(Number.isFinite(num) ? num : 0));
  const mins = Math.floor(clamped / 60);
  const secs = clamped % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

// ============================================================================
// GENUINE HANGUL HANDWRITING RECOGNITION ENGINE
// Analyzes actual stroke geometry, 4D oriented point-cloud Chamfer distance,
// directional fields, and Jamo topology WITHOUT knowing the target answer.
// ============================================================================

const CHOSEONG_STROKES: Record<number, Stroke[]> = {
  0: [[{ x: 0.1, y: 0.2 }, { x: 0.85, y: 0.2 }, { x: 0.85, y: 0.85 }]], // ㄱ
  1: [
    [{ x: 0.05, y: 0.2 }, { x: 0.45, y: 0.2 }, { x: 0.45, y: 0.85 }],
    [{ x: 0.5, y: 0.2 }, { x: 0.9, y: 0.2 }, { x: 0.9, y: 0.85 }],
  ], // ㄲ
  2: [[{ x: 0.15, y: 0.15 }, { x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }]], // ㄴ
  3: [
    [{ x: 0.15, y: 0.18 }, { x: 0.88, y: 0.18 }],
    [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }],
  ], // ㄷ
  4: [
    [{ x: 0.1, y: 0.18 }, { x: 0.45, y: 0.18 }],
    [{ x: 0.1, y: 0.18 }, { x: 0.1, y: 0.85 }, { x: 0.45, y: 0.85 }],
    [{ x: 0.52, y: 0.18 }, { x: 0.9, y: 0.18 }],
    [{ x: 0.52, y: 0.18 }, { x: 0.52, y: 0.85 }, { x: 0.9, y: 0.85 }],
  ], // ㄸ
  5: [
    [{ x: 0.12, y: 0.15 }, { x: 0.85, y: 0.15 }, { x: 0.85, y: 0.5 }],
    [{ x: 0.12, y: 0.5 }, { x: 0.85, y: 0.5 }],
    [{ x: 0.12, y: 0.5 }, { x: 0.12, y: 0.88 }, { x: 0.88, y: 0.88 }],
  ], // ㄹ
  6: [
    [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }],
    [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }, { x: 0.85, y: 0.85 }],
    [{ x: 0.15, y: 0.85 }, { x: 0.85, y: 0.85 }],
  ], // ㅁ
  7: [
    [{ x: 0.18, y: 0.15 }, { x: 0.18, y: 0.88 }],
    [{ x: 0.82, y: 0.15 }, { x: 0.82, y: 0.88 }],
    [{ x: 0.18, y: 0.5 }, { x: 0.82, y: 0.5 }],
    [{ x: 0.18, y: 0.88 }, { x: 0.82, y: 0.88 }],
  ], // ㅂ
  8: [
    [{ x: 0.1, y: 0.15 }, { x: 0.1, y: 0.88 }],
    [{ x: 0.45, y: 0.15 }, { x: 0.45, y: 0.88 }],
    [{ x: 0.55, y: 0.15 }, { x: 0.55, y: 0.88 }],
    [{ x: 0.9, y: 0.15 }, { x: 0.9, y: 0.88 }],
    [{ x: 0.1, y: 0.52 }, { x: 0.9, y: 0.52 }],
    [{ x: 0.1, y: 0.88 }, { x: 0.9, y: 0.88 }],
  ], // ㅃ
  9: [
    [{ x: 0.5, y: 0.15 }, { x: 0.12, y: 0.85 }],
    [{ x: 0.5, y: 0.35 }, { x: 0.88, y: 0.85 }],
  ], // ㅅ
  10: [
    [{ x: 0.3, y: 0.15 }, { x: 0.08, y: 0.85 }],
    [{ x: 0.3, y: 0.4 }, { x: 0.48, y: 0.85 }],
    [{ x: 0.72, y: 0.15 }, { x: 0.52, y: 0.85 }],
    [{ x: 0.72, y: 0.4 }, { x: 0.92, y: 0.85 }],
  ], // ㅆ
  11: [
    [
      { x: 0.5, y: 0.15 },
      { x: 0.15, y: 0.5 },
      { x: 0.5, y: 0.85 },
      { x: 0.85, y: 0.5 },
      { x: 0.5, y: 0.15 },
    ],
  ], // ㅇ
  12: [
    [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }],
    [{ x: 0.5, y: 0.18 }, { x: 0.12, y: 0.88 }],
    [{ x: 0.5, y: 0.42 }, { x: 0.88, y: 0.88 }],
  ], // ㅈ
  13: [
    [{ x: 0.1, y: 0.18 }, { x: 0.9, y: 0.18 }],
    [{ x: 0.3, y: 0.18 }, { x: 0.08, y: 0.88 }],
    [{ x: 0.3, y: 0.45 }, { x: 0.48, y: 0.88 }],
    [{ x: 0.72, y: 0.18 }, { x: 0.52, y: 0.88 }],
    [{ x: 0.72, y: 0.45 }, { x: 0.92, y: 0.88 }],
  ], // ㅉ
  14: [
    [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
    [{ x: 0.15, y: 0.28 }, { x: 0.85, y: 0.28 }],
    [{ x: 0.5, y: 0.28 }, { x: 0.12, y: 0.88 }],
    [{ x: 0.5, y: 0.5 }, { x: 0.88, y: 0.88 }],
  ], // ㅊ
  15: [
    [{ x: 0.12, y: 0.18 }, { x: 0.85, y: 0.18 }, { x: 0.85, y: 0.88 }],
    [{ x: 0.12, y: 0.52 }, { x: 0.82, y: 0.52 }],
  ], // ㅋ
  16: [
    [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }],
    [{ x: 0.15, y: 0.52 }, { x: 0.82, y: 0.52 }],
    [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.88 }, { x: 0.88, y: 0.88 }],
  ], // ㅌ
  17: [
    [{ x: 0.12, y: 0.18 }, { x: 0.88, y: 0.18 }],
    [{ x: 0.32, y: 0.18 }, { x: 0.32, y: 0.85 }],
    [{ x: 0.68, y: 0.18 }, { x: 0.68, y: 0.85 }],
    [{ x: 0.1, y: 0.85 }, { x: 0.9, y: 0.85 }],
  ], // ㅍ
  18: [
    [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
    [{ x: 0.12, y: 0.26 }, { x: 0.88, y: 0.26 }],
    [
      { x: 0.5, y: 0.38 },
      { x: 0.2, y: 0.64 },
      { x: 0.5, y: 0.9 },
      { x: 0.8, y: 0.64 },
      { x: 0.5, y: 0.38 },
    ],
  ], // ㅎ
};

function getVowelType(jungIdx: number): 'right' | 'bottom' | 'mixed' {
  if ([8, 12, 13, 17, 18].includes(jungIdx)) return 'bottom';
  if ([9, 10, 11, 14, 15, 16, 19].includes(jungIdx)) return 'mixed';
  return 'right';
}

const JUNGSEONG_STROKES: Record<number, Stroke[]> = {
  0: [
    [{ x: 0.35, y: 0.08 }, { x: 0.35, y: 0.92 }],
    [{ x: 0.35, y: 0.5 }, { x: 0.88, y: 0.5 }],
  ], // ㅏ
  1: [
    [{ x: 0.25, y: 0.08 }, { x: 0.25, y: 0.92 }],
    [{ x: 0.25, y: 0.5 }, { x: 0.78, y: 0.5 }],
    [{ x: 0.78, y: 0.08 }, { x: 0.78, y: 0.92 }],
  ], // ㅐ
  2: [
    [{ x: 0.35, y: 0.08 }, { x: 0.35, y: 0.92 }],
    [{ x: 0.35, y: 0.36 }, { x: 0.88, y: 0.36 }],
    [{ x: 0.35, y: 0.64 }, { x: 0.88, y: 0.64 }],
  ], // ㅑ
  3: [
    [{ x: 0.25, y: 0.08 }, { x: 0.25, y: 0.92 }],
    [{ x: 0.25, y: 0.36 }, { x: 0.78, y: 0.36 }],
    [{ x: 0.25, y: 0.64 }, { x: 0.78, y: 0.64 }],
    [{ x: 0.78, y: 0.08 }, { x: 0.78, y: 0.92 }],
  ], // ㅒ
  4: [
    [{ x: 0.12, y: 0.5 }, { x: 0.65, y: 0.5 }],
    [{ x: 0.65, y: 0.08 }, { x: 0.65, y: 0.92 }],
  ], // ㅓ
  5: [
    [{ x: 0.08, y: 0.5 }, { x: 0.45, y: 0.5 }],
    [{ x: 0.45, y: 0.08 }, { x: 0.45, y: 0.92 }],
    [{ x: 0.82, y: 0.08 }, { x: 0.82, y: 0.92 }],
  ], // ㅔ
  6: [
    [{ x: 0.12, y: 0.36 }, { x: 0.65, y: 0.36 }],
    [{ x: 0.12, y: 0.64 }, { x: 0.65, y: 0.64 }],
    [{ x: 0.65, y: 0.08 }, { x: 0.65, y: 0.92 }],
  ], // ㅕ
  7: [
    [{ x: 0.08, y: 0.36 }, { x: 0.45, y: 0.36 }],
    [{ x: 0.08, y: 0.64 }, { x: 0.45, y: 0.64 }],
    [{ x: 0.45, y: 0.08 }, { x: 0.45, y: 0.92 }],
    [{ x: 0.82, y: 0.08 }, { x: 0.82, y: 0.92 }],
  ], // ㅖ
  8: [
    [{ x: 0.5, y: 0.12 }, { x: 0.5, y: 0.68 }],
    [{ x: 0.08, y: 0.68 }, { x: 0.92, y: 0.68 }],
  ], // ㅗ
  9: [
    [{ x: 0.32, y: 0.42 }, { x: 0.32, y: 0.72 }],
    [{ x: 0.06, y: 0.72 }, { x: 0.58, y: 0.72 }],
    [{ x: 0.72, y: 0.08 }, { x: 0.72, y: 0.92 }],
    [{ x: 0.72, y: 0.5 }, { x: 0.95, y: 0.5 }],
  ], // ㅘ
  10: [
    [{ x: 0.28, y: 0.42 }, { x: 0.28, y: 0.72 }],
    [{ x: 0.06, y: 0.72 }, { x: 0.52, y: 0.72 }],
    [{ x: 0.64, y: 0.08 }, { x: 0.64, y: 0.92 }],
    [{ x: 0.64, y: 0.5 }, { x: 0.88, y: 0.5 }],
    [{ x: 0.88, y: 0.08 }, { x: 0.88, y: 0.92 }],
  ], // ㅙ
  11: [
    [{ x: 0.35, y: 0.42 }, { x: 0.35, y: 0.72 }],
    [{ x: 0.08, y: 0.72 }, { x: 0.62, y: 0.72 }],
    [{ x: 0.78, y: 0.08 }, { x: 0.78, y: 0.92 }],
  ], // ㅚ
  12: [
    [{ x: 0.35, y: 0.12 }, { x: 0.35, y: 0.68 }],
    [{ x: 0.65, y: 0.12 }, { x: 0.65, y: 0.68 }],
    [{ x: 0.08, y: 0.68 }, { x: 0.92, y: 0.68 }],
  ], // ㅛ
  13: [
    [{ x: 0.08, y: 0.28 }, { x: 0.92, y: 0.28 }],
    [{ x: 0.5, y: 0.28 }, { x: 0.5, y: 0.88 }],
  ], // ㅜ
  14: [
    [{ x: 0.06, y: 0.58 }, { x: 0.58, y: 0.58 }],
    [{ x: 0.32, y: 0.58 }, { x: 0.32, y: 0.88 }],
    [{ x: 0.55, y: 0.48 }, { x: 0.78, y: 0.48 }],
    [{ x: 0.78, y: 0.08 }, { x: 0.78, y: 0.92 }],
  ], // ㅝ
  15: [
    [{ x: 0.06, y: 0.58 }, { x: 0.52, y: 0.58 }],
    [{ x: 0.28, y: 0.58 }, { x: 0.28, y: 0.88 }],
    [{ x: 0.48, y: 0.48 }, { x: 0.68, y: 0.48 }],
    [{ x: 0.68, y: 0.08 }, { x: 0.68, y: 0.92 }],
    [{ x: 0.88, y: 0.08 }, { x: 0.88, y: 0.92 }],
  ], // ㅞ
  16: [
    [{ x: 0.08, y: 0.58 }, { x: 0.62, y: 0.58 }],
    [{ x: 0.35, y: 0.58 }, { x: 0.35, y: 0.88 }],
    [{ x: 0.78, y: 0.08 }, { x: 0.78, y: 0.92 }],
  ], // ㅟ
  17: [
    [{ x: 0.08, y: 0.28 }, { x: 0.92, y: 0.28 }],
    [{ x: 0.35, y: 0.28 }, { x: 0.35, y: 0.88 }],
    [{ x: 0.65, y: 0.28 }, { x: 0.65, y: 0.88 }],
  ], // ㅠ
  18: [[{ x: 0.08, y: 0.5 }, { x: 0.92, y: 0.5 }]], // ㅡ
  19: [
    [{ x: 0.08, y: 0.65 }, { x: 0.65, y: 0.65 }],
    [{ x: 0.8, y: 0.08 }, { x: 0.8, y: 0.92 }],
  ], // ㅢ
  20: [[{ x: 0.5, y: 0.08 }, { x: 0.5, y: 0.92 }]], // ㅣ
};

const JONGSEONG_TO_CHOSEONG: Record<number, number> = {
  1: 0,  // ㄱ
  2: 1,  // ㄲ
  3: 0,  // ㄳ
  4: 2,  // ㄴ
  5: 2,  // ㄵ
  6: 2,  // ㄶ
  7: 3,  // ㄷ
  8: 5,  // ㄹ
  9: 5,  // ㄺ
  10: 5, // ㄻ
  11: 5, // ㄼ
  12: 5, // ㄽ
  13: 5, // ㄾ
  14: 5, // ㄿ
  15: 5, // ㅀ
  16: 6, // ㅁ
  17: 7, // ㅂ
  18: 7, // ㅄ
  19: 9, // ㅅ
  20: 10, // ㅆ
  21: 11, // ㅇ
  22: 12, // ㅈ
  23: 14, // ㅊ
  24: 15, // ㅋ
  25: 16, // ㅌ
  26: 17, // ㅍ
  27: 18, // ㅎ
};

// Compound batchim (겹받침) pair definitions: [leftChoseongIdx, rightChoseongIdx]
const COMPOUND_JONGSEONG_PAIRS: Record<number, [number, number]> = {
  3: [0, 9],   // ㄳ (ㄱ + ㅅ)
  5: [2, 12],  // ㄵ (ㄴ + ㅈ)
  6: [2, 18],  // ㄶ (ㄴ + ㅎ)
  9: [5, 0],   // ㄺ (ㄹ + ㄱ)
  10: [5, 6],  // ㄻ (ㄹ + ㅁ)
  11: [5, 7],  // ㄼ (ㄹ + ㅂ)
  12: [5, 9],  // ㄽ (ㄹ + ㅅ)
  13: [5, 16], // ㄾ (ㄹ + ㅌ)
  14: [5, 17], // ㄿ (ㄹ + ㅍ)
  15: [5, 18], // ㅀ (ㄹ + ㅎ)
  18: [7, 9],  // ㅄ (ㅂ + ㅅ)
};

function transformStrokes(
  strokes: Stroke[],
  x0: number,
  y0: number,
  x1: number,
  y1: number
): Stroke[] {
  const w = x1 - x0;
  const h = y1 - y0;
  return strokes.map((s) =>
    s.map((pt) => ({
      x: x0 + pt.x * w,
      y: y0 + pt.y * h,
    }))
  );
}

function makeCircleStroke(cx: number, cy: number, rx: number, ry: number, ccw = true): Stroke {
  const pts: StrokePoint[] = [];
  const steps = 12;
  for (let i = 0; i <= steps; i++) {
    const dir = ccw ? -1 : 1;
    const angle = -Math.PI / 2 + dir * ((i / steps) * Math.PI * 2);
    pts.push({
      x: cx + Math.cos(angle) * rx,
      y: cy + Math.sin(angle) * ry,
    });
  }
  return pts;
}

CHOSEONG_STROKES[11] = [makeCircleStroke(0.5, 0.5, 0.35, 0.35, true)]; // ㅇ: true smooth circle
CHOSEONG_STROKES[18] = [
  [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
  [{ x: 0.12, y: 0.26 }, { x: 0.88, y: 0.26 }],
  makeCircleStroke(0.5, 0.64, 0.32, 0.26, true),
]; // ㅎ: top ticks + true smooth circle

/**
 * Generates canonical normalized [0,1]x[0,1] strokes for any Hangul syllable
 */
const CHOSEONG_VARIANTS: Record<number, Stroke[][]> = {
  0: [
    // Variant 0: Standard ㄱ with slight natural inward slant
    [[{ x: 0.1, y: 0.2 }, { x: 0.85, y: 0.2 }, { x: 0.8, y: 0.85 }]],
    // Variant 1: Natural handwritten cursive ㄱ (slanted down-left like 7, no right leg)
    [[{ x: 0.12, y: 0.2 }, { x: 0.85, y: 0.2 }, { x: 0.48, y: 0.85 }]],
    // Variant 2: 2-stroke ㄱ
    [
      [{ x: 0.1, y: 0.2 }, { x: 0.85, y: 0.2 }],
      [{ x: 0.82, y: 0.2 }, { x: 0.72, y: 0.85 }],
    ],
  ],
  2: [
    [[{ x: 0.15, y: 0.15 }, { x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }]],
    [[{ x: 0.15, y: 0.15 }, { x: 0.15, y: 0.85 }], [{ x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }]],
  ], // ㄴ: 1-stroke corner or 2 strokes
  3: [
    [
      [{ x: 0.15, y: 0.18 }, { x: 0.88, y: 0.18 }],
      [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }],
    ],
    [[{ x: 0.88, y: 0.18 }, { x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }, { x: 0.9, y: 0.85 }]],
  ], // ㄷ: 2 strokes or 1-stroke bracket
  5: [
    [
      [{ x: 0.12, y: 0.15 }, { x: 0.85, y: 0.15 }, { x: 0.85, y: 0.5 }],
      [{ x: 0.12, y: 0.5 }, { x: 0.85, y: 0.5 }],
      [{ x: 0.12, y: 0.5 }, { x: 0.12, y: 0.88 }, { x: 0.88, y: 0.88 }],
    ],
    [
      [{ x: 0.12, y: 0.15 }, { x: 0.85, y: 0.15 }, { x: 0.85, y: 0.5 }],
      [{ x: 0.85, y: 0.5 }, { x: 0.12, y: 0.5 }, { x: 0.12, y: 0.88 }, { x: 0.88, y: 0.88 }],
    ],
    [
      [
        { x: 0.12, y: 0.18 },
        { x: 0.85, y: 0.18 },
        { x: 0.85, y: 0.5 },
        { x: 0.15, y: 0.5 },
        { x: 0.15, y: 0.88 },
        { x: 0.88, y: 0.88 },
      ],
    ],
  ], // ㄹ: 3 strokes standard, 2 strokes handwritten (ㄱ+ㄷ), or 1-stroke cursive
  6: [
    [
      [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }],
      [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }, { x: 0.85, y: 0.85 }],
      [{ x: 0.15, y: 0.85 }, { x: 0.85, y: 0.85 }],
    ],
    [
      [{ x: 0.15, y: 0.18 }, { x: 0.15, y: 0.85 }, { x: 0.85, y: 0.85 }],
      [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }, { x: 0.85, y: 0.85 }],
    ],
  ], // ㅁ: 3 strokes standard or 2 strokes (ㄴ + ㄱ)
  7: [
    [
      [{ x: 0.18, y: 0.15 }, { x: 0.18, y: 0.88 }],
      [{ x: 0.82, y: 0.15 }, { x: 0.82, y: 0.88 }],
      [{ x: 0.18, y: 0.5 }, { x: 0.82, y: 0.5 }],
      [{ x: 0.18, y: 0.88 }, { x: 0.82, y: 0.88 }],
    ],
    [
      [{ x: 0.18, y: 0.15 }, { x: 0.18, y: 0.88 }, { x: 0.82, y: 0.88 }, { x: 0.82, y: 0.15 }],
      [{ x: 0.18, y: 0.5 }, { x: 0.82, y: 0.5 }],
    ],
  ], // ㅂ: 4 strokes standard or 2 strokes
  9: [
    [
      [{ x: 0.5, y: 0.15 }, { x: 0.12, y: 0.85 }],
      [{ x: 0.5, y: 0.35 }, { x: 0.88, y: 0.85 }],
    ],
    [
      [{ x: 0.55, y: 0.15 }, { x: 0.12, y: 0.85 }],
      [{ x: 0.42, y: 0.45 }, { x: 0.88, y: 0.85 }],
    ],
  ], // ㅅ: 2 strokes
  11: [
    [makeCircleStroke(0.5, 0.5, 0.35, 0.35, true)],
    [makeCircleStroke(0.5, 0.5, 0.35, 0.35, false)],
  ], // ㅇ: counter-clockwise and clockwise smooth circle
  12: [
    // Variant 0: 2-stroke handwritten ㅈ (top-bar + / as 1 bent stroke, then \ leg)
    [
      [{ x: 0.15, y: 0.18 }, { x: 0.82, y: 0.18 }, { x: 0.14, y: 0.88 }],
      [{ x: 0.48, y: 0.46 }, { x: 0.88, y: 0.88 }],
    ],
    // Variant 1: 3-stroke printed ㅈ (horizontal bar, / leg, \ leg)
    [
      [{ x: 0.15, y: 0.18 }, { x: 0.85, y: 0.18 }],
      [{ x: 0.52, y: 0.18 }, { x: 0.12, y: 0.88 }],
      [{ x: 0.48, y: 0.44 }, { x: 0.88, y: 0.88 }],
    ],
  ], // ㅈ
  14: [
    // Variant 0: 3-stroke handwritten ㅊ (top tick, bent 7-stroke, \ leg)
    [
      [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
      [{ x: 0.15, y: 0.28 }, { x: 0.82, y: 0.28 }, { x: 0.14, y: 0.88 }],
      [{ x: 0.48, y: 0.52 }, { x: 0.88, y: 0.88 }],
    ],
    // Variant 1: 4-stroke printed ㅊ
    [
      [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
      [{ x: 0.15, y: 0.28 }, { x: 0.85, y: 0.28 }],
      [{ x: 0.5, y: 0.28 }, { x: 0.12, y: 0.88 }],
      [{ x: 0.5, y: 0.5 }, { x: 0.88, y: 0.88 }],
    ],
  ], // ㅊ
  18: [
    [
      [{ x: 0.35, y: 0.08 }, { x: 0.65, y: 0.08 }],
      [{ x: 0.12, y: 0.26 }, { x: 0.88, y: 0.26 }],
      makeCircleStroke(0.5, 0.64, 0.32, 0.26, true),
    ],
    [
      [{ x: 0.15, y: 0.22 }, { x: 0.85, y: 0.22 }],
      makeCircleStroke(0.5, 0.64, 0.32, 0.26, true),
    ],
  ], // ㅎ: 3 strokes or 2 strokes with smooth circle
};

// Dedicated Jongseong (batchim) stroke variants so batchim 'ㄱ' stays crisp and compound batchims (겹받침) include both consonants
function getJongseongTemplateStrokes(jongIdx: number, variantIndex: number): Stroke[] | null {
  if (jongIdx === 0) return null;

  const compoundPair = COMPOUND_JONGSEONG_PAIRS[jongIdx];
  if (compoundPair) {
    const [leftCho, rightCho] = compoundPair;
    const leftBase = CHOSEONG_STROKES[leftCho] || CHOSEONG_STROKES[0];
    const rightBase = CHOSEONG_STROKES[rightCho] || CHOSEONG_STROKES[0];
    return [
      ...transformStrokes(leftBase, 0.04, 0.08, 0.47, 0.92),
      ...transformStrokes(rightBase, 0.53, 0.08, 0.96, 0.92),
    ];
  }

  // Batchim 'ㄱ' is written as a right-hand corner (not an extreme left-slanted '7')
  if (jongIdx === 1) {
    if (variantIndex === 2) {
      return [
        [{ x: 0.12, y: 0.18 }, { x: 0.86, y: 0.18 }],
        [{ x: 0.82, y: 0.18 }, { x: 0.78, y: 0.88 }],
      ];
    }
    if (variantIndex === 1) {
      return [[{ x: 0.12, y: 0.18 }, { x: 0.86, y: 0.18 }, { x: 0.72, y: 0.88 }]];
    }
    return [[{ x: 0.12, y: 0.18 }, { x: 0.86, y: 0.18 }, { x: 0.82, y: 0.88 }]];
  }

  const jongChoIdx = JONGSEONG_TO_CHOSEONG[jongIdx];
  if (jongChoIdx === undefined) return null;

  const variants = CHOSEONG_VARIANTS[jongChoIdx];
  if (variants) {
    return variants[variantIndex] || variants[0];
  }
  return CHOSEONG_STROKES[jongChoIdx] || null;
}

/**
 * Generates canonical normalized [0,1]x[0,1] strokes for any Hangul syllable.
 * variantIndex:
 *   0 = standard balanced layout
 *   1 = natural human handwritten layout (larger upper block + compact centered batchim underneath)
 *   2 = multi-stroke / wide batchim layout
 */
export function buildCanonicalSyllableStrokes(
  syllable: string,
  variantIndex: number = 0
): Stroke[] {
  const code = syllable.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return [];

  const choIdx = Math.floor(code / (21 * 28));
  const jungIdx = Math.floor((code % (21 * 28)) / 28);
  const jongIdx = code % 28;

  const choVariants = CHOSEONG_VARIANTS[choIdx];
  const choTemplate =
    choVariants && choVariants[variantIndex]
      ? choVariants[variantIndex]
      : choVariants && choVariants[0]
      ? choVariants[0]
      : CHOSEONG_STROKES[choIdx] || CHOSEONG_STROKES[0];

  const jungTemplate = JUNGSEONG_STROKES[jungIdx] || JUNGSEONG_STROKES[0];
  const jongTemplate = getJongseongTemplateStrokes(jongIdx, variantIndex);

  const vType = getVowelType(jungIdx);
  const hasBatchim = jongTemplate !== null;

  const result: Stroke[] = [];

  if (vType === 'right') {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.06, 0.14, 0.48, 0.84));
      result.push(...transformStrokes(jungTemplate, 0.5, 0.08, 0.94, 0.92));
    } else if (variantIndex === 1) {
      // Natural human handwriting: taller upper Choseong+Jungseong, compact centered Batchim
      result.push(...transformStrokes(choTemplate, 0.06, 0.06, 0.48, 0.58));
      result.push(...transformStrokes(jungTemplate, 0.52, 0.06, 0.94, 0.62));
      result.push(...transformStrokes(jongTemplate!, 0.24, 0.64, 0.76, 0.94));
    } else if (variantIndex === 2) {
      result.push(...transformStrokes(choTemplate, 0.06, 0.06, 0.48, 0.52));
      result.push(...transformStrokes(jungTemplate, 0.52, 0.06, 0.94, 0.56));
      result.push(...transformStrokes(jongTemplate!, 0.16, 0.58, 0.84, 0.94));
    } else {
      result.push(...transformStrokes(choTemplate, 0.06, 0.06, 0.48, 0.53));
      result.push(...transformStrokes(jungTemplate, 0.52, 0.06, 0.94, 0.57));
      result.push(...transformStrokes(jongTemplate!, 0.2, 0.6, 0.8, 0.94));
    }
  } else if (vType === 'bottom') {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.16, 0.08, 0.84, 0.52));
      result.push(...transformStrokes(jungTemplate, 0.08, 0.56, 0.92, 0.92));
    } else if (variantIndex === 1) {
      result.push(...transformStrokes(choTemplate, 0.2, 0.05, 0.8, 0.41));
      result.push(...transformStrokes(jungTemplate, 0.08, 0.44, 0.92, 0.67));
      result.push(...transformStrokes(jongTemplate!, 0.24, 0.7, 0.76, 0.95));
    } else {
      result.push(...transformStrokes(choTemplate, 0.2, 0.05, 0.8, 0.38));
      result.push(...transformStrokes(jungTemplate, 0.08, 0.42, 0.92, 0.65));
      result.push(...transformStrokes(jongTemplate!, 0.2, 0.68, 0.8, 0.95));
    }
  } else {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.08, 0.08, 0.52, 0.46));
      result.push(...transformStrokes(jungTemplate, 0.06, 0.08, 0.94, 0.92));
    } else if (variantIndex === 1) {
      result.push(...transformStrokes(choTemplate, 0.08, 0.06, 0.52, 0.42));
      result.push(...transformStrokes(jungTemplate, 0.06, 0.06, 0.94, 0.62));
      result.push(...transformStrokes(jongTemplate!, 0.24, 0.65, 0.76, 0.94));
    } else {
      result.push(...transformStrokes(choTemplate, 0.08, 0.06, 0.52, 0.38));
      result.push(...transformStrokes(jungTemplate, 0.06, 0.06, 0.94, 0.58));
      result.push(...transformStrokes(jongTemplate!, 0.2, 0.62, 0.8, 0.94));
    }
  }

  return result;
}

interface OrientedSample {
  x: number;
  y: number;
  horiz: number;     // horizontal energy (ㅡ)
  vert: number;      // vertical energy (ㅣ)
  slash: number;     // down-left / up-right diagonal energy (/)
  backslash: number; // down-right / up-left diagonal energy (\)
}

interface StrokeDescriptor {
  strokeCount: number;
  totalLength: number;
  samples: OrientedSample[];
  densityGrid: number[];   // 8x8 = 64 cells with Gaussian blur
  horizGrid: number[];     // 4x4 = 16 cells
  vertGrid: number[];      // 4x4 = 16 cells
  slashGrid: number[];     // 4x4 = 16 cells (/)
  backslashGrid: number[]; // 4x4 = 16 cells (\)
  topLoop: number;
  bottomLoop: number;
  rightVertEnergy: number;
  bottomHorizEnergy: number;
  bottomInkRatio: number;
  leftBackslashEnergy: number;   // '\' energy in Choseong region
  leftSlashEnergy: number;       // '/' energy in Choseong region
  leftBottomHorizEnergy: number; // bottom horizontal bar in Choseong
  leftVertEnergy: number;        // left vertical bar in Choseong
  hasChoseongBackslashLeg: boolean; // explicit '\' sub-stroke in Choseong (ㅈ, ㅉ, ㅊ, ㅅ, ㅆ)
  hasChoseongSlashLeg: boolean;     // explicit '/' sub-stroke in Choseong (ㅈ, ㅉ, ㅊ, ㅅ, ㅆ, or slanted ㄱ)
  choseongTopBarCount: number;      // number of top horizontal/tick sub-strokes in Choseong
  // Dedicated Batchim (Jongseong) & Upper-Block Sub-Descriptors
  hasDetectedBatchim: boolean;
  batchimStrokeCount: number;
  batchimHorizGrid: number[];       // 3x3 = 9 cells in local batchim box
  batchimVertGrid: number[];        // 3x3 = 9 cells in local batchim box
  batchimDensityGrid: number[];     // 4x4 = 16 cells in local batchim box
  batchimSlashRatio: number;
  batchimBackslashRatio: number;
  batchimSamples: OrientedSample[]; // 16 samples in local batchim box
  upperDensityGrid: number[];       // 6x6 = 36 cells in local upper box
  upperHorizGrid: number[];         // 4x4 = 16 cells in local upper box
  upperVertGrid: number[];          // 4x4 = 16 cells in local upper box
  upperSlashGrid: number[];         // 4x4 = 16 cells in local upper box
  upperBackslashGrid: number[];     // 4x4 = 16 cells in local upper box
  upperSamples: OrientedSample[];   // 24 samples in local upper box
}

/**
 * Smooths raw canvas strokes (which may have 30-80 noisy points per stroke)
 * into clean, jitter-free polylines while preserving sharp corners and endpoints.
 */
function smoothStrokePoints(stroke: Stroke): Stroke {
  if (stroke.length <= 3) return stroke;

  // 1. Subsample points that are too close together (< 0.02 in unit box)
  const filtered: StrokePoint[] = [stroke[0]];
  for (let i = 1; i < stroke.length - 1; i++) {
    const prev = filtered[filtered.length - 1];
    if (Math.hypot(stroke[i].x - prev.x, stroke[i].y - prev.y) >= 0.02) {
      filtered.push(stroke[i]);
    }
  }
  filtered.push(stroke[stroke.length - 1]);

  if (filtered.length <= 3) return filtered;

  // 2. Corner-preserving 3-point smoothing pass
  const smoothed: StrokePoint[] = [filtered[0]];
  for (let i = 1; i < filtered.length - 1; i++) {
    const pPrev = filtered[i - 1];
    const pCur = filtered[i];
    const pNext = filtered[i + 1];

    const v1x = pCur.x - pPrev.x;
    const v1y = pCur.y - pPrev.y;
    const v2x = pNext.x - pCur.x;
    const v2y = pNext.y - pCur.y;
    const l1 = Math.hypot(v1x, v1y);
    const l2 = Math.hypot(v2x, v2y);

    if (l1 > 0.005 && l2 > 0.005) {
      const cosAngle = (v1x * v2x + v1y * v2y) / (l1 * l2);
      // Preserve sharp corners (turn angle > ~45 deg)
      if (cosAngle < 0.7) {
        smoothed.push(pCur);
        continue;
      }
    }

    smoothed.push({
      x: pPrev.x * 0.22 + pCur.x * 0.56 + pNext.x * 0.22,
      y: pPrev.y * 0.22 + pCur.y * 0.56 + pNext.y * 0.22,
    });
  }
  smoothed.push(filtered[filtered.length - 1]);
  return smoothed;
}

function normalizeStrokesToUnitBox(strokes: Stroke[]): Stroke[] {
  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let count = 0;

  for (const s of strokes) {
    for (const pt of s) {
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
      count++;
    }
  }

  if (count === 0) return [];

  const spanX = maxX - minX;
  const spanY = maxY - minY;
  const maxSpan = Math.max(spanX, spanY, 1);
  const effSpanX = spanX < maxSpan * 0.28 ? maxSpan : spanX * 0.78 + maxSpan * 0.22;
  const effSpanY = spanY < maxSpan * 0.28 ? maxSpan : spanY * 0.78 + maxSpan * 0.22;

  const cx = (minX + maxX) / 2;
  const cy = (minY + maxY) / 2;

  return strokes.map((s) =>
    smoothStrokePoints(
      s.map((pt) => ({
        x: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.x - cx) / effSpanX) * 0.84)),
        y: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.y - cy) / effSpanY) * 0.84)),
      }))
    )
  );
}

/**
 * Detects whether a single stroke is a true closed circular loop (circle 'ㅇ')
 * vs an open bent stroke ('ㄱ', 'ㅈ', 'ㄷ', 'ㄹ') or axis-aligned box ('ㅁ').
 * Requires substantial travel in all 4 directions (+x, -x, +y, -y) plus diagonal curvature.
 */
function isTrueClosedLoopStroke(stroke: Stroke, strokeLen: number): boolean {
  if (stroke.length < 4 || strokeLen < 0.22) return false;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;
  let rightTravel = 0;
  let leftTravel = 0;
  let downTravel = 0;
  let upTravel = 0;
  let diagTravel = 0;

  for (let i = 0; i < stroke.length; i++) {
    const pt = stroke[i];
    if (pt.x < minX) minX = pt.x;
    if (pt.x > maxX) maxX = pt.x;
    if (pt.y < minY) minY = pt.y;
    if (pt.y > maxY) maxY = pt.y;

    if (i > 0) {
      const dx = pt.x - stroke[i - 1].x;
      const dy = pt.y - stroke[i - 1].y;
      const segLen = Math.hypot(dx, dy);
      if (dx > 0) rightTravel += dx;
      else leftTravel += -dx;
      if (dy > 0) downTravel += dy;
      else upTravel += -dy;
      if (segLen > 0.0005) {
        const ux = Math.abs(dx / segLen);
        const uy = Math.abs(dy / segLen);
        diagTravel += segLen * (2 * ux * uy);
      }
    }
  }

  const boxW = maxX - minX;
  const boxH = maxY - minY;
  if (boxW < 0.07 || boxH < 0.07) return false;

  // A true closed loop must travel across its width in both +x and -x,
  // AND across its height in both +y and -y (an open '7' stroke in ㄱ/ㅈ never travels back up!).
  if (
    rightTravel < boxW * 0.45 ||
    leftTravel < boxW * 0.45 ||
    downTravel < boxH * 0.45 ||
    upTravel < boxH * 0.42
  ) {
    return false;
  }

  // Must have circular/diagonal curvature (distinguishes circle 'ㅇ' from axis-aligned box 'ㅁ')
  if (diagTravel < strokeLen * 0.20) return false;

  const endDist = Math.hypot(
    stroke[stroke.length - 1].x - stroke[0].x,
    stroke[stroke.length - 1].y - stroke[0].y
  );
  const diag = Math.hypot(boxW, boxH);

  // Endpoints must close near the start point relative to the loop's own bounding box
  if (endDist > diag * 0.58 || endDist > strokeLen * 0.35) return false;

  return true;
}

/**
 * Splits a stroke at sharp corners (turn angle > ~50 deg) into straight sub-strokes
 * so we can inspect individual segments of connected strokes (like '7' in ㄱ or ㅈ).
 */
function splitStrokeAtCorners(stroke: Stroke): Array<{ start: StrokePoint; end: StrokePoint }> {
  if (stroke.length < 2) return [];
  if (stroke.length === 2) {
    return [{ start: stroke[0], end: stroke[1] }];
  }

  const subStrokes: Array<{ start: StrokePoint; end: StrokePoint }> = [];
  let segStart = stroke[0];

  for (let i = 1; i < stroke.length - 1; i++) {
    const prev = segStart;
    const cur = stroke[i];
    const next = stroke[i + 1];

    const v1x = cur.x - prev.x;
    const v1y = cur.y - prev.y;
    const v2x = next.x - cur.x;
    const v2y = next.y - cur.y;
    const l1 = Math.hypot(v1x, v1y);
    const l2 = Math.hypot(v2x, v2y);

    if (l1 > 0.04 && l2 > 0.025) {
      const cosAngle = (v1x * v2x + v1y * v2y) / (l1 * l2);
      if (cosAngle < 0.55) {
        subStrokes.push({ start: segStart, end: cur });
        segStart = cur;
      }
    }
  }

  subStrokes.push({ start: segStart, end: stroke[stroke.length - 1] });
  return subStrokes;
}

interface SegmentInfo {
  p0: StrokePoint;
  p1: StrokePoint;
  dx: number;
  dy: number;
  len: number;
  horiz: number;
  vert: number;
  slash: number;
  backslash: number;
}

function sampleUniformAlongSegments(segments: SegmentInfo[], totalLen: number, count: number): OrientedSample[] {
  if (segments.length === 0 || totalLen <= 0.0005) return [];
  const samples: OrientedSample[] = [];
  let accumulated = 0;
  let segIdx = 0;

  for (let sIdx = 0; sIdx < count; sIdx++) {
    const targetDist = ((sIdx + 0.5) / count) * totalLen;
    while (
      segIdx < segments.length - 1 &&
      accumulated + segments[segIdx].len < targetDist
    ) {
      accumulated += segments[segIdx].len;
      segIdx++;
    }
    const curSeg = segments[segIdx];
    const remainingDist = Math.max(0, targetDist - accumulated);
    const segT = curSeg.len > 0 ? Math.min(1, remainingDist / curSeg.len) : 0;

    samples.push({
      x: curSeg.p0.x + curSeg.dx * segT,
      y: curSeg.p0.y + curSeg.dy * segT,
      horiz: curSeg.horiz,
      vert: curSeg.vert,
      slash: curSeg.slash,
      backslash: curSeg.backslash,
    });
  }
  return samples;
}

function normalizeVec(arr: number[]): number[] {
  let sumSq = 0;
  for (let i = 0; i < arr.length; i++) {
    sumSq += arr[i] * arr[i];
  }
  const normVal = Math.sqrt(sumSq) || 1;
  for (let i = 0; i < arr.length; i++) {
    arr[i] /= normVal;
  }
  return arr;
}

export function extractDescriptor(rawStrokes: Stroke[]): StrokeDescriptor {
  const norm = normalizeStrokesToUnitBox(rawStrokes);
  const densityGrid = new Array(64).fill(0);   // 8x8 grid
  const horizGrid = new Array(16).fill(0);     // 4x4
  const vertGrid = new Array(16).fill(0);      // 4x4
  const slashGrid = new Array(16).fill(0);     // 4x4 (/)
  const backslashGrid = new Array(16).fill(0); // 4x4 (\)

  let topLoop = 0;
  let bottomLoop = 0;
  let rightVertEnergy = 0;
  let bottomHorizEnergy = 0;
  let bottomInkLength = 0;
  let leftBackslashEnergy = 0;
  let leftSlashEnergy = 0;
  let leftBottomHorizEnergy = 0;
  let leftVertEnergy = 0;
  let hasChoseongBackslashLeg = false;
  let hasChoseongSlashLeg = false;
  let choseongTopBarCount = 0;
  let totalLen = 0.001;

  // Step 1: Analyze per-stroke geometry so we can cleanly separate Upper Block (Choseong+Jungseong) from Lower Block (Batchim)
  interface StrokeStat {
    stroke: Stroke;
    index: number;
    minX: number;
    maxX: number;
    minY: number;
    maxY: number;
    meanX: number;
    meanY: number;
    len: number;
    horizLen: number;
    vertLen: number;
    diagLen: number;
    isLoop: boolean;
  }

  const strokeStats: StrokeStat[] = [];
  for (let sIdx = 0; sIdx < norm.length; sIdx++) {
    const stroke = norm[sIdx];
    if (stroke.length === 0) continue;

    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    let sumX = 0;
    let sumY = 0;
    let len = 0;
    let horizLen = 0;
    let vertLen = 0;
    let diagLen = 0;

    for (let i = 0; i < stroke.length; i++) {
      const pt = stroke[i];
      if (pt.x < minX) minX = pt.x;
      if (pt.x > maxX) maxX = pt.x;
      if (pt.y < minY) minY = pt.y;
      if (pt.y > maxY) maxY = pt.y;
      sumX += pt.x;
      sumY += pt.y;

      if (i > 0) {
        const dx = pt.x - stroke[i - 1].x;
        const dy = pt.y - stroke[i - 1].y;
        const segLen = Math.hypot(dx, dy);
        len += segLen;
        if (segLen > 0.0005) {
          const ux = dx / segLen;
          const uy = dy / segLen;
          horizLen += segLen * (ux * ux);
          vertLen += segLen * (uy * uy);
          diagLen += segLen * (2 * Math.abs(ux * uy));
        }
      }
    }

    const meanX = sumX / stroke.length;
    const meanY = sumY / stroke.length;
    const isLoop = isTrueClosedLoopStroke(stroke, len);

    strokeStats.push({
      stroke,
      index: sIdx,
      minX,
      maxX,
      minY,
      maxY,
      meanX,
      meanY,
      len,
      horizLen,
      vertLen,
      diagLen,
      isLoop,
    });
  }

  // Check if there is a wide middle horizontal vowel bar (ㅗ, ㅛ, ㅜ, ㅠ, ㅡ in a bottom-vowel syllable)
  let midVowelBarY: number | null = null;
  for (const st of strokeStats) {
    const width = st.maxX - st.minX;
    const height = st.maxY - st.minY;
    if (
      st.len > 0.35 &&
      st.horizLen > st.len * 0.78 &&
      width > 0.60 &&
      st.minX < 0.21 &&
      st.maxX > 0.79 &&
      height < 0.15 &&
      st.meanY >= 0.24 &&
      st.meanY <= 0.96
    ) {
      if (midVowelBarY === null || st.meanY < midVowelBarY) {
        midVowelBarY = st.meanY;
      }
    }
  }

  // Check if there is a full-height vertical vowel stem on the right side (e.g. '가', '자', '하', '지').
  // When a right-vowel syllable has a batchim, the right vertical stem stops in the middle (maxY <= 0.74)
  // to leave room for the batchim underneath.
  let hasFullHeightRightVowelStem = false;
  for (const st of strokeStats) {
    if (
      st.meanX > 0.52 &&
      st.vertLen > st.len * 0.75 &&
      st.minY < 0.28 &&
      st.maxY > 0.76
    ) {
      hasFullHeightRightVowelStem = true;
      break;
    }
  }

  // Identify candidate batchim strokes at the bottom of the syllable
  const candidateBatchimIndices = new Set<number>();
  if (!hasFullHeightRightVowelStem) {
    for (const st of strokeStats) {
      if (midVowelBarY !== null) {
        // In bottom-vowel syllables, batchim strokes lie below the wide horizontal vowel bar
        // (Exclude pure vertical stem of ㅜ/ㅠ that starts right on midVowelBarY and ends above 0.73)
        const isWooVerticalTick =
          st.vertLen > st.len * 0.80 &&
          st.maxX - st.minX < 0.09 &&
          Math.abs(st.minY - midVowelBarY) < 0.06 &&
          st.maxY < 0.73;

        if (
          !isWooVerticalTick &&
          st.minY >= midVowelBarY - 0.03 &&
          st.meanY >= midVowelBarY + 0.07
        ) {
          candidateBatchimIndices.add(st.index);
        }
      } else {
        // In right-vowel or mixed-vowel syllables, batchim strokes start in the lower half (minY >= 0.42, meanY >= 0.53)
        // Exclude short right-only vowel ticks (like the second tick of ㅑ/ㅕ)
        const isRightVowelTick =
          st.minX > 0.50 && st.maxY < 0.66 && st.horizLen > st.len * 0.72;
        if (!isRightVowelTick && st.minY >= 0.42 && st.meanY >= 0.53) {
          candidateBatchimIndices.add(st.index);
        }
      }
    }
  }

  // Validate whether candidateBatchimIndices form a true centered Batchim (Jongseong)
  // (Must leave at least 1 stroke in the upper block, span across center x, and not be just a vertical line of ㅜ/ㅠ or a single '\' leg)
  let hasDetectedBatchim = false;
  if (
    candidateBatchimIndices.size > 0 &&
    candidateBatchimIndices.size < strokeStats.length
  ) {
    let bMinX = Infinity;
    let bMaxX = -Infinity;
    let bLen = 0;
    let bHorizLen = 0;
    let bSlashLen = 0;
    let bBackslashLen = 0;
    let bHasLoop = false;

    for (const st of strokeStats) {
      if (!candidateBatchimIndices.has(st.index)) continue;
      if (st.minX < bMinX) bMinX = st.minX;
      if (st.maxX > bMaxX) bMaxX = st.maxX;
      bLen += st.len;
      bHorizLen += st.horizLen;
      if (st.isLoop) bHasLoop = true;
      for (let i = 1; i < st.stroke.length; i++) {
        const dx = st.stroke[i].x - st.stroke[i - 1].x;
        const dy = st.stroke[i].y - st.stroke[i - 1].y;
        const sLen = Math.hypot(dx, dy);
        if (sLen > 0.0005) {
          const ux = dx / sLen;
          const uy = dy / sLen;
          const diag = 2 * Math.abs(ux * uy);
          if (ux * uy < 0) bSlashLen += sLen * diag;
          else bBackslashLen += sLen * diag;
        }
      }
    }

    const hasValidBatchimShape =
      bHorizLen > bLen * 0.15 ||
      bHasLoop ||
      (bSlashLen > bLen * 0.10 && bBackslashLen > bLen * 0.10);

    if (
      bMinX < 0.54 &&
      bMaxX > 0.48 &&
      bLen > 0.14 &&
      hasValidBatchimShape
    ) {
      hasDetectedBatchim = true;
    }
  }

  if (!hasDetectedBatchim) {
    candidateBatchimIndices.clear();
  }

  // Determine the vertical ceiling of the Choseong region so batchim strokes never contaminate Choseong features
  const choMaxY = hasDetectedBatchim || midVowelBarY !== null ? 0.56 : 0.86;
  const allSegments: SegmentInfo[] = [];

  for (const st of strokeStats) {
    const { stroke, meanX, meanY, maxX, isLoop } = st;
    const isBatchimStroke = candidateBatchimIndices.has(st.index);

    if (isLoop) {
      // If it belongs to the batchim (or is centered in the lower half), it's a bottomLoop (batchim 'ㅇ').
      // Otherwise (upper half, or left-column circle in '하'/'허'/'히'), it's a topLoop (Choseong 'ㅇ'/'ㅎ').
      if (isBatchimStroke || (meanY >= 0.58 && !(meanX < 0.36 && maxX < 0.50))) {
        bottomLoop += 1;
      } else {
        topLoop += 1;
      }
    } else if (!isBatchimStroke) {
      // Inspect corner-split sub-strokes for non-loop strokes in the Choseong region
      // Note: Vowels NEVER have diagonal strokes, so in bottom-vowel syllables (where Choseong is centered at top y < 0.48),
      // we allow midX up to 0.86 when midY < 0.46!
      const subStrokes = splitStrokeAtCorners(stroke);
      for (const sub of subStrokes) {
        const sdx = sub.end.x - sub.start.x;
        const sdy = sub.end.y - sub.start.y;
        const slen = Math.hypot(sdx, sdy);
        const midX = (sub.start.x + sub.end.x) * 0.5;
        const midY = (sub.start.y + sub.end.y) * 0.5;

        if (slen < 0.045) continue;

        const inLeftChoseong = midX < 0.56 && midY < choMaxY;
        const inTopCenteredChoseong =
          midVowelBarY !== null && midY < Math.min(0.48, midVowelBarY - 0.02) && midX < 0.84;

        if (inLeftChoseong || inTopCenteredChoseong) {
          // 1. Top horizontal bar or top tick in Choseong (ㅡ at top of ㄱ, ㄷ, ㅈ, ㅊ, ㅎ, etc.)
          if (Math.abs(sdx) > Math.abs(sdy) * 1.45 && midY < 0.42 && slen > 0.055) {
            choseongTopBarCount += 1;
          }
          // 2. Down-right '\' leg in Choseong (present in ㅅ, ㅆ, ㅈ, ㅉ, ㅊ; absent in ㄱ, ㄴ, ㄷ, ㅋ, ㅌ)
          const minLegStartY = hasDetectedBatchim || midVowelBarY !== null ? 0.08 : 0.15;
          const minLegMidY = hasDetectedBatchim || midVowelBarY !== null ? 0.14 : 0.25;
          if (
            sdx > 0.04 &&
            sdy > 0.045 &&
            sdy > sdx * 0.26 &&
            sdx > sdy * 0.22 &&
            sub.start.y > minLegStartY &&
            midY > minLegMidY
          ) {
            hasChoseongBackslashLeg = true;
          }
          // 3. Down-left '/' leg in Choseong
          if (sdx < -0.04 && sdy > 0.055 && Math.abs(sdx) > sdy * 0.18) {
            hasChoseongSlashLeg = true;
          }
        }
      }
    }

    for (let i = 1; i < stroke.length; i++) {
      const p0 = stroke[i - 1];
      const p1 = stroke[i];
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const segLen = Math.hypot(dx, dy);
      if (segLen < 0.0005) continue;

      totalLen += segLen;
      const ux = dx / segLen;
      const uy = dy / segLen;
      const absDx = Math.abs(ux);
      const absDy = Math.abs(uy);

      // Continuous steerable orientation channels:
      const horiz = ux * ux;
      const vert = uy * uy;
      const diagEnergy = 2 * absDx * absDy;
      const isSlash = ux * uy < 0;
      const slash = isSlash ? diagEnergy : 0;
      const backslash = !isSlash ? diagEnergy : 0;

      allSegments.push({ p0, p1, dx, dy, len: segLen, horiz, vert, slash, backslash });

      const midY = (p0.y + p1.y) * 0.5;
      if (midY > 0.58) bottomInkLength += segLen;

      // 8x8 Density Rasterization with smooth 3x3 kernel
      const steps = Math.max(2, Math.ceil(segLen / 0.03));
      for (let stStep = 0; stStep <= steps; stStep++) {
        const t = stStep / steps;
        const x = p0.x + dx * t;
        const y = p0.y + dy * t;

        const gx = Math.min(7, Math.max(0, Math.floor(x * 8)));
        const gy = Math.min(7, Math.max(0, Math.floor(y * 8)));
        const w = segLen / (steps + 1);

        densityGrid[gy * 8 + gx] += w;
        if (gx > 0) densityGrid[gy * 8 + (gx - 1)] += w * 0.35;
        if (gx < 7) densityGrid[gy * 8 + (gx + 1)] += w * 0.35;
        if (gy > 0) densityGrid[(gy - 1) * 8 + gx] += w * 0.35;
        if (gy < 7) densityGrid[(gy + 1) * 8 + gx] += w * 0.35;

        // 4x4 Continuous Steerable Directional Grids
        const qx = Math.min(3, Math.max(0, Math.floor(x * 4)));
        const qy = Math.min(3, Math.max(0, Math.floor(y * 4)));
        const qIdx = qy * 4 + qx;

        const addSmoothDirection = (grid: number[], amount: number) => {
          if (amount <= 0.0001) return;
          grid[qIdx] += amount;
          if (qx > 0) grid[qy * 4 + (qx - 1)] += amount * 0.35;
          if (qx < 3) grid[qy * 4 + (qx + 1)] += amount * 0.35;
          if (qy > 0) grid[(qy - 1) * 4 + qx] += amount * 0.35;
          if (qy < 3) grid[(qy + 1) * 4 + qx] += amount * 0.35;
        };

        addSmoothDirection(horizGrid, w * horiz);
        addSmoothDirection(vertGrid, w * vert);
        addSmoothDirection(slashGrid, w * slash);
        addSmoothDirection(backslashGrid, w * backslash);

        if (horiz > 0.6) {
          if (y > 0.42 && !isBatchimStroke) bottomHorizEnergy += w * horiz;
          if (x < 0.52 && y > 0.36 && y < choMaxY && !isBatchimStroke) {
            leftBottomHorizEnergy += w * horiz;
          }
        }
        if (vert > 0.6) {
          if (x > 0.5 && !isBatchimStroke) rightVertEnergy += w * vert;
          if (x < 0.25 && y < choMaxY && !isBatchimStroke) leftVertEnergy += w * vert;
        }
        if (!isBatchimStroke && y < choMaxY) {
          const inChoX = x < 0.56 || (midVowelBarY !== null && y < midVowelBarY && x < 0.84);
          if (inChoX) {
            if (slash > 0.35) {
              leftSlashEnergy += w * slash;
            }
            const minBackslashY = hasDetectedBatchim || midVowelBarY !== null ? 0.12 : 0.24;
            if (backslash > 0.35 && y > minBackslashY) {
              leftBackslashEnergy += w * backslash;
            }
          }
        }
      }
    }
  }

  const samples = sampleUniformAlongSegments(allSegments, totalLen, 32);

  // Step 2: Build Local Batchim Sub-Descriptor (normalized to its own [0.06, 0.94]^2 bounding box)
  const batchimHorizGrid = new Array(9).fill(0);    // 3x3
  const batchimVertGrid = new Array(9).fill(0);     // 3x3
  const batchimDensityGrid = new Array(16).fill(0); // 4x4
  let batchimSlashRatio = 0;
  let batchimBackslashRatio = 0;
  let batchimSamples: OrientedSample[] = [];

  if (hasDetectedBatchim) {
    let bMinX = Infinity;
    let bMaxX = -Infinity;
    let bMinY = Infinity;
    let bMaxY = -Infinity;
    for (const st of strokeStats) {
      if (!candidateBatchimIndices.has(st.index)) continue;
      if (st.minX < bMinX) bMinX = st.minX;
      if (st.maxX > bMaxX) bMaxX = st.maxX;
      if (st.minY < bMinY) bMinY = st.minY;
      if (st.maxY > bMaxY) bMaxY = st.maxY;
    }

    const bSpanX = Math.max(bMaxX - bMinX, 0.12);
    const bSpanY = Math.max(bMaxY - bMinY, 0.08);
    const bCx = (bMinX + bMaxX) * 0.5;
    const bCy = (bMinY + bMaxY) * 0.5;

    const bSegments: SegmentInfo[] = [];
    let bTotalLen = 0.001;
    let bSlashLen = 0;
    let bBackslashLen = 0;

    for (const st of strokeStats) {
      if (!candidateBatchimIndices.has(st.index)) continue;
      const localPts = st.stroke.map((pt) => ({
        x: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.x - bCx) / bSpanX) * 0.84)),
        y: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.y - bCy) / bSpanY) * 0.84)),
      }));

      for (let i = 1; i < localPts.length; i++) {
        const p0 = localPts[i - 1];
        const p1 = localPts[i];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const segLen = Math.hypot(dx, dy);
        if (segLen < 0.0005) continue;

        bTotalLen += segLen;
        const ux = dx / segLen;
        const uy = dy / segLen;
        const horiz = ux * ux;
        const vert = uy * uy;
        const diag = 2 * Math.abs(ux * uy);
        const slash = ux * uy < 0 ? diag : 0;
        const backslash = ux * uy >= 0 ? diag : 0;

        bSlashLen += segLen * slash;
        bBackslashLen += segLen * backslash;
        bSegments.push({ p0, p1, dx, dy, len: segLen, horiz, vert, slash, backslash });

        const steps = Math.max(2, Math.ceil(segLen / 0.04));
        for (let stStep = 0; stStep <= steps; stStep++) {
          const t = stStep / steps;
          const x = p0.x + dx * t;
          const y = p0.y + dy * t;
          const w = segLen / (steps + 1);

          // 3x3 sharp directional grid for batchim (top/mid/bottom x left/center/right)
          const bx = Math.min(2, Math.max(0, Math.floor(x * 3)));
          const by = Math.min(2, Math.max(0, Math.floor(y * 3)));
          const bIdx = by * 3 + bx;

          batchimHorizGrid[bIdx] += w * horiz;
          if (bx > 0) batchimHorizGrid[by * 3 + (bx - 1)] += w * horiz * 0.15;
          if (bx < 2) batchimHorizGrid[by * 3 + (bx + 1)] += w * horiz * 0.15;

          batchimVertGrid[bIdx] += w * vert;
          if (by > 0) batchimVertGrid[(by - 1) * 3 + bx] += w * vert * 0.15;
          if (by < 2) batchimVertGrid[(by + 1) * 3 + bx] += w * vert * 0.15;

          // 4x4 batchim density grid
          const dxIdx = Math.min(3, Math.max(0, Math.floor(x * 4)));
          const dyIdx = Math.min(3, Math.max(0, Math.floor(y * 4)));
          batchimDensityGrid[dyIdx * 4 + dxIdx] += w;
        }
      }
    }

    batchimSlashRatio = bSlashLen / bTotalLen;
    batchimBackslashRatio = bBackslashLen / bTotalLen;
    batchimSamples = sampleUniformAlongSegments(bSegments, bTotalLen, 16);
  }

  // Step 3: Build Local Upper-Block Sub-Descriptor (all non-batchim strokes normalized to [0.06, 0.94]^2)
  const upperDensityGrid = new Array(36).fill(0);   // 6x6
  const upperHorizGrid = new Array(16).fill(0);     // 4x4
  const upperVertGrid = new Array(16).fill(0);      // 4x4
  const upperSlashGrid = new Array(16).fill(0);     // 4x4
  const upperBackslashGrid = new Array(16).fill(0); // 4x4
  let upperSamples: OrientedSample[] = [];

  if (hasDetectedBatchim) {
    let uMinX = Infinity;
    let uMaxX = -Infinity;
    let uMinY = Infinity;
    let uMaxY = -Infinity;
    for (const st of strokeStats) {
      if (candidateBatchimIndices.has(st.index)) continue;
      if (st.minX < uMinX) uMinX = st.minX;
      if (st.maxX > uMaxX) uMaxX = st.maxX;
      if (st.minY < uMinY) uMinY = st.minY;
      if (st.maxY > uMaxY) uMaxY = st.maxY;
    }

    const uSpanX = Math.max(uMaxX - uMinX, 0.15);
    const uSpanY = Math.max(uMaxY - uMinY, 0.15);
    const uCx = (uMinX + uMaxX) * 0.5;
    const uCy = (uMinY + uMaxY) * 0.5;

    const uSegments: SegmentInfo[] = [];
    let uTotalLen = 0.001;

    for (const st of strokeStats) {
      if (candidateBatchimIndices.has(st.index)) continue;
      const localPts = st.stroke.map((pt) => ({
        x: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.x - uCx) / uSpanX) * 0.84)),
        y: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.y - uCy) / uSpanY) * 0.84)),
      }));

      for (let i = 1; i < localPts.length; i++) {
        const p0 = localPts[i - 1];
        const p1 = localPts[i];
        const dx = p1.x - p0.x;
        const dy = p1.y - p0.y;
        const segLen = Math.hypot(dx, dy);
        if (segLen < 0.0005) continue;

        uTotalLen += segLen;
        const ux = dx / segLen;
        const uy = dy / segLen;
        const horiz = ux * ux;
        const vert = uy * uy;
        const diag = 2 * Math.abs(ux * uy);
        const slash = ux * uy < 0 ? diag : 0;
        const backslash = ux * uy >= 0 ? diag : 0;

        uSegments.push({ p0, p1, dx, dy, len: segLen, horiz, vert, slash, backslash });

        const steps = Math.max(2, Math.ceil(segLen / 0.04));
        for (let stStep = 0; stStep <= steps; stStep++) {
          const t = stStep / steps;
          const x = p0.x + dx * t;
          const y = p0.y + dy * t;
          const w = segLen / (steps + 1);

          const gx = Math.min(5, Math.max(0, Math.floor(x * 6)));
          const gy = Math.min(5, Math.max(0, Math.floor(y * 6)));
          upperDensityGrid[gy * 6 + gx] += w;
          if (gx > 0) upperDensityGrid[gy * 6 + (gx - 1)] += w * 0.3;
          if (gx < 5) upperDensityGrid[gy * 6 + (gx + 1)] += w * 0.3;
          if (gy > 0) upperDensityGrid[(gy - 1) * 6 + gx] += w * 0.3;
          if (gy < 5) upperDensityGrid[(gy + 1) * 6 + gx] += w * 0.3;

          const qx = Math.min(3, Math.max(0, Math.floor(x * 4)));
          const qy = Math.min(3, Math.max(0, Math.floor(y * 4)));
          const qIdx = qy * 4 + qx;

          const addUpperDir = (grid: number[], amount: number) => {
            if (amount <= 0.0001) return;
            grid[qIdx] += amount;
            if (qx > 0) grid[qy * 4 + (qx - 1)] += amount * 0.3;
            if (qx < 3) grid[qy * 4 + (qx + 1)] += amount * 0.3;
            if (qy > 0) grid[(qy - 1) * 4 + qx] += amount * 0.3;
            if (qy < 3) grid[(qy + 1) * 4 + qx] += amount * 0.3;
          };

          addUpperDir(upperHorizGrid, w * horiz);
          addUpperDir(upperVertGrid, w * vert);
          addUpperDir(upperSlashGrid, w * slash);
          addUpperDir(upperBackslashGrid, w * backslash);
        }
      }
    }

    upperSamples = sampleUniformAlongSegments(uSegments, uTotalLen, 24);
  }

  return {
    strokeCount: rawStrokes.length,
    totalLength: totalLen,
    samples,
    densityGrid: normalizeVec(densityGrid),
    horizGrid: normalizeVec(horizGrid),
    vertGrid: normalizeVec(vertGrid),
    slashGrid: normalizeVec(slashGrid),
    backslashGrid: normalizeVec(backslashGrid),
    topLoop: Math.min(1, topLoop),
    bottomLoop: Math.min(1, bottomLoop),
    rightVertEnergy: rightVertEnergy / totalLen,
    bottomHorizEnergy: bottomHorizEnergy / totalLen,
    bottomInkRatio: bottomInkLength / totalLen,
    leftBackslashEnergy: leftBackslashEnergy / totalLen,
    leftSlashEnergy: leftSlashEnergy / totalLen,
    leftBottomHorizEnergy: leftBottomHorizEnergy / totalLen,
    leftVertEnergy: leftVertEnergy / totalLen,
    hasChoseongBackslashLeg,
    hasChoseongSlashLeg,
    choseongTopBarCount,
    hasDetectedBatchim,
    batchimStrokeCount: candidateBatchimIndices.size,
    batchimHorizGrid: normalizeVec(batchimHorizGrid),
    batchimVertGrid: normalizeVec(batchimVertGrid),
    batchimDensityGrid: normalizeVec(batchimDensityGrid),
    batchimSlashRatio,
    batchimBackslashRatio,
    batchimSamples,
    upperDensityGrid: normalizeVec(upperDensityGrid),
    upperHorizGrid: normalizeVec(upperHorizGrid),
    upperVertGrid: normalizeVec(upperVertGrid),
    upperSlashGrid: normalizeVec(upperSlashGrid),
    upperBackslashGrid: normalizeVec(upperBackslashGrid),
    upperSamples,
  };
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

/**
 * Computes bidirectional 6D oriented Chamfer distance between two point clouds.
 * Distinguishes '/' (slash) from '\' (backslash), as well as horizontal and vertical tangents.
 */
export function computeOrientedChamferDistance(
  a: OrientedSample[],
  b: OrientedSample[]
): number {
  const lenA = a.length;
  const lenB = b.length;
  if (lenA === 0 || lenB === 0) return 1.0;

  let sumAtoB = 0;
  for (let i = 0; i < lenA; i++) {
    const pa = a[i];
    let minD = Infinity;
    for (let j = 0; j < lenB; j++) {
      const pb = b[j];
      const dx = pa.x - pb.x;
      const dy = pa.y - pb.y;
      const dh = (pa.horiz - pb.horiz) * 0.24;
      const dv = (pa.vert - pb.vert) * 0.24;
      const ds = (pa.slash - pb.slash) * 0.28;
      const db = (pa.backslash - pb.backslash) * 0.30;
      const d2 = dx * dx + dy * dy + dh * dh + dv * dv + ds * ds + db * db;
      if (d2 < minD) minD = d2;
    }
    sumAtoB += Math.sqrt(minD);
  }

  let sumBtoA = 0;
  for (let j = 0; j < lenB; j++) {
    const pb = b[j];
    let minD = Infinity;
    for (let i = 0; i < lenA; i++) {
      const pa = a[i];
      const dx = pa.x - pb.x;
      const dy = pa.y - pb.y;
      const dh = (pa.horiz - pb.horiz) * 0.24;
      const dv = (pa.vert - pb.vert) * 0.24;
      const ds = (pa.slash - pb.slash) * 0.28;
      const db = (pa.backslash - pb.backslash) * 0.30;
      const d2 = dx * dx + dy * dy + dh * dh + dv * dv + ds * ds + db * db;
      if (d2 < minD) minD = d2;
    }
    sumBtoA += Math.sqrt(minD);
  }

  return (sumAtoB / lenA + sumBtoA / lenB) * 0.5;
}

const COMMON_EXTRA_SYLLABLES = [
  '가', '각', '간', '갈', '감', '갑', '갓', '강', '개', '객', '거', '건', '걸', '검', '겁', '게', '겨', '격', '견', '결', '겸', '경', '계',
  '고', '곡', '곤', '골', '곰', '곱', '곳', '공', '과', '곽', '관', '괄', '광', '괘', '괴', '굉', '교', '구', '국', '군', '굴', '굵',
  '굶', '굽', '궁', '권', '궐', '귀', '규', '균', '귤', '그', '극', '근', '글', '금', '급', '긍', '기', '긴', '길', '김', '깊', '까',
  '깍', '깎', '깐', '깔', '깜', '깝', '깡', '깨', '꺼', '껍', '껏', '께', '껴', '꼬', '꼭', '꼴', '꼼', '꼽', '꽂', '꽃', '꽈', '꾀',
  '꾸', '꾹', '꾼', '꿀', '꿈', '꿔', '꿰', '뀌', '끄', '끈', '끊', '끌', '끓', '끔', '끗', '끝', '끼', '나', '낙', '낚', '난', '날',
  '낡', '남', '납', '낫', '낭', '낮', '낯', '낱', '낳', '내', '냄', '냉', '냐', '냥', '너', '넉', '넋', '널', '넓', '넘', '넣', '네',
  '넥', '넷', '녀', '녁', '년', '념', '녕', '노', '녹', '논', '놀', '놈', '농', '높', '놓', '뇌', '뇨', '누', '눈', '눌', '눕', '뉘',
  '뉴', '늄', '느', '늑', '는', '늘', '늙', '능', '늦', '늪', '니', '닉', '닌', '닐', '님', '다', '단', '달', '닭', '닮', '담', '답',
  '당', '닿', '대', '댁', '더', '덕', '던', '덜', '덤', '덥', '덧', '덩', '덮', '데', '델', '도', '독', '돈', '돋', '돌', '동', '돼',
  '되', '된', '두', '둑', '둔', '둘', '둠', '둥', '뒤', '뒷', '드', '득', '든', '듣', '들', '듬', '듭', '듯', '등', '디', '딛', '딜',
  '따', '딱', '딴', '딸', '땀', '땅', '때', '땜', '떠', '떡', '떤', '떨', '떻', '떼', '또', '똑', '똥', '뚜', '뚝', '뚫', '뚱', '뛰',
  '뜨', '뜩', '뜬', '뜯', '뜰', '뜻', '띄', '띠', '라', '락', '란', '람', '랑', '래', '랜', '램', '략', '량', '러', '럭', '런', '럴',
  '럼', '럽', '럿', '렁', '레', '렌', '려', '력', '련', '렬', '렴', '렵', '령', '례', '로', '록', '론', '롱', '뢰', '료', '룡', '루',
  '룬', '룰', '룸', '류', '륙', '륜', '률', '륭', '르', '륵', '른', '름', '릉', '릎', '리', '릭', '린', '림', '립', '링', '마', '막',
  '만', '많', '말', '맑', '맘', '맙', '맛', '망', '맞', '맡', '매', '맥', '맨', '맵', '맹', '맺', '머', '먹', '먼', '멀', '멈', '멋',
  '멍', '멎', '메', '멘', '며', '멱', '면', '멸', '명', '몇', '모', '목', '몫', '몬', '몰', '몸', '몹', '못', '몽', '뫼', '묘', '무',
  '묵', '묶', '문', '묻', '물', '뭄', '뭇', '뭉', '뭐', '뭔', '므', '미', '민', '믿', '밀', '밉', '밑', '바', '박', '밖', '반', '받',
  '발', '밝', '밟', '밤', '밥', '방', '밭', '배', '백', '밴', '뱀', '뱃', '뱅', '뱉', '버', '벅', '번', '벌', '범', '법', '벗', '벙',
  '베', '벤', '벨', '벼', '벽', '변', '별', '볍', '병', '보', '복', '볶', '본', '볼', '봄', '봉', '봐', '뵈', '뵙', '부', '북', '분',
  '불', '붉', '붓', '붕', '붙', '뷰', '브', '비', '빈', '빌', '빔', '빗', '빙', '빚', '빛', '빠', '빡', '빨', '빵', '빼', '뺨', '뻐',
  '뻔', '뻗', '뼈', '뽑', '뿌', '뿐', '뿔', '쁨', '쁘', '쁜', '삐', '사', '삭', '산', '살', '삶', '삼', '삽', '상', '샅', '새', '색',
  '샘', '생', '샤', '서', '석', '섞', '선', '설', '섬', '섭', '섯', '성', '세', '센', '셈', '셋', '셔', '션', '소', '속', '손', '솔',
  '솜', '솟', '송', '솥', '쇄', '쇠', '쇼', '수', '숙', '순', '술', '숨', '숫', '숭', '숯', '숲', '쉬', '쉰', '쉽', '슈', '스', '슨',
  '슬', '슴', '습', '승', '시', '식', '신', '싣', '실', '싫', '심', '십', '싱', '싶', '싸', '싹', '싼', '쌀', '쌍', '쌓', '쌔', '썩',
  '썰', '썹', '쎄', '쏘', '쏙', '쏜', '쏟', '쏠', '쑤', '쑥', '쓰', '쓴', '쓸', '씀', '씨', '씩', '씬', '씹', '씻', '아', '악', '안',
  '앉', '않', '알', '앓', '암', '압', '앗', '앙', '앞', '애', '액', '앵', '야', '약', '얀', '얄', '얇', '양', '얕', '얘', '어', '억',
  '언', '얹', '얻', '얼', '얽', '엄', '업', '없', '엇', '엉', '엊', '엌', '엎', '에', '엔', '엘', '여', '역', '엮', '연', '열', '엷',
  '염', '엽', '엿', '영', '옆', '예', '옛', '오', '옥', '온', '올', '옮', '옳', '옷', '옹', '와', '완', '왕', '왜', '왠', '외', '왼',
  '요', '욕', '용', '우', '욱', '운', '울', '움', '웃', '웅', '워', '원', '월', '웨', '웬', '위', '윗', '유', '육', '율', '융', '으',
  '은', '을', '음', '읍', '응', '의', '이', '익', '인', '일', '읽', '잃', '임', '입', '잇', '있', '잊', '잎', '자', '작', '잔', '잖',
  '잘', '잠', '잡', '장', '잦', '재', '쟁', '저', '적', '전', '절', '젊', '점', '접', '젓', '정', '젖', '제', '젠', '젯', '져', '조',
  '족', '존', '졸', '좀', '좁', '종', '좋', '좌', '죄', '주', '죽', '준', '줄', '줌', '줍', '중', '쥐', '쥔', '즈', '즉', '즌', '즐',
  '즘', '증', '지', '직', '진', '질', '짊', '짐', '집', '짓', '징', '짙', '짚', '짜', '짝', '짧', '째', '쩔', '쩜', '쪼', '쪽', '쫓',
  '쭈', '쭉', '찌', '찍', '찐', '찔', '찜', '차', '착', '찬', '찮', '찰', '참', '창', '찾', '채', '책', '챔', '챙', '처', '척', '천',
  '철', '첨', '첩', '첫', '청', '체', '쳐', '초', '촉', '촌', '촛', '총', '촬', '최', '추', '축', '춘', '출', '춤', '춥', '충', '취',
  '츠', '측', '층', '치', '칙', '친', '칠', '침', '칩', '칭', '카', '칸', '칼', '캄', '캐', '캠', '커', '컨', '컬', '컴', '컵', '켜',
  '코', '콕', '콘', '콜', '콤', '콩', '쾌', '쿠', '쿵', '퀴', '크', '큰', '클', '큼', '키', '킨', '킬', '타', '탁', '탄', '탈', '탐',
  '탑', '탓', '탕', '태', '택', '탤', '탬', '터', '턱', '털', '텅', '테', '텐', '텔', '텨', '토', '톡', '톤', '톨', '톱', '통', '퇴',
  '투', '툭', '툼', '퉁', '튀', '튜', '트', '특', '튼', '틀', '틈', '티', '틱', '팀', '팅', '파', '팍', '판', '팔', '패', '팩', '팬',
  '퍼', '퍽', '페', '펴', '편', '펼', '평', '폐', '포', '폭', '폰', '폴', '폼', '표', '푸', '푹', '푼', '풀', '품', '풍', '퓨', '프',
  '픈', '플', '피', '픽', '핀', '필', '핍', '하', '학', '한', '할', '함', '합', '항', '해', '핵', '핸', '햄', '햇', '행', '향', '허',
  '헌', '험', '헤', '헬', '혀', '혁', '현', '혈', '혐', '협', '형', '혜', '호', '혹', '혼', '홀', '홈', '홉', '홍', '화', '확', '환',
  '활', '황', '홰', '횃', '회', '획', '횟', '효', '후', '훈', '훌', '훔', '훤', '훨', '휘', '휴', '흉', '흐', '흑', '흔', '흘', '흙',
  '흠', '흡', '흥', '흩', '희', '흰', '히', '힌', '힘',
];

interface SyllableTemplateEntry {
  char: string;
  choIdx: number;
  jungIdx: number;
  jongIdx: number;
  isPuzzleVocab: boolean;
  hasBatchim: boolean;
  vowelType: 'right' | 'bottom' | 'mixed';
  canonicalStrokes: Stroke[];
  descriptors: StrokeDescriptor[];
}

let cachedTemplates: SyllableTemplateEntry[] | null = null;
const cachedTemplateMap = new Map<string, SyllableTemplateEntry>();

function createSyllableTemplateEntry(ch: string, isPuzzleVocab: boolean): SyllableTemplateEntry | null {
  const v0 = buildCanonicalSyllableStrokes(ch, 0);
  if (v0.length === 0) return null;

  const code = ch.charCodeAt(0) - 0xac00;
  const choIdx = Math.floor(code / (21 * 28));
  const jungIdx = Math.floor((code % (21 * 28)) / 28);
  const jongIdx = code % 28;

  const descriptors: StrokeDescriptor[] = [extractDescriptor(v0)];

  for (const vIdx of [1, 2]) {
    const vAlt = buildCanonicalSyllableStrokes(ch, vIdx);
    if (vAlt.length > 0 && JSON.stringify(vAlt) !== JSON.stringify(v0)) {
      descriptors.push(extractDescriptor(vAlt));
    }
  }

  return {
    char: ch,
    choIdx,
    jungIdx,
    jongIdx,
    isPuzzleVocab,
    hasBatchim: jongIdx !== 0,
    vowelType: getVowelType(jungIdx),
    canonicalStrokes: v0,
    descriptors,
  };
}

export function getSyllableTemplates(extraSyllables?: string[]): SyllableTemplateEntry[] {
  if (!cachedTemplates) {
    const puzzleChars = new Set<string>();
    for (const p of STAGE_PUZZLES) {
      for (const w of p.words) {
        for (const ch of Array.from(w.answer)) puzzleChars.add(ch);
      }
    }

    const allChars = new Set<string>([...puzzleChars, ...COMMON_EXTRA_SYLLABLES]);
    const entries: SyllableTemplateEntry[] = [];

    for (const ch of allChars) {
      const entry = createSyllableTemplateEntry(ch, puzzleChars.has(ch));
      if (entry) {
        entries.push(entry);
        cachedTemplateMap.set(ch, entry);
      }
    }

    cachedTemplates = entries;
  }

  // Dynamically register any syllable from the current stage/puzzle that wasn't in the initial set
  if (extraSyllables) {
    for (const ch of extraSyllables) {
      if (!cachedTemplateMap.has(ch)) {
        const entry = createSyllableTemplateEntry(ch, true);
        if (entry) {
          cachedTemplates.push(entry);
          cachedTemplateMap.set(ch, entry);
        }
      }
    }
  }

  return cachedTemplates;
}

/**
 * Enhanced Hangul Handwriting Recognizer:
 * - Uses two-stage coarse-to-fine matching (< 5ms per call) so UI never lags.
 * - Isolates Upper Block (Choseong+Jungseong) and Lower Block (Jongseong/Batchim) into independent
 *   local [0,1]x[0,1] descriptors so batchim syllables are recognized accurately regardless of size/aspect ratio.
 * - Smooths raw canvas strokes to eliminate pixel jitter while preserving sharp corners.
 * - Uses continuous steerable orientation filters (cos^2, sin^2, 2|ux||uy|) to separate '/', '\', 'ㅡ', 'ㅣ'.
 * - Uses 4-direction travel + curvature loop detection so open '7' strokes or boxes never trigger circle loops.
 */
export function recognizeHandwritingCandidates(
  strokes: Stroke[],
  contextSyllables?: string[]
): string[] {
  if (!strokes || strokes.length === 0) {
    return [];
  }

  const userDesc = extractDescriptor(strokes);
  if (userDesc.samples.length === 0) {
    return [];
  }

  const templates = getSyllableTemplates(contextSyllables);
  const userStrokeCount = strokes.length;
  const contextSet = contextSyllables ? new Set(contextSyllables) : null;

  // Stage 1: Ultra-fast coarse scoring across all templates
  const coarseList: Array<{
    entry: SyllableTemplateEntry;
    bestCoarse: number;
    variantBaseScores: number[];
  }> = [];

  for (const entry of templates) {
    let bestCoarse = -Infinity;
    const variantBaseScores: number[] = [];

    // 1. Entry-level Choseong structural guards
    let structuralGuard = 0;
    const choNeedsBackslash = [9, 10, 12, 13, 14].includes(entry.choIdx);
    const choForbidsBackslash = [0, 1, 2, 3, 4, 5, 6, 7, 15, 16].includes(entry.choIdx);

    if (choNeedsBackslash && !userDesc.hasChoseongBackslashLeg && userDesc.leftBackslashEnergy < 0.04) {
      structuralGuard -= 0.14;
    } else if (choForbidsBackslash && userDesc.hasChoseongBackslashLeg && userDesc.leftBackslashEnergy > 0.05) {
      structuralGuard -= 0.12;
    }

    if (entry.choIdx === 9 && userDesc.choseongTopBarCount >= 1) {
      structuralGuard -= 0.06;
    } else if (entry.choIdx === 12 && userDesc.choseongTopBarCount === 0) {
      structuralGuard -= 0.05;
    } else if (entry.choIdx === 14 && userDesc.choseongTopBarCount < 2) {
      structuralGuard -= 0.045;
    }

    const choHasLoop = entry.choIdx === 11 || entry.choIdx === 18;
    if (choHasLoop && userDesc.topLoop === 0) {
      structuralGuard -= 0.12;
    } else if (!choHasLoop && userDesc.topLoop > 0) {
      structuralGuard -= 0.12;
    }

    // 2. Entry-level Jongseong (Batchim) structural guards
    if (userDesc.hasDetectedBatchim && !entry.hasBatchim) {
      structuralGuard -= 0.22;
    } else if (!userDesc.hasDetectedBatchim && entry.hasBatchim) {
      structuralGuard -= 0.22;
    }

    const jongHasLoop =
      entry.jongIdx === 21 || entry.jongIdx === 6 || entry.jongIdx === 15 || entry.jongIdx === 27;
    if (jongHasLoop && userDesc.bottomLoop === 0) {
      structuralGuard -= 0.16;
    } else if (!jongHasLoop && userDesc.bottomLoop > 0) {
      structuralGuard -= 0.16;
    }

    if (userDesc.hasDetectedBatchim && entry.hasBatchim) {
      const jongNeedsDiag = [3, 5, 12, 18, 19, 20, 22, 23].includes(entry.jongIdx);
      const jongForbidsDiag = [1, 2, 4, 7, 8, 9, 10, 11, 13, 14, 16, 17, 24, 25, 26].includes(
        entry.jongIdx
      );
      if (
        jongNeedsDiag &&
        userDesc.batchimBackslashRatio < 0.07 &&
        userDesc.batchimSlashRatio < 0.07
      ) {
        structuralGuard -= 0.12;
      } else if (
        jongForbidsDiag &&
        userDesc.batchimBackslashRatio > 0.16 &&
        userDesc.batchimSlashRatio > 0.14
      ) {
        structuralGuard -= 0.12;
      }
    }

    let vowelScore = 0;
    if (userDesc.rightVertEnergy > 0.20 && entry.vowelType === 'right') {
      vowelScore += 0.03;
    }
    if (userDesc.bottomHorizEnergy > 0.20 && entry.vowelType === 'bottom') {
      vowelScore += 0.03;
    }

    const contextBonus = contextSet && contextSet.has(entry.char) ? 0.015 : 0;

    for (const full of entry.descriptors) {
      const densitySim = dotProduct(userDesc.densityGrid, full.densityGrid);
      const horizSim = dotProduct(userDesc.horizGrid, full.horizGrid);
      const vertSim = dotProduct(userDesc.vertGrid, full.vertGrid);
      const slashSim = dotProduct(userDesc.slashGrid, full.slashGrid);
      const backslashSim = dotProduct(userDesc.backslashGrid, full.backslashGrid);
      const dirSim =
        horizSim * 0.28 + vertSim * 0.28 + slashSim * 0.22 + backslashSim * 0.22;

      const topologyDiff =
        Math.abs(userDesc.rightVertEnergy - full.rightVertEnergy) +
        Math.abs(userDesc.bottomHorizEnergy - full.bottomHorizEnergy) +
        Math.abs(userDesc.leftBackslashEnergy - full.leftBackslashEnergy) * 1.8 +
        Math.abs(userDesc.leftBottomHorizEnergy - full.leftBottomHorizEnergy) * 0.9 +
        Math.abs(userDesc.leftVertEnergy - full.leftVertEnergy) * 0.8;

      const lengthRatioDiff =
        Math.abs(userDesc.totalLength - full.totalLength) /
        Math.max(userDesc.totalLength, full.totalLength, 1);

      const loopDiff =
        Math.abs(userDesc.topLoop - full.topLoop) * 0.26 +
        Math.abs(userDesc.bottomLoop - full.bottomLoop) * 0.26;

      const expectedStrokes = full.strokeCount;
      const strokeDiff = Math.abs(userStrokeCount - expectedStrokes);
      const strokePenalty = Math.min(0.08, strokeDiff * 0.018);

      const bottomInkDiff = Math.abs(userDesc.bottomInkRatio - full.bottomInkRatio);

      // Local Upper-Block & Batchim-Block similarity when both have a batchim
      let decomposedBonus = 0;
      if (userDesc.hasDetectedBatchim && full.hasDetectedBatchim) {
        const bHorizSim = dotProduct(userDesc.batchimHorizGrid, full.batchimHorizGrid);
        const bVertSim = dotProduct(userDesc.batchimVertGrid, full.batchimVertGrid);
        const bDensSim = dotProduct(userDesc.batchimDensityGrid, full.batchimDensityGrid);
        const bDiagDiff =
          Math.abs(userDesc.batchimSlashRatio - full.batchimSlashRatio) * 0.7 +
          Math.abs(userDesc.batchimBackslashRatio - full.batchimBackslashRatio) * 0.9;
        const batchimSim =
          bHorizSim * 0.40 + bVertSim * 0.40 + bDensSim * 0.20 - bDiagDiff * 0.45;

        const uDensSim = dotProduct(userDesc.upperDensityGrid, full.upperDensityGrid);
        const uDirSim =
          dotProduct(userDesc.upperHorizGrid, full.upperHorizGrid) * 0.28 +
          dotProduct(userDesc.upperVertGrid, full.upperVertGrid) * 0.28 +
          dotProduct(userDesc.upperSlashGrid, full.upperSlashGrid) * 0.22 +
          dotProduct(userDesc.upperBackslashGrid, full.upperBackslashGrid) * 0.22;
        const upperSim = uDensSim * 0.42 + uDirSim * 0.58;

        decomposedBonus = batchimSim * 0.16 + upperSim * 0.14;
      }

      const baseScore =
        densitySim * 0.16 +
        dirSim * 0.20 -
        topologyDiff * 0.15 -
        bottomInkDiff * 0.12 -
        lengthRatioDiff * 0.09 -
        loopDiff -
        strokePenalty +
        structuralGuard +
        vowelScore +
        decomposedBonus +
        contextBonus;

      variantBaseScores.push(baseScore);
      const coarseEst = baseScore + densitySim * 0.30 + dirSim * 0.22 + decomposedBonus * 0.5;
      if (coarseEst > bestCoarse) {
        bestCoarse = coarseEst;
      }
    }

    coarseList.push({ entry, bestCoarse, variantBaseScores });
  }

  coarseList.sort((a, b) => b.bestCoarse - a.bestCoarse);

  // Stage 2: Exact 6D Oriented Chamfer evaluation on top 150 coarse candidates
  const SHORTLIST_SIZE = Math.min(150, coarseList.length);
  const scored: Array<{ char: string; score: number }> = [];

  for (let i = 0; i < SHORTLIST_SIZE; i++) {
    const { entry, variantBaseScores } = coarseList[i];
    let bestVariantScore = -Infinity;

    for (let v = 0; v < entry.descriptors.length; v++) {
      const full = entry.descriptors[v];
      const globalChamfer = computeOrientedChamferDistance(userDesc.samples, full.samples);

      let effectiveChamfer = globalChamfer;
      if (userDesc.hasDetectedBatchim && full.hasDetectedBatchim) {
        const upperChamfer = computeOrientedChamferDistance(
          userDesc.upperSamples,
          full.upperSamples
        );
        const batchimChamfer = computeOrientedChamferDistance(
          userDesc.batchimSamples,
          full.batchimSamples
        );
        effectiveChamfer =
          globalChamfer * 0.25 + upperChamfer * 0.40 + batchimChamfer * 0.35;
      }

      const chamferSim = Math.max(0, 1 - effectiveChamfer * 2.2);
      const totalScore = chamferSim * 0.60 + variantBaseScores[v];
      if (totalScore > bestVariantScore) {
        bestVariantScore = totalScore;
      }
    }

    scored.push({ char: entry.char, score: bestVariantScore });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((item) => item.char);
}



