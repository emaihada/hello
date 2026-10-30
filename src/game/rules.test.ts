import test from 'node:test';
import assert from 'node:assert/strict';
import { STAGE_PUZZLES } from './puzzles.ts';
import {
  buildCrosswordGrid,
  applyCellInput,
  getWordCells,
  isPuzzleComplete,
  canAffordHint,
  HINT_LETTER_COST,
  HINT_WORD_COST,
  INITIAL_CURRENCY,
  formatTimerMMSS,
  recognizeHandwritingCandidates,
  recognizeHandwritingOnline,
  recognizeHandwritingHybrid,
} from './rules.ts';
import {
  CrosswordStageGenerator,
  generateCrosswordWordDataList,
  generateOfficialStagePuzzle,
  convertWordDataToPuzzle,
  GRID_SIZE,
  MIN_WORDS_PER_STAGE,
  MAX_WORDS_PER_STAGE,
} from './wordcrossGenerator.ts';

test('offline wordcross_words-v2 generator builds char index and generates random 15x15 boards with 20~25 intersecting words', () => {
  const generator = new CrosswordStageGenerator();
  const charIndex = generator.getCharIndex();

  const gaWords = charIndex.get('가');
  assert.ok(gaWords && gaWords.length > 0, 'Expected character index for "가" to be populated');
  assert.ok(
    gaWords.some((entry) => entry.word === '가가대소' && entry.hint.includes('웃음')),
    'Expected "가가대소" from wordcross_words-v2.json to be indexed under "가"'
  );

  // Verify true random word selection across independent calls (e.g. different devices / stage creations)
  const sampleRuns = Array.from({ length: 4 }, () =>
    generateCrosswordWordDataList(1).map((w) => w.word).join(',')
  );
  const uniqueRuns = new Set(sampleRuns);
  assert.ok(
    uniqueRuns.size > 1,
    'Stage 1 generated without customSeed should select random words across runs'
  );

  for (const stageNum of [1, 2, 5, 9, 15, 24]) {
    const seededA = generateCrosswordWordDataList(stageNum, 15, undefined, undefined, 424242);
    const seededB = generateCrosswordWordDataList(stageNum, 15, undefined, undefined, 424242);

    assert.deepEqual(
      seededA,
      seededB,
      `Stage ${stageNum} should be reproducible when an explicit customSeed is passed`
    );

    const listA = generateCrosswordWordDataList(stageNum);
    assert.ok(
      listA.length >= MIN_WORDS_PER_STAGE && listA.length <= MAX_WORDS_PER_STAGE,
      `Stage ${stageNum} word count (${listA.length}) should be between ${MIN_WORDS_PER_STAGE} and ${MAX_WORDS_PER_STAGE}`
    );

    const hasHoriz = listA.some((w) => w.direction === 'Horizontal');
    const hasVert = listA.some((w) => w.direction === 'Vertical');
    assert.equal(hasHoriz, true);
    assert.equal(hasVert, true);

    for (const wd of listA) {
      assert.ok(wd.x >= 0 && wd.x < GRID_SIZE);
      assert.ok(wd.y >= 0 && wd.y < GRID_SIZE);
      assert.deepEqual(wd.chars, Array.from(wd.word));
      assert.ok(wd.hint.length > 0);
    }

    const puzzle = generateOfficialStagePuzzle(stageNum);
    assert.equal(puzzle.size, 15);
    const grid = buildCrosswordGrid(puzzle);
    assert.equal(grid.length, 15);
    assert.equal(isPuzzleComplete(grid, puzzle), false);
  }
});

test('all default stage crossword puzzles are 15x15 grids without intersection conflicts and initial currency is 300', () => {
  assert.equal(INITIAL_CURRENCY, 300);
  for (const puzzle of STAGE_PUZZLES) {
    assert.equal(puzzle.size, 15);
    assert.ok(
      puzzle.words.length >= MIN_WORDS_PER_STAGE && puzzle.words.length <= MAX_WORDS_PER_STAGE
    );
    const grid = buildCrosswordGrid(puzzle);
    assert.equal(grid.length, 15);
    assert.equal(isPuzzleComplete(grid, puzzle), false);
  }
});

