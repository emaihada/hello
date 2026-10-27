import { STAGE_PUZZLES, type CrosswordPuzzle, type WordClue } from './puzzles.ts';

export const HINT_LETTER_COST = 30;
export const HINT_WORD_COST = 80;
export const INITIAL_CURRENCY = 120;

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

/**
 * Generates canonical normalized [0,1]x[0,1] strokes for any Hangul syllable
 */
export function buildCanonicalSyllableStrokes(syllable: string): Stroke[] {
  const code = syllable.charCodeAt(0) - 0xac00;
  if (code < 0 || code > 11171) return [];

  const choIdx = Math.floor(code / (21 * 28));
  const jungIdx = Math.floor((code % (21 * 28)) / 28);
  const jongIdx = code % 28;

  const choTemplate = CHOSEONG_STROKES[choIdx] || CHOSEONG_STROKES[0];
  const jungTemplate = JUNGSEONG_STROKES[jungIdx] || JUNGSEONG_STROKES[0];
  const jongChoIdx = JONGSEONG_TO_CHOSEONG[jongIdx];
  const jongTemplate = jongChoIdx !== undefined ? CHOSEONG_STROKES[jongChoIdx] : null;

  const vType = getVowelType(jungIdx);
  const hasBatchim = jongTemplate !== null;

  const result: Stroke[] = [];

  if (vType === 'right') {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.06, 0.14, 0.48, 0.84));
      result.push(...transformStrokes(jungTemplate, 0.5, 0.08, 0.94, 0.92));
    } else {
      result.push(...transformStrokes(choTemplate, 0.06, 0.06, 0.48, 0.52));
      result.push(...transformStrokes(jungTemplate, 0.52, 0.06, 0.94, 0.56));
      result.push(...transformStrokes(jongTemplate!, 0.16, 0.6, 0.84, 0.94));
    }
  } else if (vType === 'bottom') {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.16, 0.08, 0.84, 0.52));
      result.push(...transformStrokes(jungTemplate, 0.08, 0.56, 0.92, 0.92));
    } else {
      result.push(...transformStrokes(choTemplate, 0.2, 0.05, 0.8, 0.38));
      result.push(...transformStrokes(jungTemplate, 0.08, 0.42, 0.92, 0.66));
      result.push(...transformStrokes(jongTemplate!, 0.18, 0.68, 0.82, 0.95));
    }
  } else {
    if (!hasBatchim) {
      result.push(...transformStrokes(choTemplate, 0.08, 0.08, 0.52, 0.46));
      result.push(...transformStrokes(jungTemplate, 0.06, 0.08, 0.94, 0.92));
    } else {
      result.push(...transformStrokes(choTemplate, 0.08, 0.06, 0.52, 0.38));
      result.push(...transformStrokes(jungTemplate, 0.06, 0.06, 0.94, 0.58));
      result.push(...transformStrokes(jongTemplate!, 0.18, 0.62, 0.82, 0.94));
    }
  }

  return result;
}

interface OrientedSample {
  x: number;
  y: number;
  absDx: number;
  absDy: number;
}

interface StrokeDescriptor {
  strokeCount: number;
  totalLength: number;
  samples: OrientedSample[];
  densityGrid: number[]; // 6x6 = 36 cells
  horizGrid: number[];   // 4x4 = 16 cells
  vertGrid: number[];    // 4x4 = 16 cells
  diagGrid: number[];    // 4x4 = 16 cells
  topLoop: number;
  bottomLoop: number;
  rightVertEnergy: number;
  bottomHorizEnergy: number;
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
    s.map((pt) => ({
      x: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.x - cx) / effSpanX) * 0.84)),
      y: Math.min(0.96, Math.max(0.04, 0.5 + ((pt.y - cy) / effSpanY) * 0.84)),
    }))
  );
}

