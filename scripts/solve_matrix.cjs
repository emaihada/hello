// Systematic 14x14 puzzle designer & validator
const fs = require('fs');
const { validatePuzzle } = require('./validator.cjs');

// Helper to build a clean 14x14 grid step-by-step
function buildStage(stageNum, wordList) {
  const puzzle = {
    id: `stage-${stageNum}`,
    stageNumber: stageNum,
    isDaily: false,
    title: `${stageNum}단계`,
    subtitle: '14×14 우리말 십자말풀이',
    size: 14,
    wordReward: 20,
    clearReward: 150,
    words: wordList.map((w, idx) => ({
      id: `${w.direction === 'across' ? 'H' : 'V'}${idx + 1}`,
      number: idx + 1,
      direction: w.direction,
      row: w.row,
      col: w.col,
      answer: w.answer,
      clue: w.clue,
      category: w.category || '일반'
    }))
  };

  const validation = validatePuzzle(puzzle);
  if (!validation.isValid) {
    console.error(`Stage ${stageNum} errors:`, validation.errors);
    throw new Error(`Stage ${stageNum} failed validation`);
  }
  return puzzle;
}

// Let's create Stage 1 (22 words, 14x14)
// Layout plan:
// r=0: '봄바람'(0,0..2), '가을하늘'(0,6..9)
// Down at (0,1): '바' -> '바다'(0,1 '바', 1,1 '다')
// Let's test a clean interconnected grid
const stage1Words = [
  // Across
  { direction: 'across', row: 0, col: 0, answer: '봄바람', clue: '봄철에 부드럽고 따스하게 불어오는 바람', category: '자연' },
  { direction: 'across', row: 0, col: 5, answer: '눈사람', clue: '겨울에 눈을 둥글게 뭉쳐 사람 모양으로 만든 것', category: '놀이' },
  { direction: 'across', row: 2, col: 1, answer: '바람개비', clue: '바람이 불면 빙글빙글 돌아가는 날개 달린 장난감', category: '놀이' },
  { direction: 'across', row: 2, col: 7, answer: '사람들', clue: '세상을 함께 살아가는 많은 이들', category: '사회' },
  { direction: 'across', row: 4, col: 0, answer: '비눗방울', clue: '빨대로 불면 공중에 둥실 떠오르는 무지갯빛 방울', category: '놀이' },
  { direction: 'across', row: 4, col: 6, answer: '들판', clue: '풀이나 곡식이 넓게 자라는 평평한 땅', category: '자연' },
  { direction: 'across', row: 4, col: 9, answer: '기상청', clue: '날씨와 일기예보를 관측하고 발표하는 기관', category: '사회' },
  { direction: 'across', row: 6, col: 2, answer: '방앗간', clue: '곡식을 찧거나 가루를 내고 떡을 빚는 곳', category: '생활' },
  { direction: 'across', row: 6, col: 8, answer: '청포도', clue: '푸른빛을 띤 달콤하고 싱그러운 포도', category: '음식' },
  { direction: 'across', row: 8, col: 1, answer: '간장', clue: '메주를 소금물에 담가 발효시켜 만든 우리 전통 기본 양념', category: '음식' },
  { direction: 'across', row: 8, col: 5, answer: '도토리', clue: '참나무 열매로 다람쥐가 좋아하는 먹이', category: '자연' },
  { direction: 'across', row: 8, col: 10, answer: '도화지', clue: '그림을 그리는 하얗고 도톰한 종이', category: '예술' },
  { direction: 'across', row: 10, col: 0, answer: '장구', clue: '양쪽에 가죽을 대고 채로 치는 우리 고유의 타악기', category: '음악' },
  { direction: 'across', row: 10, col: 4, answer: '토마토', clue: '빨갛게 익으면 의사의 얼굴이 파래진다는 건강 채소', category: '음식' },
  { direction: 'across', row: 10, col: 9, answer: '지도자', clue: '무리나 조직을 바른 길로 이끌어 가는 사람', category: '사회' },
  { direction: 'across', row: 12, col: 3, answer: '해돋이', clue: '동쪽 지평선이나 수평선 위로 아침 해가 솟아오름', category: '자연' },
  { direction: 'across', row: 12, col: 8, answer: '자전거', clue: '두 발로 페달을 밟아 바퀴를 굴리는 탈것', category: '생활' },

  // Down
  // Intersecting H1 (0,1 '바') and H3 (2,1 '바')
  { direction: 'down', row: 0, col: 1, answer: '바다바람', clue: '바다 쪽에서 육지로 불어오는 시원하고 짭짤한 바람', category: '자연' },
  // Intersecting H2 (0,6 '사') and H4 (2,7 '람') -> wait: H2(0,6) is '눈사람' so col 5='눈', col 6='사', col 7='람'!
  // at (0,7): H2 is '람'. At (2,7): H4 is '람'.
  { direction: 'down', row: 0, col: 7, answer: '람보르기니', clue: '황소 엠블럼으로 유명한 이탈리아의 고급 스포츠카', category: '문화' }, // let's use 순우리말 or common noun: '사람마음' (0,7 '람' x -> wait, '보람'?)
];
