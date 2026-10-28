import {
  DEFAULT_WORDCROSS_DATABASE,
  type WordDatabase,
  type WordEntry,
} from './defaultWordcrossJson.ts';
import type { CrosswordPuzzle, Direction, WordClue } from './puzzles.ts';

export type CrosswordDirection = 'Horizontal' | 'Vertical';

export interface CrosswordWordData {
  x: number;
  y: number;
  direction: CrosswordDirection;
  chars: string[];
  word: string;
  hint: string;
  category: string;
  level: string;
  origin: string;
}

export const GRID_SIZE = 15;
export const MIN_WORDS_PER_STAGE = 20;
export const MAX_WORDS_PER_STAGE = 25;

/**
 * Deterministic Seeded Random matching Unity's Random.InitState(seed) behavior.
 * Guarantees that the same integer stageNumber always produces the exact same puzzle board.
 */
export class DeterministicRandom {
  private state: number = 1;

  public InitState(seed: number): void {
    // Mulberry32 / Xorshift32 state initialization from integer seed
    let s = (Math.floor(seed) ^ 0x6d2b79f5) >>> 0;
    if (s === 0) s = 0x13579bdf;
    this.state = s;
  }

  public nextFloat(): number {
    let t = (this.state += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    this.state = t >>> 0;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }

  public Range(minInclusive: number, maxExclusive: number): number {
    if (maxExclusive <= minInclusive) return minInclusive;
    return minInclusive + Math.floor(this.nextFloat() * (maxExclusive - minInclusive));
  }

  public shuffleInPlace<T>(arr: T[]): T[] {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = this.Range(0, i + 1);
      const tmp = arr[i];
      arr[i] = arr[j];
      arr[j] = tmp;
    }
    return arr;
  }
}

/**
 * Unity JsonUtility & Resources.Load offline equivalent for Assets/Resources/wordcross_words-v2.json
 */
export class JsonUtility {
  public static FromJson<T>(jsonText: string): T {
    return JSON.parse(jsonText) as T;
  }
}

export class Resources {
  private static customJsonText: string | null = null;

  public static setCustomWordcrossJson(jsonText: string): void {
    Resources.customJsonText = jsonText;
  }

  public static Load(path: string): { text: string } {
    if (
      path === 'wordcross_words-v2' ||
      path === 'Assets/Resources/wordcross_words-v2.json' ||
      path.endsWith('wordcross_words-v2')
    ) {
      if (Resources.customJsonText) {
        return { text: Resources.customJsonText };
      }
      return { text: JSON.stringify(DEFAULT_WORDCROSS_DATABASE) };
    }
    throw new Error(`Resource not found at path: ${path}`);
  }
}

interface IndexedWordEntry {
  entry: WordEntry;
  chars: string[];
  connectivityScore: number;
}

/**
 * Offline Crossword Stage Generator
 * - Loads Assets/Resources/wordcross_words-v2.json via Resources.Load + JsonUtility.FromJson
 * - Pre-builds Dictionary<char, List<WordEntry>> (Map<string, WordEntry[]>) character index
 * - Uses Random.InitState(stageNumber) for 100% deterministic generation per stageNumber
 * - Places 20~25 intersecting words on a 15x15 grid
 */
export class CrosswordStageGenerator {
  private database: WordDatabase | null = null;
  private charIndex: Map<string, WordEntry[]> = new Map();
  private validWords: IndexedWordEntry[] = [];
  private random = new DeterministicRandom();

  public constructor(customDatabase?: WordDatabase) {
    if (customDatabase) {
      this.initializeFromDatabase(customDatabase);
    } else {
      this.loadFromResources();
    }
  }

  public loadFromResources(): void {
    const textAsset = Resources.Load('wordcross_words-v2');
    const parsed = JsonUtility.FromJson<WordDatabase>(textAsset.text);
    this.initializeFromDatabase(parsed);
  }

