import test from 'node:test';
import assert from 'node:assert/strict';
import { STAGE_PUZZLES } from './puzzles.ts';
import {
  buildCrosswordGrid,
  applyCellInput,
  isPuzzleComplete,
  canAffordHint,
  HINT_LETTER_COST,
  HINT_WORD_COST,
  formatTimerMMSS,
  recognizeHandwritingCandidates,
  buildCanonicalSyllableStrokes,
} from './rules.ts';

test('all stage crossword puzzles build valid grids without intersection conflicts', () => {
  for (const puzzle of STAGE_PUZZLES) {
    const grid = buildCrosswordGrid(puzzle);
    assert.equal(grid.length, puzzle.size);
    assert.equal(isPuzzleComplete(grid, puzzle), false);
  }
});

test('entering correct letters completes a word, locks cells, and grants word reward', () => {
  const stage1 = STAGE_PUZZLES[0];
  let grid = buildCrosswordGrid(stage1);
  const solvedWordIds = new Set<string>();

  let res = applyCellInput(grid, stage1, solvedWordIds, 0, 0, '호');
  grid = res.nextGrid;
  assert.equal(res.isCharCorrect, true);
  assert.equal(res.newlySolvedWords.length, 0);

  res = applyCellInput(grid, stage1, solvedWordIds, 0, 1, '랑');
  grid = res.nextGrid;
  assert.equal(res.newlySolvedWords.length, 0);

  res = applyCellInput(grid, stage1, solvedWordIds, 0, 2, '이');
  grid = res.nextGrid;
  assert.equal(res.newlySolvedWords.length, 1);
  assert.equal(res.newlySolvedWords[0].id, 'H1');
  assert.equal(res.rewardEarned, stage1.wordReward);
  assert.equal(grid[0][0].isSolvedLocked, true);
  assert.equal(grid[0][1].isSolvedLocked, true);
  assert.equal(grid[0][2].isSolvedLocked, true);
});

test('entering wrong letter marks cell and filled wrong word as wrong alert', () => {
  const stage1 = STAGE_PUZZLES[0];
  let grid = buildCrosswordGrid(stage1);
  const solvedWordIds = new Set<string>();

  grid = applyCellInput(grid, stage1, solvedWordIds, 0, 0, '호').nextGrid;
  grid = applyCellInput(grid, stage1, solvedWordIds, 0, 1, '랑').nextGrid;

  const wrongRes = applyCellInput(grid, stage1, solvedWordIds, 0, 2, '구');
  assert.equal(wrongRes.isCharCorrect, false);
  assert.equal(wrongRes.nextGrid[0][2].isWrongAlert, true);
  assert.equal(wrongRes.wrongWordsTriggered.length, 1);
  assert.equal(wrongRes.wrongWordsTriggered[0].id, 'H1');
});

test('hint pricing enforces word hint > letter hint cost and checks affordability', () => {
  assert.ok(HINT_WORD_COST > HINT_LETTER_COST);
  assert.equal(canAffordHint(50, 'letter'), true);
  assert.equal(canAffordHint(50, 'word'), false);
  assert.equal(canAffordHint(100, 'word'), true);
});

test('pure handwriting recognizer never cheats with target answer and accurately recognizes drawn Hangul syllables', () => {
  assert.equal(recognizeHandwritingCandidates([]).length, 0);

  // 1. A single horizontal stroke should NOT magically output complex multi-stroke syllables like '무' or '달'
  const singleHoriz = recognizeHandwritingCandidates([
    [{ x: 20, y: 60 }, { x: 140, y: 60 }],
  ]);
  assert.equal(singleHoriz.length, 5);
  assert.equal(singleHoriz.includes('무'), false);
  assert.equal(singleHoriz.includes('달'), false);

  // 2. Test writing actual Hangul syllables scaled to canvas coordinates with slight human jitter
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

  // 3. Test human stroke-splitting variation: writing '가' with 4 separate straight strokes (ㅡ, ㅣ for ㄱ and ㅣ, ㅡ for ㅏ)
  const splitGa: Array<Array<{ x: number; y: number }>> = [
    [{ x: 20, y: 35 }, { x: 75, y: 35 }], // top horizontal of ㄱ
    [{ x: 75, y: 35 }, { x: 75, y: 100 }], // right vertical of ㄱ
    [{ x: 115, y: 20 }, { x: 115, y: 115 }], // vertical of ㅏ
    [{ x: 115, y: 65 }, { x: 155, y: 65 }], // horizontal of ㅏ
  ];
  const splitGaCandidates = recognizeHandwritingCandidates(splitGa);
  assert.ok(
    splitGaCandidates.includes('가'),
    `Expected 4-stroke split '가' to include '가' in top 5: [${splitGaCandidates.join(', ')}]`
  );
});

test('timer formats seconds into MM:SS accurately', () => {
  assert.equal(formatTimerMMSS(0), '00:00');
  assert.equal(formatTimerMMSS(65), '01:05');
  assert.equal(formatTimerMMSS(600), '10:00');
});