test('entering correct letters completes a word, locks cells, and grants word reward', () => {
  const stage1 = STAGE_PUZZLES[0];
  const firstWord = stage1.words[0];
  const coords = getWordCells(firstWord);
  const chars = Array.from(firstWord.answer);

  let grid = buildCrosswordGrid(stage1);
  const solvedWordIds = new Set<string>();

  for (let i = 0; i < chars.length - 1; i++) {
    const res = applyCellInput(grid, stage1, solvedWordIds, coords[i].row, coords[i].col, chars[i]);
    grid = res.nextGrid;
    assert.equal(res.isCharCorrect, true);
  }

  const lastIdx = chars.length - 1;
  const finalRes = applyCellInput(
    grid,
    stage1,
    solvedWordIds,
    coords[lastIdx].row,
    coords[lastIdx].col,
    chars[lastIdx]
  );
  grid = finalRes.nextGrid;
  assert.ok(finalRes.newlySolvedWords.some((w) => w.id === firstWord.id));
  assert.ok(finalRes.rewardEarned >= stage1.wordReward);
  for (const pos of coords) {
    assert.equal(grid[pos.row][pos.col].isSolvedLocked, true);
  }
});

test('entering wrong letter marks cell and filled wrong word as wrong alert', () => {
  const stage1 = STAGE_PUZZLES[0];
  const firstWord = stage1.words[0];
  const coords = getWordCells(firstWord);
  const chars = Array.from(firstWord.answer);

  let grid = buildCrosswordGrid(stage1);
  const solvedWordIds = new Set<string>();

  for (let i = 0; i < chars.length - 1; i++) {
    grid = applyCellInput(
      grid,
      stage1,
      solvedWordIds,
      coords[i].row,
      coords[i].col,
      chars[i]
    ).nextGrid;
  }

  const lastPos = coords[chars.length - 1];
  const wrongChar = chars[chars.length - 1] === '갹' ? '뷁' : '갹';
  const wrongRes = applyCellInput(grid, stage1, solvedWordIds, lastPos.row, lastPos.col, wrongChar);
  assert.equal(wrongRes.isCharCorrect, false);
  assert.equal(wrongRes.nextGrid[lastPos.row][lastPos.col].isWrongAlert, true);
  assert.ok(wrongRes.wrongWordsTriggered.some((w) => w.id === firstWord.id));
});

test('hint pricing enforces word hint > letter hint cost and checks affordability', () => {
  assert.equal(HINT_LETTER_COST, 50);
  assert.equal(HINT_WORD_COST, 100);
  assert.ok(HINT_WORD_COST > HINT_LETTER_COST);
  assert.equal(canAffordHint(49, 'letter'), false);
  assert.equal(canAffordHint(50, 'letter'), true);
  assert.equal(canAffordHint(50, 'word'), false);
  assert.equal(canAffordHint(100, 'word'), true);
});

test('timer formats seconds into MM:SS accurately', () => {
  assert.equal(formatTimerMMSS(0), '00:00');
  assert.equal(formatTimerMMSS(65), '01:05');
  assert.equal(formatTimerMMSS(600), '10:00');
});