  public initializeFromDatabase(db: WordDatabase): void {
    this.database = db;
    this.charIndex.clear();
    this.validWords = [];

    const seenWords = new Set<string>();
    const rawList = Array.isArray(db?.words) ? db.words : [];

    for (const item of rawList) {
      if (!item || typeof item.word !== 'string' || typeof item.hint !== 'string') continue;
      const cleanWord = item.word.trim();
      const chars = Array.from(cleanWord);
      // Filter to 2..5 syllable Korean words that fit cleanly on a 15x15 crossword grid
      if (chars.length < 2 || chars.length > 5) continue;
      if (seenWords.has(cleanWord)) continue;
      seenWords.add(cleanWord);

      const normalizedEntry: WordEntry = {
        word: cleanWord,
        hint: item.hint.trim(),
        category: (item.category || '일반').trim(),
        level: (item.level || '초급').trim(),
        origin: (item.origin || '').trim(),
      };

      // Build Dictionary<char, List<WordEntry>> index for every unique character in the word
      const uniqueCharsInWord = new Set<string>(chars);
      for (const ch of uniqueCharsInWord) {
        let bucket = this.charIndex.get(ch);
        if (!bucket) {
          bucket = [];
          this.charIndex.set(ch, bucket);
        }
        bucket.push(normalizedEntry);
      }

      this.validWords.push({
        entry: normalizedEntry,
        chars,
        connectivityScore: 0,
      });
    }

    // Compute syllable connectivity score so highly connectable words are favored
    for (const vw of this.validWords) {
      let score = 0;
      for (const ch of vw.chars) {
        score += (this.charIndex.get(ch)?.length || 1) - 1;
      }
      vw.connectivityScore = score;
    }
  }

  public getCharIndex(): Map<string, WordEntry[]> {
    return this.charIndex;
  }

  public getTotalWordCount(): number {
    return this.validWords.length;
  }

  /**
   * Generates a deterministic crossword board for the given stageNumber.
   * Returns List<CrosswordWordData> with intersecting words.
   * Deprioritizes words in previouslyUsedWords so earlier stages' words are avoided whenever possible.
   */
  public generateStage(
    stageNumber: number,
    customGridSize: number = GRID_SIZE,
    customTargetWords?: number,
    previouslyUsedWords?: Iterable<string>
  ): CrosswordWordData[] {
    const safeStage = Math.max(1, Math.floor(stageNumber));
    const gridSize = Math.max(8, Math.min(25, Math.floor(customGridSize || GRID_SIZE)));
    const excludedSet = new Set<string>(previouslyUsedWords ?? []);

    // Deterministically target word count if not explicitly provided
    const targetCount =
      customTargetWords !== undefined
        ? Math.max(5, Math.min(35, Math.floor(customTargetWords)))
        : MIN_WORDS_PER_STAGE +
          ((safeStage * 7) % (MAX_WORDS_PER_STAGE - MIN_WORDS_PER_STAGE + 1));
    const minTargetAccept = Math.min(targetCount, 12);

    let bestResult: CrosswordWordData[] = [];
    let bestScore = -Infinity;

    // Try up to 6 deterministic sub-passes from the stage seed to ensure words
    for (let attempt = 0; attempt < 6; attempt++) {
      this.random.InitState(safeStage * 10007 + attempt * 7919);
      const runResult = this.tryBuildGrid(targetCount, gridSize, excludedSet);
      const reusedCount = runResult.words.reduce(
        (acc, w) => acc + (excludedSet.has(w.word) ? 1 : 0),
        0
      );
      const runScore =
        runResult.words.length * 100 +
        runResult.totalIntersections * 10 -
        reusedCount * 500;

      if (runResult.words.length >= minTargetAccept && runScore > bestScore) {
        bestResult = runResult.words;
        bestScore = runScore;
        if (runResult.words.length >= targetCount && reusedCount === 0) {
          break;
        }
      } else if (bestResult.length < minTargetAccept && runResult.words.length > bestResult.length) {
        bestResult = runResult.words;
        bestScore = runScore;
      }
    }

    return bestResult;
  }

