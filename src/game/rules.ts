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
  t?: number;
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
// HANGUL HANDWRITING RECOGNITION (ONLINE GOOGLE INPUT TOOLS + OFFLINE FALLBACK)
// ============================================================================

export interface HybridRecognitionOptions {
  expectedChar?: string;
  contextSyllables?: string[];
  width?: number;
  height?: number;
  timeoutMs?: number;
  onNetworkError?: () => void;
}

const GOOGLE_HANDWRITING_ENDPOINT =
  'https://inputtools.google.com/request?ime=handwriting&app=mobilesearch&cs=1&oe=UTF-8';

/**
 * 1순위 (온라인 - 구글 입력기 API):
 * 캔버스에 그은 획(stroke) 좌표를 Google Input Tools Handwriting API (language: 'ko')로 POST 요청하여
 * 후보 글자들을 받아온다. 반환된 후보 중에 현재 선택된 칸의 정답 글자(expectedChar / solution)가
 * 포함되어 있으면 무조건 정답 글자를 1순위로 채택한다.
 */
export async function recognizeHandwritingOnline(
  strokes: Stroke[],
  options?: HybridRecognitionOptions
): Promise<string[] | null> {
  if (!strokes || strokes.length === 0) return [];
  if (typeof fetch !== 'function') {
    options?.onNetworkError?.();
    return null;
  }

  if (
    typeof window !== 'undefined' &&
    typeof navigator !== 'undefined' &&
    navigator.onLine === false
  ) {
    options?.onNetworkError?.();
    return null;
  }

  const width = Math.max(60, Math.round(options?.width || 280));
  const height = Math.max(60, Math.round(options?.height || 280));
  const timeoutMs = options?.timeoutMs ?? 1500;

  const ink = strokes
    .filter((s) => s.length > 0)
    .map((stroke) => [
      stroke.map((pt) => Math.round(pt.x)),
      stroke.map((pt) => Math.round(pt.y)),
      stroke.map((pt, idx) => (typeof pt.t === 'number' ? Math.round(pt.t) : idx * 16)),
    ]);

  if (ink.length === 0) return [];

  const controller = typeof AbortController !== 'undefined' ? new AbortController() : null;
  const timerId =
    controller !== null ? setTimeout(() => controller.abort(), timeoutMs) : null;

  try {
    const response = await fetch(GOOGLE_HANDWRITING_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        app_version: 0.4,
        api_level: '537.36',
        device: '5.0',
        input_type: 0,
        options: 'enable_pre_space',
        requests: [
          {
            writing_guide: {
              writing_area_width: width,
              writing_area_height: height,
            },
            ink,
            language: 'ko',
          },
        ],
      }),
      signal: controller?.signal,
    });

    if (!response.ok) {
      options?.onNetworkError?.();
      return null;
    }
    const data = await response.json();
    if (!Array.isArray(data) || data[0] !== 'SUCCESS') {
      return null;
    }

    const rawCandidates: unknown = data?.[1]?.[0]?.[1];
    if (!Array.isArray(rawCandidates) || rawCandidates.length === 0) return null;

    const parsed = rawCandidates
      .filter((item): item is string => typeof item === 'string' && item.trim().length > 0)
      .map((item) => Array.from(item.trim())[0])
      .filter((ch): ch is string => Boolean(ch));

    const uniqueCandidates = Array.from(new Set(parsed));
    if (uniqueCandidates.length === 0) return null;

    const expected = options?.expectedChar?.trim()
      ? Array.from(options.expectedChar.trim())[0]
      : '';
    if (expected && uniqueCandidates.includes(expected)) {
      return [expected, ...uniqueCandidates.filter((c) => c !== expected)].slice(0, 5);
    }

    return uniqueCandidates.slice(0, 5);
  } catch {
    options?.onNetworkError?.();
    return null;
  } finally {
    if (timerId !== null) {
      clearTimeout(timerId);
    }
  }
}

/**
 * 오프라인 스마트 매칭 폴백:
 * 사용자가 그린 필기 획의 바운딩 박스를 정규화하여 캔버스/그리드에 렌더링하고,
 * 후보 글자와의 픽셀 겹침도(IoU)를 순수하게 비교한다.
 * (정답 글자 또는 특정 글자에 인위적인 가산점은 부여하지 않음)
 */
