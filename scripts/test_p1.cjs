const { Board } = require('./board_builder.cjs');
const { validatePuzzle } = require('./validator.cjs');
const fs = require('fs');

function makeStage1() {
  const b = new Board(14);
  // Cluster 1 (Top Left)
  b.addWord('across', 0, 0, '호랑이', '용맹하고 날렵한 줄무늬를 가진 백수의 왕', '동물');
  b.addWord('down', 0, 2, '이슬비', '실처럼 아주 가늘고 보슬보슬 내리는 비', '자연');
  b.addWord('across', 2, 2, '비눗방울', '비눗물을 빨대로 불면 둥실 떠오르는 방울', '놀이');
  b.addWord('down', 2, 4, '방앗간', '곡식을 찧고 떡을 빚어 내는 정겨운 시골 가게', '생활');
  b.addWord('across', 4, 4, '간장', '메주를 소금물에 발효시켜 만든 우리 전통 기본 양념', '음식');
  b.addWord('down', 4, 5, '장구', '양쪽에 가죽을 대고 채로 치는 우리 고유의 타악기', '음악');
  b.addWord('across', 5, 5, '구름', '하늘에 하얗거나 잿빛으로 뭉게뭉게 떠 있는 수증기 덩어리', '자연');

  // Cluster 2 (Center)
  b.addWord('down', 4, 6, '보름달', '음력 보름날 밤하늘에 둥글고 환하게 뜨는 달', '자연');
  b.addWord('across', 6, 6, '달팽이', '등에 나선형 껍데기를 지고 느릿느릿 기어가는 연체동물', '생물');
  b.addWord('down', 6, 8, '이발소', '머리카락을 단정하게 깎고 다듬어 주는 전통 가게', '생활');
  b.addWord('across', 8, 8, '소나기', '여름철 갑자기 세차게 쏟아지다가 금세 그치는 비', '자연');
  b.addWord('down', 8, 10, '기러기', '가을철 V자로 줄지어 남쪽으로 날아가는 철새', '동물');
  b.addWord('across', 10, 10, '기상청', '날씨와 일기예보를 관측하고 발표하는 국가 기관', '사회');
  b.addWord('down', 10, 12, '청포도', '싱그럽고 투명한 연둣빛을 띤 달콤하고 상큼한 포도', '음식');
  b.addWord('across', 12, 12, '도시', '인구가 많고 정치·경제의 중심이 되는 큰 지역', '사회');

  // Cluster 3 (Top Right: cols 8..13, rows 0..4)
  b.addWord('across', 0, 8, '해바라기', '해를 향해 고개를 들고 피어나는 커다란 노란 꽃', '식물');
  b.addWord('down', 0, 9, '바람개비', '바람이 불면 빙글빙글 돌아가는 날개 달린 장난감', '놀이');
  b.addWord('across', 1, 8, '사람들', '세상을 함께 살아가는 많은 이들', '사회');
  b.addWord('down', 1, 10, '들판', '풀이나 곡식이 넓게 자라는 평평하고 넓은 땅', '자연');

  // Cluster 4 (Bottom Left: rows 7..13, cols 0..5)
  b.addWord('across', 8, 0, '단풍나무', '가을이면 잎이 붉고 곱게 물드는 친숙한 나무', '식물');
  b.addWord('down', 8, 1, '풍선', '고무주머니에 공기를 넣어 부풀리는 알록달록한 장난감', '놀이');
  b.addWord('across', 10, 0, '무지개', '비 온 뒤 하늘에 영롱하게 뜨는 일곱 색깔 아치', '자연');
  b.addWord('down', 10, 2, '개나리', '이른 봄에 노란 꽃망울을 피우며 봄을 알리는 꽃나무', '식물');
  b.addWord('across', 12, 1, '유리병', '유리로 만든 투명하고 맑은 음료나 꿀 담는 병', '생활');

  const puzzle = b.toPuzzle(1, '1단계', '14×14 십자말풀이');
  return puzzle;
}

const p1 = makeStage1();
console.log('Stage 1 words:', p1.words.length);
console.log('Validation:', validatePuzzle(p1));