  private tryBuildGrid(
    targetCount: number,
    size: number = GRID_SIZE,
    previouslyUsedSet: Set<string> = new Set()
  ): {
    words: CrosswordWordData[];
    totalIntersections: number;
  } {
    const gridChar: (string | null)[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => null)
    );
    const gridHoriz: boolean[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false)
    );
    const gridVert: boolean[][] = Array.from({ length: size }, () =>
      Array.from({ length: size }, () => false)
    );

    const placedWords: CrosswordWordData[] = [];
    const usedWords = new Set<string>();
    let totalIntersections = 0;

    const placeWordOnGrid = (
      entry: WordEntry,
      x: number,
      y: number,
      direction: CrosswordDirection
    ) => {
      const chars = Array.from(entry.word);
      const dx = direction === 'Horizontal' ? 1 : 0;
      const dy = direction === 'Horizontal' ? 0 : 1;

      for (let i = 0; i < chars.length; i++) {
        const cx = x + i * dx;
        const cy = y + i * dy;
        gridChar[cy][cx] = chars[i];
        if (direction === 'Horizontal') {
          gridHoriz[cy][cx] = true;
        } else {
          gridVert[cy][cx] = true;
        }
      }

      usedWords.add(entry.word);
      placedWords.push({
        x,
        y,
        direction,
        chars,
        word: entry.word,
        hint: entry.hint,
        category: entry.category,
        level: entry.level,
        origin: entry.origin,
      });
    };

    const canPlaceWord = (
      chars: string[],
      x: number,
      y: number,
      direction: CrosswordDirection,
      requireIntersection: boolean
    ): number => {
      const len = chars.length;
      const dx = direction === 'Horizontal' ? 1 : 0;
      const dy = direction === 'Horizontal' ? 0 : 1;

      if (x < 0 || y < 0) return -1;
      if (x + (len - 1) * dx >= size || y + (len - 1) * dy >= size) return -1;

      // Check before start cell and after end cell (cannot touch another word head-to-tail)
      const beforeX = x - dx;
      const beforeY = y - dy;
      if (beforeX >= 0 && beforeY >= 0 && gridChar[beforeY][beforeX] !== null) {
        return -1;
      }

      const afterX = x + len * dx;
      const afterY = y + len * dy;
      if (afterX < size && afterY < size && gridChar[afterY][afterX] !== null) {
        return -1;
      }

      let intersections = 0;

      for (let i = 0; i < len; i++) {
        const cx = x + i * dx;
        const cy = y + i * dy;
        const existing = gridChar[cy][cx];

        if (existing !== null) {
          if (existing !== chars[i]) return -1;
          // Cannot overlap a word going in the same direction
          if (direction === 'Horizontal' && gridHoriz[cy][cx]) return -1;
          if (direction === 'Vertical' && gridVert[cy][cx]) return -1;
          intersections++;
        } else {
          // Empty cell: perpendicular neighbor cells must be empty to prevent side-by-side parallel contact
          if (direction === 'Horizontal') {
            if (cy > 0 && gridChar[cy - 1][cx] !== null) return -1;
            if (cy < size - 1 && gridChar[cy + 1][cx] !== null) return -1;
          } else {
            if (cx > 0 && gridChar[cy][cx - 1] !== null) return -1;
            if (cx < size - 1 && gridChar[cy][cx + 1] !== null) return -1;
          }
        }
      }

      if (requireIntersection && intersections === 0) return -1;
      return intersections;
    };

    // 1. Pick high-connectivity seed words (3..4 chars) not used in previous stages and place the first word near the center
    const seedCandidates = this.validWords.filter(
      (w) => w.chars.length >= 3 && w.chars.length <= 4 && w.connectivityScore >= 6
    );
    const freshSeedCandidates = seedCandidates.filter(
      (w) => !previouslyUsedSet.has(w.entry.word)
    );
    const freshAllWords = this.validWords.filter(
      (w) => !previouslyUsedSet.has(w.entry.word)
    );
    const seedPool =
      freshSeedCandidates.length > 0
        ? freshSeedCandidates
        : freshAllWords.length > 0
        ? freshAllWords
        : seedCandidates.length > 0
        ? seedCandidates
        : this.validWords;
    const firstWordObj = seedPool[this.random.Range(0, seedPool.length)];
    if (!firstWordObj) {
      return { words: [], totalIntersections: 0 };
    }

    const startX = Math.floor((size - firstWordObj.chars.length) / 2);
    const startY = Math.floor(size / 2);
    placeWordOnGrid(firstWordObj.entry, startX, startY, 'Horizontal');

    // 2. Iteratively grow intersecting words using the Dictionary<char, List<WordEntry>> index
    let stalledRounds = 0;
    while (placedWords.length < targetCount && stalledRounds < 8) {
      let placedInRound = false;

      // Collect all potential anchor cells from currently placed words
      const anchorOrder = Array.from({ length: placedWords.length }, (_, idx) => idx);
      this.random.shuffleInPlace(anchorOrder);

      let bestCandidate: {
        entry: WordEntry;
        x: number;
        y: number;
        direction: CrosswordDirection;
        intersections: number;
        score: number;
      } | null = null;

      for (const wordIdx of anchorOrder) {
        const pw = placedWords[wordIdx];
        const perpDir: CrosswordDirection =
          pw.direction === 'Horizontal' ? 'Vertical' : 'Horizontal';
        const dx = pw.direction === 'Horizontal' ? 1 : 0;
        const dy = pw.direction === 'Horizontal' ? 0 : 1;

        const charIndices = Array.from({ length: pw.chars.length }, (_, i) => i);
        this.random.shuffleInPlace(charIndices);

        for (const i of charIndices) {
          const anchorX = pw.x + i * dx;
          const anchorY = pw.y + i * dy;
          const anchorChar = pw.chars[i];

          // O(1) lookup from Dictionary<char, List<WordEntry>>
          const matchingEntries = this.charIndex.get(anchorChar);
          if (!matchingEntries || matchingEntries.length === 0) continue;

          // Partition candidates so fresh (never used in previous stages) words are evaluated first
          const freshIndices: number[] = [];
          const reusedIndices: number[] = [];
          for (let k = 0; k < matchingEntries.length; k++) {
            if (!previouslyUsedSet.has(matchingEntries[k].word)) {
              freshIndices.push(k);
            } else {
              reusedIndices.push(k);
            }
          }
          this.random.shuffleInPlace(freshIndices);
          this.random.shuffleInPlace(reusedIndices);
          const indices = [...freshIndices, ...reusedIndices];

          const maxChecks = Math.min(indices.length, 36);
          for (let m = 0; m < maxChecks; m++) {
            const candidate = matchingEntries[indices[m]];
            if (usedWords.has(candidate.word)) continue;

            const candChars = Array.from(candidate.word);
            // Prefer 2..4 syllable words so we can pack 20..25 words cleanly on 15x15
            for (let cIdx = 0; cIdx < candChars.length; cIdx++) {
              if (candChars[cIdx] !== anchorChar) continue;

              const candX = perpDir === 'Horizontal' ? anchorX - cIdx : anchorX;
              const candY = perpDir === 'Vertical' ? anchorY - cIdx : anchorY;

              const intersections = canPlaceWord(candChars, candX, candY, perpDir, true);
              if (intersections > 0) {
                // Score candidate: reward multi-intersections, compact 2..3 char words when board fills up,
                // and strongly penalize words already used in previous stages.
                const centerDist =
                  Math.abs(candX + (perpDir === 'Horizontal' ? candChars.length / 2 : 0) - 7) +
                  Math.abs(candY + (perpDir === 'Vertical' ? candChars.length / 2 : 0) - 7);
                const lengthBonus = candChars.length <= 3 ? 12 : candChars.length === 4 ? 6 : 0;
                const reusePenalty = previouslyUsedSet.has(candidate.word) ? 1000 : 0;
                const score =
                  intersections * 50 +
                  lengthBonus -
                  centerDist * 0.8 -
                  reusePenalty +
                  this.random.nextFloat() * 10;

                if (!bestCandidate || score > bestCandidate.score) {
                  bestCandidate = {
                    entry: candidate,
                    x: candX,
                    y: candY,
                    direction: perpDir,
                    intersections,
                    score,
                  };
                }
              }
            }
          }
        }
      }

      if (bestCandidate) {
        placeWordOnGrid(
          bestCandidate.entry,
          bestCandidate.x,
          bestCandidate.y,
          bestCandidate.direction
        );
        totalIntersections += bestCandidate.intersections;
        placedInRound = true;
      } else {
        // If no direct intersection slot remains and we still need more words to reach 20~25,
        // seed a new sub-island in an open area of the 15x15 grid that can immediately cross with another word
        const islandPlaced = this.tryPlaceIslandPair(
          placedWords,
          usedWords,
          previouslyUsedSet,
          gridChar,
          gridHoriz,
          gridVert,
          canPlaceWord,
          placeWordOnGrid,
          size
        );
        if (islandPlaced > 0) {
          totalIntersections += 1;
          placedInRound = true;
        } else {
          stalledRounds++;
        }
      }

      if (!placedInRound) {
        stalledRounds++;
      }
    }

    return { words: placedWords, totalIntersections };
  }

  private tryPlaceIslandPair(
    placedWords: CrosswordWordData[],
    usedWords: Set<string>,
    previouslyUsedSet: Set<string>,
    gridChar: (string | null)[][],
    gridHoriz: boolean[][],
    gridVert: boolean[][],
    canPlaceWord: (
      chars: string[],
      x: number,
      y: number,
      direction: CrosswordDirection,
      requireIntersection: boolean
    ) => number,
    placeWordOnGrid: (
      entry: WordEntry,
      x: number,
      y: number,
      direction: CrosswordDirection
    ) => void,
    size: number = GRID_SIZE
  ): number {
    // Try candidate coordinates across the grid
    const coords: Array<{ x: number; y: number; dir: CrosswordDirection }> = [];
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        coords.push({ x, y, dir: (x + y) % 2 === 0 ? 'Horizontal' : 'Vertical' });
      }
    }
    this.random.shuffleInPlace(coords);

    const allShortWords = this.validWords.filter(
      (w) => !usedWords.has(w.entry.word) && w.chars.length >= 2 && w.chars.length <= 3
    );
    const freshShort = allShortWords.filter((w) => !previouslyUsedSet.has(w.entry.word));
    const reusedShort = allShortWords.filter((w) => previouslyUsedSet.has(w.entry.word));
    this.random.shuffleInPlace(freshShort);
    this.random.shuffleInPlace(reusedShort);
    const shortWords = [...freshShort, ...reusedShort];

    const maxWordChecks = Math.min(shortWords.length, 45);
    for (let i = 0; i < Math.min(coords.length, 60); i++) {
      const { x, y, dir } = coords[i];
      for (let wIdx = 0; wIdx < maxWordChecks; wIdx++) {
        const w1 = shortWords[wIdx];
        if (usedWords.has(w1.entry.word)) continue;
        if (canPlaceWord(w1.chars, x, y, dir, false) < 0) continue;

        // Check if at least one crossing word w2 can immediately cross w1
        const perpDir: CrosswordDirection = dir === 'Horizontal' ? 'Vertical' : 'Horizontal';
        const dx = dir === 'Horizontal' ? 1 : 0;
        const dy = dir === 'Horizontal' ? 0 : 1;

        for (let c1 = 0; c1 < w1.chars.length; c1++) {
          const ax = x + c1 * dx;
          const ay = y + c1 * dy;
          const ch = w1.chars[c1];
          const rawBucket = this.charIndex.get(ch) || [];
          const freshBucket = rawBucket.filter((e) => !previouslyUsedSet.has(e.word));
          const reusedBucket = rawBucket.filter((e) => previouslyUsedSet.has(e.word));
          const bucket = [...freshBucket, ...reusedBucket];

          for (const w2Entry of bucket) {
            if (w2Entry.word === w1.entry.word || usedWords.has(w2Entry.word)) continue;
            const w2Chars = Array.from(w2Entry.word);
            if (w2Chars.length > 4) continue;

            for (let c2 = 0; c2 < w2Chars.length; c2++) {
              if (w2Chars[c2] !== ch) continue;
              const x2 = perpDir === 'Horizontal' ? ax - c2 : ax;
              const y2 = perpDir === 'Vertical' ? ay - c2 : ay;

              // Check if w2 can be placed on the empty grid (ignoring the shared intersection cell (ax, ay))
              // and does not collide with w1's neighbor cells
              placeWordOnGrid(w1.entry, x, y, dir);
              const crossCount =
                placedWords.length < MAX_WORDS_PER_STAGE
                  ? canPlaceWord(w2Chars, x2, y2, perpDir, true)
                  : -1;

              if (crossCount > 0) {
                placeWordOnGrid(w2Entry, x2, y2, perpDir);
                return 2;
              } else {
                // Roll back w1 placement so we never leave an uncrossed word
                placedWords.pop();
                usedWords.delete(w1.entry.word);
                for (let k = 0; k < w1.chars.length; k++) {
                  const rx = x + k * dx;
                  const ry = y + k * dy;
                  gridChar[ry][rx] = null;
                  if (dir === 'Horizontal') gridHoriz[ry][rx] = false;
                  else gridVert[ry][rx] = false;
                }
              }
            }
          }
        }
      }
    }
    return 0;
  }
}