function extractDescriptor(rawStrokes: Stroke[]): StrokeDescriptor {
  const norm = normalizeStrokesToUnitBox(rawStrokes);
  const densityGrid = new Array(36).fill(0);
  const horizGrid = new Array(16).fill(0);
  const vertGrid = new Array(16).fill(0);
  const diagGrid = new Array(16).fill(0);
  const samples: OrientedSample[] = [];

  let topLoop = 0;
  let bottomLoop = 0;
  let rightVertEnergy = 0;
  let bottomHorizEnergy = 0;
  let totalLen = 0.001;

  for (const stroke of norm) {
    if (stroke.length === 0) continue;

    let strokeLen = 0;
    let sumY = stroke[0].y;
    for (let i = 1; i < stroke.length; i++) {
      strokeLen += Math.hypot(stroke[i].x - stroke[i - 1].x, stroke[i].y - stroke[i - 1].y);
      sumY += stroke[i].y;
    }
    const meanY = sumY / stroke.length;
    const endDist = Math.hypot(
      stroke[stroke.length - 1].x - stroke[0].x,
      stroke[stroke.length - 1].y - stroke[0].y
    );
    if (strokeLen > 0.45 && endDist < strokeLen * 0.38) {
      if (meanY < 0.58) topLoop += 1;
      else bottomLoop += 1;
    }

    for (let i = 1; i < stroke.length; i++) {
      const p0 = stroke[i - 1];
      const p1 = stroke[i];
      const dx = p1.x - p0.x;
      const dy = p1.y - p0.y;
      const segLen = Math.hypot(dx, dy);
      if (segLen < 0.001) continue;

      totalLen += segLen;
      const absDx = Math.abs(dx) / segLen;
      const absDy = Math.abs(dy) / segLen;

      // Sample every ~0.065 unit length for 4D oriented Chamfer point cloud
      const sampleSteps = Math.max(1, Math.ceil(segLen / 0.065));
      for (let st = 0; st < sampleSteps; st++) {
        const t = (st + 0.5) / sampleSteps;
        samples.push({
          x: p0.x + dx * t,
          y: p0.y + dy * t,
          absDx,
          absDy,
        });
      }

      const steps = Math.max(2, Math.ceil(segLen / 0.04));
      for (let st = 0; st <= steps; st++) {
        const t = st / steps;
        const x = p0.x + dx * t;
        const y = p0.y + dy * t;

        const gx = Math.min(5, Math.max(0, Math.floor(x * 6)));
        const gy = Math.min(5, Math.max(0, Math.floor(y * 6)));
        const w = segLen / (steps + 1);
        densityGrid[gy * 6 + gx] += w;
        if (gx > 0) densityGrid[gy * 6 + (gx - 1)] += w * 0.3;
        if (gx < 5) densityGrid[gy * 6 + (gx + 1)] += w * 0.3;
        if (gy > 0) densityGrid[(gy - 1) * 6 + gx] += w * 0.3;
        if (gy < 5) densityGrid[(gy + 1) * 6 + gx] += w * 0.3;

        const qx = Math.min(3, Math.max(0, Math.floor(x * 4)));
        const qy = Math.min(3, Math.max(0, Math.floor(y * 4)));
        const qIdx = qy * 4 + qx;

        if (absDx > absDy * 1.35) {
          horizGrid[qIdx] += w;
          if (y > 0.45) bottomHorizEnergy += w;
        } else if (absDy > absDx * 1.35) {
          vertGrid[qIdx] += w;
          if (x > 0.5) rightVertEnergy += w;
        } else {
          diagGrid[qIdx] += w;
        }
      }
    }
  }

  const normalizeVec = (arr: number[]) => {
    const normVal = Math.hypot(...arr) || 1;
    return arr.map((v) => v / normVal);
  };

  return {
    strokeCount: rawStrokes.length,
    totalLength: totalLen,
    samples,
    densityGrid: normalizeVec(densityGrid),
    horizGrid: normalizeVec(horizGrid),
    vertGrid: normalizeVec(vertGrid),
    diagGrid: normalizeVec(diagGrid),
    topLoop: Math.min(1, topLoop),
    bottomLoop: Math.min(1, bottomLoop),
    rightVertEnergy: rightVertEnergy / totalLen,
    bottomHorizEnergy: bottomHorizEnergy / totalLen,
  };
}

function dotProduct(a: number[], b: number[]): number {
  let sum = 0;
  for (let i = 0; i < a.length; i++) sum += a[i] * b[i];
  return sum;
}

/**
 * Computes bidirectional 4D oriented Chamfer distance between two point clouds
 * in (x, y, absDx, absDy) space. Smaller distance = closer geometric & directional match.
 */
function computeOrientedChamferDistance(
  a: OrientedSample[],
  b: OrientedSample[]
): number {
  if (a.length === 0 || b.length === 0) return 1.0;

  let sumAtoB = 0;
  for (let i = 0; i < a.length; i++) {
    const pa = a[i];
    let minD = Infinity;
    for (let j = 0; j < b.length; j++) {
      const pb = b[j];
      const dx = pa.x - pb.x;
      const dy = pa.y - pb.y;
      const dux = (pa.absDx - pb.absDx) * 0.28;
      const duy = (pa.absDy - pb.absDy) * 0.28;
      const d2 = dx * dx + dy * dy + dux * dux + duy * duy;
      if (d2 < minD) minD = d2;
    }
    sumAtoB += Math.sqrt(minD);
  }

  let sumBtoA = 0;
  for (let j = 0; j < b.length; j++) {
    const pb = b[j];
    let minD = Infinity;
    for (let i = 0; i < a.length; i++) {
      const pa = a[i];
      const dx = pa.x - pb.x;
      const dy = pa.y - pb.y;
      const dux = (pa.absDx - pb.absDx) * 0.28;
      const duy = (pa.absDy - pb.absDy) * 0.28;
      const d2 = dx * dx + dy * dy + dux * dux + duy * duy;
      if (d2 < minD) minD = d2;
    }
    sumBtoA += Math.sqrt(minD);
  }

  return (sumAtoB / a.length + sumBtoA / b.length) * 0.5;
}

