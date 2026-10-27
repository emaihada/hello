const { validatePuzzle } = require('./validator.cjs');

// Let's create Stage 1 with 22 cleanly defined intersecting words
// Size: 14x14
const stage1 = {
  id: 'stage-1',
  stageNumber: 1,
  isDaily: false,
  title: '1단계',
  subtitle: '14×14 한글 십자말풀이',
  size: 14,
  wordReward: 20,
  clearReward: 150,
  words: [
    // --- Across ---
    { id: 'H1', number: 1, direction: 'across', row: 0, col: 0, answer: '봄바람', clue: '봄철에 부드럽고 따스하게 불어오는 바람', category: '자연' },
    { id: 'H2', number: 2, direction: 'across', row: 0, col: 7, answer: '가을하늘', clue: '구름 한 점 없이 높고 푸른 가을날의 하늘', category: '자연' },
    { id: 'H3', number: 3, direction: 'across', row: 2, col: 1, answer: '바람개비', clue: '바람이 불면 빙글빙글 돌아가는 날개 달린 장난감', category: '놀이' },
    { id: 'H4', number: 4, direction: 'across', row: 2, col: 8, answer: '해바라기', clue: '해를 향해 커다란 노란 꽃을 피우는 식물', category: '식물' },
    { id: 'H5', number: 5, direction: 'across', row: 4, col: 0, answer: '비눗방울', clue: '빨대로 불면 공중에 둥실 떠오르는 무지갯빛 방울', category: '놀이' },
    { id: 'H6', number: 6, direction: 'across', row: 4, col: 6, answer: '기상청', clue: '날씨와 일기예보를 관측하고 발표하는 국가 기관', category: '사회' },
    { id: 'H7', number: 7, direction: 'across', row: 4, col: 10, answer: '기러기', clue: '가을철 V자 대형으로 날아가는 대표적인 철새', category: '동물' },
    { id: 'H8', number: 8, direction: 'across', row: 6, col: 2, answer: '방앗간', clue: '곡식을 찧거나 가루를 내고 떡을 빚는 곳', category: '생활' },
    { id: 'H9', number: 9, direction: 'across', row: 6, col: 8, answer: '청포도', clue: '푸른 빛깔을 띤 달콤하고 싱그러운 포도', category: '음식' },
    { id: 'H10', number: 10, direction: 'across', row: 8, col: 1, answer: '간장게장', clue: '달고 짭조름한 간장에 게를 절인 밥도둑 반찬', category: '음식' },
    { id: 'H11', number: 11, direction: 'across', row: 8, col: 7, answer: '도토리', clue: '참나무 열매로 다람쥐가 좋아하는 먹이', category: '자연' },
    { id: 'H12', number: 12, direction: 'across', row: 10, col: 0, answer: '장구', clue: '양쪽에 가죽을 대고 채로 치는 우리 고유의 타악기', category: '음악' },
    { id: 'H13', number: 13, direction: 'across', row: 10, col: 4, answer: '무지개', clue: '비 온 뒤 하늘에 영롱하게 걸리는 일곱 빛깔 아치', category: '자연' },
    { id: 'H14', number: 14, direction: 'across', row: 10, col: 8, answer: '리듬감', clue: '음악이나 춤의 박자에 맞춰 흥을 타는 감각', category: '예술' },
    { id: 'H15', number: 15, direction: 'across', row: 12, col: 3, answer: '개나리', clue: '노란 꽃망울을 터뜨리며 봄을 가장 먼저 알리는 꽃', category: '식물' },
    { id: 'H16', number: 16, direction: 'across', row: 12, col: 8, answer: '감나무', clue: '가을이면 주황빛 단감이 주렁주렁 열리는 과일나무', category: '식물' },

    // --- Down ---
    // At (0, 1) H1 has '바'. At (2, 1) H3 has '바'.
    // (0,1 '바', 1,1 '다', 2,1 '바', 3,1 '람') -> '바다바람' (sea breeze)
    { id: 'V1', number: 17, direction: 'down', row: 0, col: 1, answer: '바다바람', clue: '바다 쪽에서 육지로 불어오는 시원하고 짭짤한 바람', category: '자연' },
    // At (2, 4) H3 has '비'. At (4, 4) H5 has '방'. Wait, H3 row 2 col 1 is '바(1) 람(2) 개(3) 비(4)'. So (2, 4) is '비'!
    // At (4, 4) H5 row 4 col 0 is '비(0) 눗(1) 방(2) 울(3)' -> col 4 is empty in H5!
    // So let's check V2 at (2, 4): '비행기' -> (2,4 '비', 3,4 '행', 4,4 '기')
    { id: 'V2', number: 18, direction: 'down', row: 2, col: 4, answer: '비행기', clue: '날개와 엔진으로 높은 하늘을 날아다니는 교통수단', category: '탈것' },
    // At (4, 6) H6 has '기'. row 4 col 6 is '기'.
    // row 4,5,6 col 6 -> '기차역' (4,6 '기', 5,6 '차', 6,6 '역')
    { id: 'V3', number: 19, direction: 'down', row: 4, col: 6, answer: '기차역', clue: '열차가 멈추어 손님이 타고 내리는 역', category: '교통' },
    // At (6, 4) H8 has '간'. row 6 col 2 is '방(2) 앗(3) 간(4)'.
    // At (8, 4) H10 row 8 col 1 is '간(1) 장(2) 게(3) 장(4)' -> col 4 is '장'!
    // Down at (6, 4): (6,4 '간', 7,4 '장', 8,4 '장' ? No, '간장' 2 letters? 6,4 '간', 7,4 '장' -> '간장' is at 6,4 and 7,4!)
    // Wait, let's write a node script that verifies all intersections and tells us exact matches!
  ]
};

console.log(validatePuzzle(stage1));
