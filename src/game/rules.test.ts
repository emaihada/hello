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
  assert.equal(HINT_LETTER_COST, 50);
  assert.equal(HINT_WORD_COST, 100);
  assert.ok(HINT_WORD_COST > HINT_LETTER_COST);
  assert.equal(canAffordHint(49, 'letter'), false);
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

test('stage generator deprioritizes words used in previously created stages', () => {
  // Collect all words from the first generated stage for seed 9
  const initialStageWords = generateCrosswordWordDataList(9, 15, 20);
  const usedSet = new Set(initialStageWords.map((w) => w.word));

  // Generate again with the same seed (9), gridSize (15), and targetWords (20), passing usedSet
  const nextStageWords = generateCrosswordWordDataList(9, 15, 20, usedSet);
  assert.ok(nextStageWords.length >= 15, 'Should still generate a full crossword stage');

  const repeatedCount = nextStageWords.filter((w) => usedSet.has(w.word)).length;
  assert.equal(
    repeatedCount,
    0,
    `Expected 0 repeated words when dictionary has plenty of unused words, but got ${repeatedCount}`
  );
});

test('handwriting recognizer accurately distinguishes slanted 가, 2-stroke/3-stroke 자, and 하 without confusion', () => {
  // 1. Human handwritten '가' where 'ㄱ' is slanted down-left (like '7') + 'ㅏ'
  const slantedGaStrokes = [
    // ㄱ with a strong down-left slant (common in natural Korean handwriting)
    [
      { x: 25, y: 45 },
      { x: 60, y: 45 },
      { x: 95, y: 45 },
      { x: 75, y: 85 },
      { x: 52, y: 135 },
    ],
    // ㅣ of ㅏ
    [
      { x: 135, y: 25 },
      { x: 135, y: 90 },
      { x: 135, y: 165 },
    ],
    // ㅡ of ㅏ
    [
      { x: 135, y: 95 },
      { x: 175, y: 95 },
    ],
  ];
  const gaCandidates = recognizeHandwritingCandidates(slantedGaStrokes, ['하', '자', '가']);
  assert.equal(
    gaCandidates[0],
    '가',
    `Slanted handwritten "가" should be recognized as "가" #1, got: [${gaCandidates.join(', ')}]`
  );

  // 2. Human handwritten '자' (2-stroke ㅈ: bent '7' stroke + '\' right leg, plus 'ㅏ')
  const handwrittenJa2Strokes = [
    // Stroke 1 of ㅈ: horizontal top + down-left '/'
    [
      { x: 25, y: 42 },
      { x: 65, y: 42 },
      { x: 98, y: 42 },
      { x: 62, y: 92 },
      { x: 26, y: 145 },
    ],
    // Stroke 2 of ㅈ: down-right '\' leg
    [
      { x: 62, y: 88 },
      { x: 82, y: 115 },
      { x: 102, y: 145 },
    ],
    // ㅣ of ㅏ
    [
      { x: 138, y: 25 },
      { x: 138, y: 95 },
      { x: 138, y: 168 },
    ],
    // ㅡ of ㅏ
    [
      { x: 138, y: 95 },
      { x: 178, y: 95 },
    ],
  ];
  const ja2Candidates = recognizeHandwritingCandidates(handwrittenJa2Strokes, ['하', '가', '자']);
  assert.equal(
    ja2Candidates[0],
    '자',
    `2-stroke handwritten "자" should be recognized as "자" #1 (not "하"), got: [${ja2Candidates.join(', ')}]`
  );

  // 3. Human handwritten '자' (3-stroke printed ㅈ: horiz bar + '/' leg + '\' leg, plus 'ㅏ')
  const handwrittenJa3Strokes = [
    [
      { x: 25, y: 42 },
      { x: 98, y: 42 },
    ],
    [
      { x: 65, y: 42 },
      { x: 26, y: 145 },
    ],
    [
      { x: 60, y: 85 },
      { x: 102, y: 145 },
    ],
    [
      { x: 138, y: 25 },
      { x: 138, y: 168 },
    ],
    [
      { x: 138, y: 95 },
      { x: 178, y: 95 },
    ],
  ];
  const ja3Candidates = recognizeHandwritingCandidates(handwrittenJa3Strokes, ['하', '가', '자']);
  assert.equal(
    ja3Candidates[0],
    '자',
    `3-stroke handwritten "자" should be recognized as "자" #1 (not "하"), got: [${ja3Candidates.join(', ')}]`
  );

  // 4. Human handwritten '하' (top tick + horiz bar + closed circular loop + 'ㅏ')
  const handwrittenHaStrokes = buildCanonicalSyllableStrokes('하', 0).map((s) =>
    s.map((pt) => ({ x: pt.x * 160 + 20, y: pt.y * 140 + 20 }))
  );
  const haCandidates = recognizeHandwritingCandidates(handwrittenHaStrokes, ['자', '가', '하']);
  assert.equal(
    haCandidates[0],
    '하',
    `Handwritten "하" should be recognized as "하" #1, got: [${haCandidates.join(', ')}]`
  );

  // 5. Dense 40-point noisy canvas strokes with end-hooks for '자' (verifying it never false-triggers '하')
  const densifyWithJitterAndHook = (pts: Array<{ x: number; y: number }>, addEndHook = false) => {
    const out: Array<{ x: number; y: number }> = [];
    for (let i = 0; i < pts.length - 1; i++) {
      const steps = 15;
      for (let s = 0; s < steps; s++) {
        const t = s / steps;
        const jitterX = Math.sin((i * steps + s) * 1.7) * 1.4;
        const jitterY = Math.cos((i * steps + s) * 2.1) * 1.4;
        out.push({
          x: pts[i].x + (pts[i + 1].x - pts[i].x) * t + jitterX,
          y: pts[i].y + (pts[i + 1].y - pts[i].y) * t + jitterY,
        });
      }
    }
    const last = pts[pts.length - 1];
    out.push(last);
    if (addEndHook) {
      // Simulate finger/stylus release upward hook
      out.push({ x: last.x + 2, y: last.y - 4 });
      out.push({ x: last.x + 4, y: last.y - 8 });
    }
    return out;
  };

  const noisyCanvasJa = [
    densifyWithJitterAndHook(
      [
        { x: 24, y: 44 },
        { x: 96, y: 42 },
        { x: 26, y: 142 },
      ],
      true
    ),
    densifyWithJitterAndHook(
      [
        { x: 60, y: 86 },
        { x: 100, y: 144 },
      ],
      true
    ),
    densifyWithJitterAndHook([
      { x: 138, y: 24 },
      { x: 138, y: 168 },
    ]),
    densifyWithJitterAndHook([
      { x: 138, y: 95 },
      { x: 178, y: 95 },
    ]),
  ];
  const noisyJaCandidates = recognizeHandwritingCandidates(noisyCanvasJa, ['하', '가', '자']);
  assert.equal(
    noisyJaCandidates[0],
    '자',
    `Dense noisy canvas "자" with end-hooks must be "자" #1 (not "하"), got: [${noisyJaCandidates.join(', ')}]`
  );

  const noisyCanvasGa = [
    densifyWithJitterAndHook(
      [
        { x: 24, y: 44 },
        { x: 96, y: 44 },
        { x: 42, y: 140 },
      ],
      true
    ),
    densifyWithJitterAndHook([
      { x: 138, y: 24 },
      { x: 138, y: 168 },
    ]),
    densifyWithJitterAndHook([
      { x: 138, y: 95 },
      { x: 178, y: 95 },
    ]),
  ];
  const noisyGaCandidates = recognizeHandwritingCandidates(noisyCanvasGa, ['자', '하', '가']);
  assert.equal(
    noisyGaCandidates[0],
    '가',
    `Dense noisy canvas slanted "가" must be "가" #1 (not "자"), got: [${noisyGaCandidates.join(', ')}]`
  );
});