function renderStrokesToMask(strokes: Stroke[], size = 32): Uint8Array {
  const mask = new Uint8Array(size * size);
  if (!strokes || strokes.length === 0) return mask;

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (const s of strokes) {
    for (const p of s) {
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }

  const w = Math.max(1, maxX - minX);
  const h = Math.max(1, maxY - minY);
  const pad = 3;
  const drawArea = size - pad * 2;
  const scale = Math.min(drawArea / w, drawArea / h);
  const ox = Math.round((size - w * scale) / 2);
  const oy = Math.round((size - h * scale) / 2);

  const setPixel = (x: number, y: number) => {
    if (x >= 0 && x < size && y >= 0 && y < size) {
      mask[y * size + x] = 1;
    }
  };

  for (const s of strokes) {
    if (s.length === 0) continue;
    for (let i = 0; i < s.length; i++) {
      const cx = Math.round(ox + (s[i].x - minX) * scale);
      const cy = Math.round(oy + (s[i].y - minY) * scale);
      setPixel(cx, cy);
      if (i > 0) {
        const px = Math.round(ox + (s[i - 1].x - minX) * scale);
        const py = Math.round(oy + (s[i - 1].y - minY) * scale);
        const steps = Math.max(Math.abs(cx - px), Math.abs(cy - py), 1);
        for (let step = 0; step <= steps; step++) {
          const t = step / steps;
          const ix = Math.round(px + (cx - px) * t);
          const iy = Math.round(py + (cy - py) * t);
          setPixel(ix, iy);
          setPixel(ix + 1, iy);
          setPixel(ix, iy + 1);
        }
      }
    }
  }

  return mask;
}

function renderCharToMask(char: string, size = 32): Uint8Array | null {
  try {
    let canvas: HTMLCanvasElement | OffscreenCanvas | null = null;
    let ctx: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D | null = null;

    if (typeof OffscreenCanvas !== 'undefined') {
      canvas = new OffscreenCanvas(size, size);
      ctx = canvas.getContext('2d');
    } else if (typeof document !== 'undefined') {
      canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      ctx = canvas.getContext('2d');
    }

    if (!ctx) return null;

    ctx.clearRect(0, 0, size, size);
    ctx.fillStyle = '#000000';
    ctx.font = `bold ${Math.round(size * 0.75)}px sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(char, size / 2, size / 2 + size * 0.05);

    const imgData = ctx.getImageData(0, 0, size, size);
    const mask = new Uint8Array(size * size);
    for (let i = 0; i < imgData.data.length; i += 4) {
      if (imgData.data[i + 3] > 60) {
        mask[i / 4] = 1;
      }
    }
    return mask;
  } catch {
    return null;
  }
}

function computeMaskIoU(a: Uint8Array, b: Uint8Array): number {
  let intersection = 0;
  let union = 0;
  const len = Math.min(a.length, b.length);
  for (let i = 0; i < len; i++) {
    if (a[i] && b[i]) intersection++;
    if (a[i] || b[i]) union++;
  }
  return union === 0 ? 0 : intersection / union;
}

/**
 * 2순위 (오프라인 폴백 인식):
 * 정답 글자나 특정 글자에 가산점을 주지 않고 순수한 형태 유사도(IoU)를 기준으로 판독한다.
 */
export function recognizeHandwritingCandidates(
  strokes: Stroke[],
  contextSyllables?: string[],
  expectedChar?: string
): string[] {
  if (!strokes || strokes.length === 0) return [];

  const candidatesToScore = new Set<string>();
  if (expectedChar?.trim()) {
    candidatesToScore.add(Array.from(expectedChar.trim())[0]);
  }
  if (contextSyllables && contextSyllables.length > 0) {
    for (const ch of contextSyllables) {
      if (ch?.trim()) candidatesToScore.add(Array.from(ch.trim())[0]);
    }
  }

  if (candidatesToScore.size === 0) {
    return [];
  }

  const strokeMask = renderStrokesToMask(strokes, 32);
  const scored: Array<{ char: string; iou: number }> = [];

  for (const char of candidatesToScore) {
    const charMask = renderCharToMask(char, 32);
    if (charMask) {
      const iou = computeMaskIoU(strokeMask, charMask);
      scored.push({ char, iou });
    } else {
      // If canvas rendering is unavailable, preserve candidate with base score
      scored.push({ char, iou: 0.1 });
    }
  }

  scored.sort((a, b) => b.iou - a.iou);
  return scored.slice(0, 5).map((s) => s.char);
}

/**
 * 온·오프라인 하이브리드 한글 필기 인식 함수:
 * 1순위: 구글 입력기 API(recognizeHandwritingOnline)를 호출하여 후보 리스트 중에 현재 칸의 정답(expectedChar)이 있으면 1순위로 채택.
 * 2순위: 오프라인 상태이거나 API 요청이 실패하면 순수 형태 유사도(IoU)를 대조하는 오프라인 엔진으로 즉시 전환.
 */
export async function recognizeHandwritingHybrid(
  strokes: Stroke[],
  options?: HybridRecognitionOptions
): Promise<string[]> {
  if (!strokes || strokes.length === 0) return [];

  const onlineCandidates = await recognizeHandwritingOnline(strokes, options);
  const offlineCandidates = recognizeHandwritingCandidates(
    strokes,
    options?.contextSyllables,
    options?.expectedChar
  );

  if (onlineCandidates && onlineCandidates.length > 0) {
    const merged = [...onlineCandidates];
    for (const ch of offlineCandidates) {
      if (merged.length >= 5) break;
      if (!merged.includes(ch)) {
        merged.push(ch);
      }
    }
    return merged.slice(0, 5);
  }

  return offlineCandidates;
}
