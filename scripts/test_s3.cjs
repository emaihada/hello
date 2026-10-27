const { Board } = require('./board_builder.cjs');

function testStage3() {
  const b = new Board(14);
  // Cluster 1 (Top Left)
  b.addWord('across', 0, 0, '한라산', '제주도 중심에 우뚝 솟은 백록담을 품은 남한 최고봉', '자연');
  b.addWord('down', 0, 2, '산울림', '산골짜기에서 소리가 메아리쳐 울려 퍼지는 현상', '자연');
  b.addWord('across', 2, 2, '림보', '가로대를 건드리지 않고 허리를 뒤로 젖혀 통과하는 놀이', '놀이');
  b.addWord('down', 2, 3, '보름달', '음력 보름날 밤하늘을 환하게 비추는 둥근 달', '자연');
  b.addWord('across', 4, 3, '달맞이', '대보름이나 한가위에 뜨는 보름달을 보며 소원을 빎', '명절'); // row 4 col 3 is '달', col 4 '맞', col 5 '이'
  b.addWord('down', 4, 5, '이슬', '밤사이에 기온이 내려가 풀잎 위에 맺히는 맑은 물방울', '자연'); // row 4 col 5 is '이', row 5 col 5 is '슬'
  b.addWord('across', 5, 5, '슬기', '사리를 밝게 판단하고 어려움을 슬기롭게 헤쳐 나가는 지혜', '마음');

  // Cluster 2 (Center)
  b.addWord('down', 5, 6, '기러기', '가을 하늘에 V자로 줄을 지어 남녘으로 날아가는 철새', '동물'); // row 5 col 6 '기', row 6 col 6 '러', row 7 col 6 '기'
  b.addWord('across', 7, 6, '기상청', '매일 날씨와 일기예보를 정밀하게 관측하고 알리는 청', '사회'); // row 7 col 6 '기', col 7 '상', col 8 '청'
  b.addWord('down', 7, 8, '청포도', '싱그럽고 청명한 연둣빛을 띤 달콤한 여름 포도', '음식'); // row 7 col 8 '청', row 8 col 8 '포', row 9 col 8 '도'
  b.addWord('across', 9, 8, '도토리', '참나무에서 떨어져 다람쥐의 겨울 양식이 되는 열매', '자연'); // row 9 col 8 '도', col 9 '토', col 10 '리'
  b.addWord('down', 9, 10, '리본', '선물 상자를 예쁘게 묶거나 머리에 꽂는 장식 띠', '생활'); // row 9 col 10 '리', row 10 col 10 '본'
  b.addWord('across', 10, 10, '본보기', '다른 사람이나 후배들이 모범으로 삼을 만한 좋은 본', '사회'); // row 10 col 10 '본', col 11 '보', col 12 '기'
  b.addWord('down', 10, 12, '기차역', '승객이 기차를 타고 내리는 정거장', '교통'); // row 10 col 12 '기', row 11 col 12 '차', row 12 col 12 '역'
  b.addWord('across', 12, 12, '역사', '인류 사회가 거쳐 온 과거의 발자취와 변천 과정', '인문'); // row 12 col 12 '역', col 13 '사'

  // Cluster 3 (Top Right)
  b.addWord('across', 0, 8, '백두산', '한반도 북단에 위치한 천지를 품은 민족의 영산', '지리');
  b.addWord('down', 0, 9, '두루미', '천연기념물로 지정된 희고 우아한 자태의 학', '동물');
  b.addWord('across', 1, 8, '구름', '하늘에 하얗게 뭉게뭉게 피어오르는 수증기', '자연'); // (1,8 '구', 1,9 '름') matches '두루미' (0,9 '두', 1,9 '루' -> wait, '루' vs '름'!)
  // In '두루미': (1, 9) is '루'!
  // What Across at row 1 has '루' at col 9?
  // '하루' (row 1 col 8 '하', col 9 '루')!
  // And Down at (1, 8 '하'): '하마' (row 1 '하', row 2 '마')!
}