/**
 * Converts a generated List<CrosswordWordData> into our playable CrosswordPuzzle format.
 */
export function convertWordDataToPuzzle(
  stageNumber: number,
  wordDataList: CrosswordWordData[],
  gridSize: number = GRID_SIZE
): CrosswordPuzzle {
  // Sort by (y, x) so clue numbers 1..N follow natural top-to-bottom, left-to-right order
  const sorted = [...wordDataList].sort((a, b) =>
    a.y !== b.y ? a.y - b.y : a.x !== b.x ? a.x - b.x : a.direction === 'Horizontal' ? -1 : 1
  );

  // Assign shared clue numbers when an Across and Down word start at the exact same (x, y)
  const startCoordToNumber = new Map<string, number>();
  let nextClueNumber = 1;
  let hCount = 1;
  let vCount = 1;

  const words: WordClue[] = sorted.map((wd) => {
    const coordKey = `${wd.y},${wd.x}`;
    let num = startCoordToNumber.get(coordKey);
    if (num === undefined) {
      num = nextClueNumber++;
      startCoordToNumber.set(coordKey, num);
    }

    const dir: Direction = wd.direction === 'Horizontal' ? 'across' : 'down';
    const id = dir === 'across' ? `H${hCount++}` : `V${vCount++}`;

    return {
      id,
      number: num,
      direction: dir,
      row: wd.y,
      col: wd.x,
      answer: wd.word,
      clue: wd.hint,
      category: wd.category || '일반',
    };
  });

  return {
    id: `stage-${stageNumber}`,
    stageNumber,
    isDaily: false,
    title: `${stageNumber}단계`,
    subtitle: `${gridSize}×${gridSize} 한글 십자말풀이`,
    size: gridSize,
    words,
    clearReward: 100 + Math.min(100, stageNumber * 10),
    wordReward: 15,
  };
}

// Singleton generator instance for fast offline generation across the app
let sharedGenerator: CrosswordStageGenerator | null = null;

export function getSharedCrosswordGenerator(): CrosswordStageGenerator {
  if (!sharedGenerator) {
    sharedGenerator = new CrosswordStageGenerator();
  }
  return sharedGenerator;
}

export function generateCrosswordWordDataList(
  stageNumber: number,
  gridSize: number = GRID_SIZE,
  targetWordCount?: number,
  previouslyUsedWords?: Iterable<string>
): CrosswordWordData[] {
  return getSharedCrosswordGenerator().generateStage(
    stageNumber,
    gridSize,
    targetWordCount,
    previouslyUsedWords
  );
}

export function generateOfficialStagePuzzle(
  stageNumber: number,
  gridSize: number = GRID_SIZE,
  previouslyUsedWords?: Iterable<string>
): CrosswordPuzzle {
  const wordDataList = generateCrosswordWordDataList(
    stageNumber,
    gridSize,
    undefined,
    previouslyUsedWords
  );
  return convertWordDataToPuzzle(stageNumber, wordDataList, gridSize);
}
