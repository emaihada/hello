const { validatePuzzle } = require('./validator.cjs');

// Let's create Stage 1 (22 words)
const stage1 = {
  id: 'stage-1',
  stageNumber: 1,
  isDaily: false,
  title: '1단계',
  subtitle: '14x14 한글 십자말풀이',
  size: 14,
  wordReward: 20,
  clearReward: 150,
  words: [
    // Across words
    { id: 'H1', number: 1, direction: 'across', row: 0, col: 0, answer: '봄바람', clue: '봄철에 부드럽고 따스하게 불어오는 바람', category: '자연' },
    { id: 'H2', number: 2, direction: 'across', row: 0, col: 6, answer: '가을하늘', clue: '구름 한 점 없이 높고 푸른 가을날의 하늘', category: '자연' },
    { id: 'H3', number: 3, direction: 'across', row: 2, col: 2, answer: '바람개비', clue: '바람이 불면 빙글빙글 돌아가는 날개 달린 장난감', category: '놀이' },
    { id: 'H4', number: 4, direction: 'across', row: 2, col: 7, answer: '해바라기', clue: '해를 향해 커다란 노란 꽃을 피우는 식물', category: '식물' },
    { id: 'H5', number: 5, direction: 'across', row: 4, col: 0, answer: '울타리', clue: '집이나 밭의 둘레를 막아 경계를 짓는 담', category: '생활' },
    { id: 'H6', number: 6, direction: 'across', row: 4, col: 5, answer: '기상청', clue: '날씨와 일기예보를 관측하고 발표하는 국가 기관', category: '사회' },
    { id: 'H7', number: 7, direction: 'across', row: 4, col: 9, answer: '기러기', clue: '가을철 V자 대형으로 날아가는 대표적인 철새', category: '동물' },
    { id: 'H8', number: 8, direction: 'across', row: 6, col: 3, answer: '비눗방울', clue: '비눗물에 빨대를 대고 불면 공중에 둥실 떠오르는 방울', category: '놀이' },
    { id: 'H9', number: 9, direction: 'across', row: 6, col: 8, answer: '청포도', clue: '푸른 빛깔을 띤 달콤하고 상큼한 포도', category: '음식' },
    { id: 'H10', number: 10, direction: 'across', row: 8, col: 1, answer: '도토리묵', clue: '도토리 가루를 쑤어 굳힌 떫고 구수한 우리 전통 음식', category: '음식' },
    { id: 'H11', number: 11, direction: 'across', row: 8, col: 7, answer: '감나무', clue: '가을이면 주황빛 단감이 주렁주렁 열리는 과일나무', category: '식물' },
    { id: 'H12', number: 12, direction: 'across', row: 10, col: 0, answer: '무지개', clue: '비 온 뒤 하늘에 영롱하게 걸리는 일곱 빛깔 아치', category: '자연' },
    { id: 'H13', number: 13, direction: 'across', row: 10, col: 5, answer: '무궁화', clue: '영원히 피고 또 피어 지지 않는 대한민국의 국화', category: '상징' },
    { id: 'H14', number: 14, direction: 'across', row: 10, col: 9, answer: '화선지', clue: '붓글씨나 동양화를 그릴 때 먹물이 잘 번지는 얇은 종이', category: '문화' },
    { id: 'H15', number: 15, direction: 'across', row: 12, col: 3, answer: '개나리', clue: '노란 꽃망울을 터뜨리며 봄을 가장 먼저 알리는 꽃', category: '식물' },
    { id: 'H16', number: 16, direction: 'across', row: 12, col: 8, answer: '지도자', clue: '조직이나 단체를 올바른 길로 이끌어 가는 사람', category: '사회' },

    // Down words intersecting cleanly
    { id: 'V1', number: 17, direction: 'down', row: 0, col: 2, answer: '바바리', clue: '비바람을 막아 주는 품이 넉넉한 겉옷 코트', category: '생활' },
    { id: 'V2', number: 18, direction: 'down', row: 0, col: 7, answer: '늘해랑', clue: '늘 해와 함께 살아가는 밝고 강한 사람을 뜻하는 순우리말', category: '우리말' },
    { id: 'V3', number: 19, direction: 'down', row: 2, col: 5, answer: '개기월식', clue: '달이 지구의 그림자에 완전히 가려져 붉게 보이는 천문 현상', category: '과학' },
    { id: 'V4', number: 20, direction: 'down', row: 4, col: 2, answer: '리듬감', clue: '음악이나 춤의 박자에 맞춰 흥을 타는 감각', category: '예술' },
    { id: 'V5', number: 21, direction: 'down', row: 6, col: 6, answer: '울림통', clue: '악기나 소리가 깊고 풍부하게 울려 퍼지도록 울리는 공간', category: '음악' },
    { id: 'V6', number: 22, direction: 'down', row: 6, col: 10, answer: '도화지', clue: '그림을 그리는 두껍고 하얀 미술 용지', category: '문화' },
  ]
};

const res1 = validatePuzzle(stage1);
console.log('Stage 1 Valid:', res1.isValid, res1.errors);