test('word completion reward is set to 5 coins across all stages', () => {
  for (const puzzle of STAGE_PUZZLES) {
    assert.equal(puzzle.wordReward, 5, `Expected stage ${puzzle.id} wordReward to be 5`);
  }
  const generated = generateOfficialStagePuzzle(12);
  assert.equal(generated.wordReward, 5);
});

test('handwriting recognizer accurately recognizes Hangul syllables with batchim across all major final consonants and human proportions', () => {
  const batchimSyllables = [
    '각', '간', '갈', '감', '갑', '갓', '강',
    '산', '달', '밤', '집', '꽃', '책', '별',
    '장', '항', '국', '문', '손', '발', '빛',
    '공', '동', '봄', '물', '술', '숲', '왕', '원',
  ];

  // 1. Canonical and noisy canvas drawings of batchim syllables
  for (const ch of batchimSyllables) {
    const strokes = buildCanonicalSyllableStrokes(ch, 0).map((s) =>
      s.map((pt, idx) => ({
        x: pt.x * 160 + 20 + (idx % 2 === 0 ? 1.5 : -1.5),
        y: pt.y * 150 + 15 + (idx % 2 === 0 ? -1.2 : 1.2),
      }))
    );
    const candidates = recognizeHandwritingCandidates(strokes, batchimSyllables);
    assert.equal(
      candidates[0],
      ch,
      `Expected batchim syllable "${ch}" to be recognized as #1, got: [${candidates.join(', ')}]`
    );
  }

  // 2. Human-proportioned top-heavy handwriting (upper block takes ~65% height, batchim is compact & narrow underneath)
  for (const ch of ['강', '산', '달', '밤', '집', '손', '문', '책', '별', '항']) {
    const humanVariantStrokes = buildCanonicalSyllableStrokes(ch, 1).map((s) =>
      s.map((pt) => ({
        x: pt.x * 160 + 20,
        y: pt.y * 150 + 15,
      }))
    );
    const candidates = recognizeHandwritingCandidates(humanVariantStrokes, batchimSyllables);
    assert.ok(
      candidates.slice(0, 2).includes(ch),
      `Expected human-proportioned batchim syllable "${ch}" in top 2, got: [${candidates.join(', ')}]`
    );
    assert.equal(
      candidates[0],
      ch,
      `Expected human-proportioned batchim syllable "${ch}" to be #1, got: [${candidates.join(', ')}]`
    );
  }
});






