const { validatePuzzle } = require('./validator.cjs');

// Let's create Stage 1 (22 words)
const stage1Words = [
  // H1
  { direction: 'across', row: 0, col: 0, answer: '호랑이', clue: '용맹하고 날렵하며 줄무늬를 가진 백수의 왕', category: '동물' },
  // V1 intersects H1 at (0, 2, '이')
  { direction: 'down', row: 0, col: 2, answer: '이슬비', clue: '실처럼 아주 가늘고 잘게 내리는 비', category: '자연' },
  // H2 intersects V1 at (2, 2, '비')
  { direction: 'across', row: 2, col: 2, answer: '비눗방울', clue: '빨대로 불면 공중에 둥실 떠오르는 무지갯빛 방울', category: '놀이' },
  // V2 intersects H2 at (2, 4, '방')
  { direction: 'down', row: 2, col: 4, answer: '방앗간', clue: '곡식을 찧거나 가루를 내고 떡을 빚는 곳', category: '생활' },
  // H3 intersects V2 at (4, 4, '간')
  { direction: 'across', row: 4, col: 4, answer: '간장게장', clue: '달고 짭조름한 간장에 게를 절인 밥도둑 반찬', category: '음식' },
  // V3 intersects H3 at (4, 7, '장')
  { direction: 'down', row: 4, col: 7, answer: '장구채', clue: '우리 전통 타악기인 장구를 칠 때 손에 쥐는 채', category: '음악' },
  // H4 intersects V3 at (6, 7, '채')
  { direction: 'across', row: 6, col: 7, answer: '채송화', clue: '붉고 노란 작은 꽃이 땅을 덮으며 피는 한해살이풀', category: '식물' },
  // V4 intersects H4 at (6, 9, '화')
  { direction: 'down', row: 6, col: 9, answer: '화선지', clue: '붓글씨나 수묵화를 그릴 때 먹물이 잘 스미는 얇은 종이', category: '문화' },
  // H5 intersects V4 at (8, 9, '지')
  { direction: 'across', row: 8, col: 7, answer: '단무지', clue: '무를 절여 만든 노랗고 아삭아삭한 절임 반찬', category: '음식' },
  // V5 intersects H5 at (8, 7, '단')
  { direction: 'down', row: 8, col: 7, answer: '단풍나무', clue: '가을이면 잎이 붉고 곱게 물드는 나무', category: '식물' },
  // H6 intersects V5 at (11, 7, '무')
  { direction: 'across', row: 11, col: 6, answer: '나무꾼', clue: '전래동화에서 사슴을 숨겨 주고 선녀의 옷을 얻은 인물', category: '이야기' },
  // V6 intersects H6 at (11, 6, '나')
  { direction: 'down', row: 10, col: 6, answer: '개나리', clue: '이른 봄에 노란 꽃망울을 피우며 봄을 알리는 꽃나무', category: '식물' },
  // H7 intersects V6 at (10, 6, '개')
  { direction: 'across', row: 10, col: 4, answer: '무지개', clue: '비 온 뒤 하늘에 반원형으로 걸리는 일곱 빛깔 아치', category: '자연' },
  // V7 intersects H7 at (10, 4, '무')
  { direction: 'down', row: 9, col: 4, answer: '백무궁', clue: '순백의 고결한 꽃잎을 가진 무궁화의 한 품종', category: '식물' }, // let's use '풀무치' or '고구마' -> at (10,4 '무'): row 8 '고', row 9 '구', row 10 '마'? No, (10,4) is '무'. '열무김치' row 8 '열', row 9 '무'(at 9,4), not 10.
];