test('user customizable grid size and word count generation works dynamically and accurately', () => {
  const customGridSize = 12;
  const customTargetWords = 15;
  const stageNum = 99;

  const wordDataList = generateCrosswordWordDataList(stageNum, customGridSize, customTargetWords);
  assert.ok(wordDataList.length >= 10, 'Expected generated words to meet target range');

  for (const wd of wordDataList) {
    assert.ok(wd.x >= 0 && wd.x < customGridSize, `x coordinate ${wd.x} should be within ${customGridSize}`);
    assert.ok(wd.y >= 0 && wd.y < customGridSize, `y coordinate ${wd.y} should be within ${customGridSize}`);
  }

  const puzzle = convertWordDataToPuzzle(stageNum, wordDataList, customGridSize);
  assert.equal(puzzle.size, customGridSize);
  assert.equal(puzzle.words.length, wordDataList.length);
  const grid = buildCrosswordGrid(puzzle);
  assert.equal(grid.length, customGridSize);
  assert.equal(grid[0].length, customGridSize);
});

test('stage generator deprioritizes words used in previously created stages', () => {
  const initialStageWords = generateCrosswordWordDataList(9, 15, 20);
  const usedSet = new Set(initialStageWords.map((w) => w.word));

  const nextStageWords = generateCrosswordWordDataList(9, 15, 20, usedSet);
  assert.ok(nextStageWords.length >= 15, 'Should still generate a full crossword stage');

  const repeatedCount = nextStageWords.filter((w) => usedSet.has(w.word)).length;
  assert.equal(
    repeatedCount,
    0,
    `Expected 0 repeated words when dictionary has plenty of unused words, but got ${repeatedCount}`
  );
});

test('word completion reward is set to 5 coins across all stages', () => {
  for (const puzzle of STAGE_PUZZLES) {
    assert.equal(puzzle.wordReward, 5);
  }
});

test('hybrid handwriting recognizer handles empty strokes, online Google Input Tools API, and offline fallback', async () => {
  assert.deepEqual(recognizeHandwritingCandidates([]), []);
  assert.deepEqual(await recognizeHandwritingHybrid([]), []);

  const sampleStrokes = [
    [
      { x: 50, y: 40, t: 0 },
      { x: 140, y: 40, t: 32 },
      { x: 140, y: 120, t: 68 },
    ],
  ];

  const originalFetch = globalThis.fetch;
  try {
    // 1. Online API returns candidates where expectedChar ('솔') is at index 3 -> must be promoted to index 0
    let capturedUrl = '';
    let capturedBody = '';
    globalThis.fetch = (async (input: RequestInfo | URL, init?: RequestInit) => {
      capturedUrl = String(input);
      capturedBody = String(init?.body || '');
      return new Response(
        JSON.stringify(['SUCCESS', [['ink_0', ['술', '손', '졸', '솔', '살']]]]),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }) as typeof fetch;

    const onlineResult = await recognizeHandwritingOnline(sampleStrokes, {
      expectedChar: '솔',
      width: 280,
      height: 280,
    });
    assert.ok(capturedUrl.includes('inputtools.google.com/request?ime=handwriting'));
    assert.ok(capturedBody.includes('"language":"ko"'));
    assert.ok(onlineResult);
    assert.equal(onlineResult[0], '솔', 'Expected expectedChar "솔" to be promoted to #1');

    // 2. Online API returns candidates where expectedChar is not in the list -> candidate #1 from API returned
    const noSolutionResult = await recognizeHandwritingOnline(sampleStrokes, {
      expectedChar: '하',
      width: 280,
      height: 280,
    });
    assert.ok(noSolutionResult);
    assert.equal(noSolutionResult[0], '술', 'Expected top candidate from API to remain #1 when solution not in list');

    // 3. Online API fails (network error / offline) -> recognizeHandwritingHybrid falls back to offline engine without errors
    globalThis.fetch = (async () => {
      throw new Error('Network unreachable');
    }) as typeof fetch;

    const fallbackCandidates = await recognizeHandwritingHybrid(sampleStrokes, {
      expectedChar: '기',
      contextSyllables: ['기', '나'],
      width: 280,
      height: 280,
    });
    assert.ok(Array.isArray(fallbackCandidates));
    assert.ok(fallbackCandidates.length > 0);
  } finally {
    globalThis.fetch = originalFetch;
  }
});