const COMMON_EXTRA_SYLLABLES = [
  '가', '각', '간', '갈', '감', '갑', '강', '개', '객', '거', '건', '걸', '검', '겁', '게', '겨', '격', '견', '결', '겸', '경', '계',
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
  isPuzzleVocab: boolean;
  canonicalStrokes: Stroke[];
  fullDesc: StrokeDescriptor;
}

let cachedTemplates: SyllableTemplateEntry[] | null = null;

function getSyllableTemplates(): SyllableTemplateEntry[] {
  if (cachedTemplates) return cachedTemplates;

  const puzzleChars = new Set<string>();
  for (const p of STAGE_PUZZLES) {
    for (const w of p.words) {
      for (const ch of Array.from(w.answer)) puzzleChars.add(ch);
    }
  }

  const allChars = new Set<string>([...puzzleChars, ...COMMON_EXTRA_SYLLABLES]);
  const entries: SyllableTemplateEntry[] = [];

  for (const ch of allChars) {
    const canonicalStrokes = buildCanonicalSyllableStrokes(ch);
    if (canonicalStrokes.length === 0) continue;
    entries.push({
      char: ch,
      isPuzzleVocab: puzzleChars.has(ch),
      canonicalStrokes,
      fullDesc: extractDescriptor(canonicalStrokes),
    });
  }

  cachedTemplates = entries;
  return entries;
}

/**
 * Pure Hangul Handwriting Recognizer (#1):
 * Takes ONLY the user's drawn `strokes` (never knows the target cell answer!).
 * Computes 4D oriented Chamfer point-cloud similarity, spatial density, and directional
 * field correlation against Hangul syllable templates and returns the top 5 candidates.
 */
export function recognizeHandwritingCandidates(strokes: Stroke[]): string[] {
  if (!strokes || strokes.length === 0) {
    return [];
  }

  const userDesc = extractDescriptor(strokes);
  if (userDesc.samples.length === 0) {
    return [];
  }

  const templates = getSyllableTemplates();
  const userStrokeCount = strokes.length;

  const scored: Array<{ char: string; score: number }> = [];

  for (const entry of templates) {
    const full = entry.fullDesc;

    // 1. 4D Oriented Chamfer Similarity (position x, y + unsigned orientation |dx|, |dy|)
    const chamferDist = computeOrientedChamferDistance(userDesc.samples, full.samples);
    const chamferSim = Math.max(0, 1 - chamferDist * 2.2);

    // 2. Spatial density correlation (6x6 smoothed grid)
    const densitySim = dotProduct(userDesc.densityGrid, full.densityGrid);

    // 3. Directional energy correlation (Horizontal, Vertical, Diagonal 4x4 grids)
    const horizSim = dotProduct(userDesc.horizGrid, full.horizGrid);
    const vertSim = dotProduct(userDesc.vertGrid, full.vertGrid);
    const diagSim = dotProduct(userDesc.diagGrid, full.diagGrid);
    const dirSim = horizSim * 0.38 + vertSim * 0.38 + diagSim * 0.24;

    // 4. Structural vowel topology match & total ink length ratio
    const topologyDiff =
      Math.abs(userDesc.rightVertEnergy - full.rightVertEnergy) +
      Math.abs(userDesc.bottomHorizEnergy - full.bottomHorizEnergy);
    const lengthRatioDiff =
      Math.abs(userDesc.totalLength - full.totalLength) /
      Math.max(userDesc.totalLength, full.totalLength, 1);

    // 5. Loop / circle match (ㅇ, ㅎ)
    const loopDiff =
      Math.abs(userDesc.topLoop - full.topLoop) * 0.25 +
      Math.abs(userDesc.bottomLoop - full.bottomLoop) * 0.25;

    // 6. Stroke count compatibility
    const expectedStrokes = entry.canonicalStrokes.length;
    const strokeDiff = Math.abs(userStrokeCount - expectedStrokes);
    const strokePenalty =
      strokeDiff === 0
        ? 0
        : strokeDiff === 1
        ? 0.08
        : strokeDiff === 2
        ? 0.18
        : 0.12 * strokeDiff;

    const totalScore =
      chamferSim * 0.55 +
      densitySim * 0.25 +
      dirSim * 0.25 -
      topologyDiff * 0.15 -
      lengthRatioDiff * 0.18 -
      loopDiff -
      strokePenalty +
      (entry.isPuzzleVocab ? 0.025 : 0);

    scored.push({ char: entry.char, score: totalScore });
  }

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, 5).map((item) => item.char);
}
