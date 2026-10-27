const { Board } = require('./board_builder.cjs');
const { validatePuzzle } = require('./validator.cjs');
const fs = require('fs');

// We want 8 stages, each 14x14, each with 20-25 words.
// Let's create Stage 1 (22 words)
function createStage1() {
  const b = new Board(14);
  // Across words
  b.addWord('across', 0, 0, '봄바람', '봄철에 부드럽고 따뜻하게 불어오는 바람', '자연');
  b.addWord('across', 0, 8, '가을하늘', '맑고 높푸른 가을날의 상쾌한 하늘', '자연');
  b.addWord('across', 2, 2, '이슬방울', '풀잎에 맑고 영롱하게 맺힌 물방울', '자연');
  b.addWord('across', 2, 8, '해바라기', '해를 향해 고개를 들고 피어나는 노란 꽃', '식물');
  b.addWord('across', 4, 1, '호랑나비', '날개에 호랑이 같은 화려한 무늬가 있는 나비', '생물');
  b.addWord('across', 4, 6, '비눗방울', '비눗물을 빨대로 불면 둥실 떠오르는 방울', '놀이');
  b.addWord('across', 6, 0, '방앗간', '곡식을 찧고 떡을 빚어 내는 정겨운 시골 가게', '생활');
  b.addWord('across', 6, 5, '울타리', '집이나 밭의 둘레를 빙 둘러 막아 놓은 담', '생활');
  b.addWord('across', 6, 9, '기상청', '날씨와 일기예보를 관측하고 예보하는 기관', '사회');
  b.addWord('across', 8, 3, '단무지', '무를 절여 만든 노랗고 새콤달콤한 반찬', '음식');
  b.addWord('across', 8, 7, '청포도', '싱그럽고 투명한 연둣빛을 띤 달콤한 포도', '음식');
  b.addWord('across', 10, 1, '단풍나무', '가을에 붉고 곱게 잎이 물드는 단풍', '식물');
  b.addWord('across', 10, 6, '도토리', '참나무 열매로 다람쥐가 가장 좋아하는 먹이', '자연');
  b.addWord('across', 10, 10, '기러기', '가을철 V자로 줄지어 남쪽으로 날아가는 철새', '동물');
  b.addWord('across', 12, 0, '무지개', '비 온 뒤 하늘에 영롱하게 뜨는 일곱 색깔 아치', '자연');
  b.addWord('across', 12, 4, '나무꾼', '전래동화에서 사슴을 숨겨 준 착한 인물', '이야기');
  b.addWord('across', 12, 8, '리듬감', '음악의 박자에 맞춰 흥을 타는 자연스러운 감각', '예술');

  // Down words intersecting across words:
  // At (0,2 '람') in '봄바람' (0,0..2):
  // (0,2 '람', 1,2 '보', 2,2 '이'? No, (2,2) has '이')
  // Wait: at (0,2) is '람'. At (2,2) is '이'!
  // Can a 3-letter word have '람', '?', '이'?
  // '람' - '보' - '이'? No Korean word '람보이'.
  // Let's inspect coordinates before adding!
}

