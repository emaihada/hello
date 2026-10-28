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
  buildCanonicalSyllableStrokes,
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

test('offline wordcross_words-v2 generator builds char index and generates deterministic 15x15 boards with 20~25 intersecting words', () => {
  const generator = new CrosswordStageGenerator();
  const charIndex = generator.getCharIndex();

  // Verify Dictionary<char, List<WordEntry>> index contains '가' and includes '가가대소'
  const gaWords = charIndex.get('가');
  assert.ok(gaWords && gaWords.length > 0, 'Expected character index for "가" to be populated');
  assert.ok(
    gaWords.some((entry) => entry.word === '가가대소' && entry.hint.includes('웃음')),
    'Expected "가가대소" from wordcross_words-v2.json to be indexed under "가"'
  );

  // Verify determinism with Random.InitState(stageNumber) and 20~25 word count on 15x15 grid
  for (const stageNum of [1, 2, 5, 9, 15, 24]) {
    const listA = generateCrosswordWordDataList(stageNum);
    const listB = generateCrosswordWordDataList(stageNum);

    assert.deepEqual(
      listA,
      listB,
      `Stage ${stageNum} should be 100% deterministic for the same stageNumber seed`
    );
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
  assert.ok(HINT_WORD_COST > HINT_LETTER_COST);
  assert.equal(canAffordHint(50, 'letter'), true);
  assert.equal(canAffordHint(50, 'word'), false);
  assert.equal(canAffordHint(100, 'word'), true);
});

test('pure handwriting recognizer never cheats with target answer and accurately recognizes drawn Hangul syllables', () => {
  assert.equal(recognizeHandwritingCandidates([]).length, 0);

  const singleHoriz = recognizeHandwritingCandidates([
    [{ x: 20, y: 60 }, { x: 140, y: 60 }],
  ]);
  assert.equal(singleHoriz.length, 5);
  assert.equal(singleHoriz.includes('무'), false);
  assert.equal(singleHoriz.includes('달'), false);

  for (const targetChar of ['가', '나', '무', '지', '개', '보', '라', '미', '달', '빛', '이', '슬']) {
    const canonical = buildCanonicalSyllableStrokes(targetChar);
    const drawnOnCanvas = canonical.map((stroke) =>
      stroke.map((pt, idx) => ({
        x: pt.x * 160 + 15 + (idx % 2 === 0 ? 2 : -2),
        y: pt.y * 120 + 10 + (idx % 2 === 0 ? -1.5 : 1.5),
      }))
    );
    const candidates = recognizeHandwritingCandidates(drawnOnCanvas);
    assert.equal(candidates.length, 5);
    assert.ok(
      candidates.includes(targetChar),
      `Expected drawn "${targetChar}" to be in top 5 candidates: [${candidates.join(', ')}]`
    );
    assert.equal(candidates[0], targetChar);
  }
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

test('handwriting recognition is robust against reversed stroke order and cursive variants', () => {
  // Test 1: Reversed stroke order (vowel drawn first, consonant drawn second)
  for (const targetChar of ['가', '보', '미', '나']) {
    const canonical = buildCanonicalSyllableStrokes(targetChar);
    // Reverse stroke order completely
    const reversedStrokes = [...canonical].reverse().map((stroke) =>
      stroke.map((pt) => ({ x: pt.x * 160 + 10, y: pt.y * 120 + 10 }))
    );
    const candidates = recognizeHandwritingCandidates(reversedStrokes);
    assert.ok(
      candidates.includes(targetChar),
      `Expected reversed stroke order for "${targetChar}" to be in candidates: [${candidates.join(', ')}]`
    );
  }

  // Test 2: Cursive variant with continuous connected strokes (variantIndex: 1)
  for (const targetChar of ['무', '라', '고', '사']) {
    const cursiveCanonical = buildCanonicalSyllableStrokes(targetChar, 1);
    const drawnCursive = cursiveCanonical.map((stroke) =>
      stroke.map((pt) => ({ x: pt.x * 160 + 10, y: pt.y * 120 + 10 }))
    );
    const candidates = recognizeHandwritingCandidates(drawnCursive, [targetChar]);
    assert.ok(
      candidates.includes(targetChar),
      `Expected cursive "${targetChar}" to be in candidates: [${candidates.join(', ')}]`
    );
  }
});


