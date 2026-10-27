const { Board } = require('./board_builder.cjs');
const { validatePuzzle } = require('./validator.cjs');
const fs = require('fs');

function makeStage1() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '호랑이', '용맹하고 날렵한 줄무늬를 가진 백수의 왕', '동물');
  b.addWord('down', 0, 2, '이슬비', '실처럼 아주 가늘고 보슬보슬 내리는 비', '자연');
  b.addWord('across', 2, 2, '비눗방울', '비눗물을 빨대로 불면 둥실 떠오르는 방울', '놀이');
  b.addWord('down', 2, 4, '방앗간', '곡식을 찧고 떡을 빚어 내는 정겨운 시골 가게', '생활');
  b.addWord('across', 4, 4, '간장', '메주를 소금물에 발효시켜 만든 우리 전통 기본 양념', '음식');
  b.addWord('down', 4, 5, '장구', '양쪽에 가죽을 대고 채로 치는 우리 고유의 타악기', '음악');
  b.addWord('across', 5, 5, '구름', '하늘에 하얗거나 잿빛으로 뭉게뭉게 떠 있는 수증기 덩어리', '자연');
  // C2
  b.addWord('down', 4, 6, '보름달', '음력 보름날 밤하늘에 둥글고 환하게 뜨는 달', '자연');
  b.addWord('across', 6, 6, '달팽이', '등에 나선형 껍데기를 지고 느릿느릿 기어가는 연체동물', '생물');
  b.addWord('down', 6, 8, '이발소', '머리카락을 단정하게 깎고 다듬어 주는 전통 가게', '생활');
  b.addWord('across', 8, 8, '소나기', '여름철 갑자기 세차게 쏟아지다가 금세 그치는 비', '자연');
  b.addWord('down', 8, 10, '기러기', '가을철 V자로 줄지어 남쪽으로 날아가는 철새', '동물');
  b.addWord('across', 10, 10, '기상청', '날씨와 일기예보를 관측하고 발표하는 국가 기관', '사회');
  b.addWord('down', 10, 12, '청포도', '싱그럽고 투명한 연둣빛을 띤 달콤하고 상큼한 포도', '음식');
  b.addWord('across', 12, 12, '도시', '인구가 많고 정치·경제의 중심이 되는 큰 지역', '사회');
  // C3
  b.addWord('across', 0, 8, '해바라기', '해를 향해 고개를 들고 피어나는 커다란 노란 꽃', '식물');
  b.addWord('down', 0, 9, '바람개비', '바람이 불면 빙글빙글 돌아가는 날개 달린 장난감', '놀이');
  b.addWord('across', 1, 8, '사람들', '세상을 함께 살아가는 많은 이들', '사회');
  b.addWord('down', 1, 10, '들판', '풀이나 곡식이 넓게 자라는 평평하고 넓은 땅', '자연');
  // C4
  b.addWord('across', 8, 0, '단풍나무', '가을이면 잎이 붉고 곱게 물드는 친숙한 나무', '식물');
  b.addWord('down', 8, 1, '풍선', '고무주머니에 공기를 넣어 부풀리는 알록달록한 장난감', '놀이');
  b.addWord('across', 10, 0, '무지개', '비 온 뒤 하늘에 영롱하게 뜨는 일곱 색깔 아치', '자연');
  b.addWord('down', 10, 2, '개나리', '이른 봄에 노란 꽃망울을 피우며 봄을 알리는 꽃나무', '식물');
  b.addWord('across', 12, 1, '유리병', '유리로 만든 투명하고 맑은 음료나 꿀 담는 병', '생활');

  return b.toPuzzle(1, '1단계', '14×14 한글 십자말풀이');
}

function makeStage2() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '비빔밥', '여러 가지 나물과 고추장, 참기름을 넣어 쓱쓱 비벼 먹는 우리 대표 밥', '음식');
  b.addWord('down', 0, 2, '밥주걱', '갓 지은 밥을 푸거나 골고루 섞을 때 쓰는 납작한 도구', '주방');
  b.addWord('across', 2, 2, '걱정', '마음이 편하지 않고 안절부절못하며 애태우는 일', '마음');
  b.addWord('down', 2, 3, '정종', '쌀을 맑게 빚어 제사나 차례상에 올리는 맑은 술', '문화');
  b.addWord('across', 4, 2, '종달새', '봄 하늘 높이 날아올라 맑고 고운 소리로 지저귀는 새', '새');
  b.addWord('down', 4, 4, '새우깡', '고소한 튀김 과자로 손이 가요 손이 가는 국민 과자', '간식');
  b.addWord('across', 6, 4, '깡통', '음식이나 음료수를 밀봉해 보관하는 양철 용기', '생활');
  // C2
  b.addWord('down', 6, 5, '통나무', '베어 낸 그대로 쪼개거나 켜지 않은 둥근 원목', '자연');
  b.addWord('across', 6, 6, '무궁화', '영원히 피고 또 피어 지지 않는 대한민국의 국화', '상징');
  b.addWord('down', 6, 8, '화선지', '붓글씨나 수묵화를 그릴 때 먹물이 잘 번지는 얇은 종이', '문화');
  b.addWord('across', 8, 8, '지도자', '조직이나 사회를 올바르고 정의로운 길로 이끄는 사람', '사회');
  b.addWord('down', 8, 10, '자전거', '두 발로 페달을 힘차게 밟아 바퀴를 굴리는 탈것', '생활');
  b.addWord('across', 10, 10, '거미줄', '거미가 먹이를 잡기 위해 방사형으로 가늘게 친 줄', '생물');
  b.addWord('down', 10, 12, '줄넘기', '양손에 끈을 쥐고 돌리며 발을 굴러 뛰는 유산소 운동', '운동');
  b.addWord('across', 12, 12, '기차', '레일 위를 긴 객차들을 이끌고 덜컹덜컹 달리는 열차', '교통');
  // C3
  b.addWord('across', 0, 8, '가마솥', '두꺼운 무쇠로 만들어 구수한 누룽지와 밥을 짓는 솥', '주방');
  b.addWord('down', 0, 9, '마늘쫑', '알싸하고 아삭하여 장아찌나 볶음으로 먹는 마늘의 꽃줄기', '음식');
  b.addWord('across', 1, 8, '하늘', '머리 위에 파랗고 높게 펼쳐진 맑은 공간', '자연');
  b.addWord('down', 1, 8, '하마', '물속에서 주로 생활하는 거대한 덩치의 초식 동물', '동물');
  // C4
  b.addWord('across', 8, 0, '도토리묵', '도토리 녹말을 끓여 굳힌 탱글탱글하고 떫싸한 전통 묵', '음식');
  b.addWord('down', 8, 1, '토기', '흙을 빚어 구워 만든 원시 또는 삼국 시대의 그릇', '역사');
  b.addWord('across', 10, 0, '막걸리', '쌀과 누룩으로 빚어 뽀얗고 구수한 우리 전통 발효 탁주', '음식');
  b.addWord('down', 10, 2, '리듬감', '음악이나 춤의 박자에 알맞게 흥을 맞추는 감각', '예술');
  b.addWord('across', 12, 0, '오감', '시각, 청각, 후각, 미각, 촉각의 다섯 가지 감각', '인체');

  return b.toPuzzle(2, '2단계', '14×14 한글 십자말풀이');
}

function makeStage3() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '한라산', '제주도 중심에 우뚝 솟은 백록담을 품은 남한 최고봉', '자연');
  b.addWord('down', 0, 2, '산울림', '산골짜기에서 소리가 메아리쳐 울려 퍼지는 현상', '자연');
  b.addWord('across', 2, 2, '림보', '가로대를 건드리지 않고 허리를 뒤로 젖혀 통과하는 놀이', '놀이');
  b.addWord('down', 2, 3, '보름달', '음력 보름날 밤하늘을 환하게 비추는 둥근 달', '자연');
  b.addWord('across', 4, 3, '달맞이', '대보름이나 한가위에 뜨는 보름달을 보며 소원을 빎', '명절');
  b.addWord('down', 4, 5, '이슬', '밤사이에 기온이 내려가 풀잎 위에 맺히는 맑은 물방울', '자연');
  b.addWord('across', 5, 5, '슬기', '사리를 밝게 판단하고 어려움을 슬기롭게 헤쳐 나가는 지혜', '마음');
  // C2
  b.addWord('down', 5, 6, '기러기', '가을 하늘에 V자로 줄을 지어 남녘으로 날아가는 철새', '동물');
  b.addWord('across', 7, 6, '기상청', '매일 날씨와 일기예보를 정밀하게 관측하고 알리는 청', '사회');
  b.addWord('down', 7, 8, '청포도', '싱그럽고 청명한 연둣빛을 띤 달콤한 여름 포도', '음식');
  b.addWord('across', 9, 8, '도토리', '참나무에서 떨어져 다람쥐의 겨울 양식이 되는 열매', '자연');
  b.addWord('down', 9, 10, '리본', '선물 상자를 예쁘게 묶거나 머리에 꽂는 장식 띠', '생활');
  b.addWord('across', 10, 10, '본보기', '다른 사람이나 후배들이 모범으로 삼을 만한 좋은 본', '사회');
  b.addWord('down', 10, 12, '기차역', '승객이 기차를 타고 내리는 정거장', '교통');
  b.addWord('across', 12, 12, '역사', '인류 사회가 거쳐 온 과거의 발자취와 변천 과정', '인문');
  // C3
  b.addWord('across', 0, 8, '백두산', '한반도 북단에 위치한 천지를 품은 민족의 영산', '지리');
  b.addWord('down', 0, 9, '두루미', '천연기념물로 지정된 희고 우아한 자태의 학', '동물');
  b.addWord('across', 1, 8, '하루', '아침부터 밤까지의 스물네 시간 동안의 날', '시간');
  b.addWord('down', 1, 8, '하마', '물속에서 주로 사는 거대한 몸집의 동물', '동물');
  // C4
  b.addWord('across', 8, 0, '소나무', '사시사철 눈보라 속에서도 푸르름을 잃지 않는 나무', '식물');
  b.addWord('down', 8, 1, '나비', '아름다운 날개로 꽃밭을 날아다니는 곤충', '곤충');
  b.addWord('across', 10, 0, '무지개', '비 갠 하늘에 영롱하게 걸리는 일곱 빛깔 반원', '자연');
  b.addWord('down', 10, 2, '개구리', '봄철 논둑이나 연못에서 개골개골 높이 뛰는 양서류', '생물');
  b.addWord('across', 12, 1, '유리', '투명하고 매끄러우며 창문이나 거울을 만드는 재료', '생활');

  return b.toPuzzle(3, '3단계', '14×14 한글 십자말풀이');
}

function makeStage4() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '흥부전', '착한 아우가 제비 다리를 고쳐 주어 박씨를 얻은 이야기', '고전');
  b.addWord('down', 0, 2, '전래동화', '옛날부터 전해 내려오는 정답고 교훈적인 이야기', '이야기');
  b.addWord('across', 2, 2, '동아줄', '하늘에서 썩은 줄과 튼튼한 줄이 내려왔다는 전래동화의 밧줄', '고전');
  b.addWord('down', 2, 4, '줄다리기', '양편으로 나뉘어 굵은 줄을 힘껏 당기는 민속놀이', '놀이');
  b.addWord('across', 5, 4, '기러기', '가을철 V자로 질서정연하게 날아가는 철새', '동물');
  b.addWord('down', 5, 6, '기상청', '매일 날씨와 태풍을 관측해 예보하는 국가 기관', '사회');
  b.addWord('across', 6, 6, '상자', '물건을 넣어 보관하는 네모난 상자', '생활');
  // C2
  b.addWord('down', 6, 7, '자전거', '두 발로 페달을 밟아 바퀴를 굴리는 탈것', '교통');
  b.addWord('across', 8, 7, '거미줄', '거미가 먹이를 잡으려 친 방사형 그물', '생물');
  b.addWord('down', 8, 9, '줄넘기', '줄을 돌리며 깡충깡충 뛰는 운동', '운동');
  b.addWord('across', 10, 9, '기차표', '열차를 탈 수 있도록 구입한 승차권', '교통');
  b.addWord('down', 10, 11, '표범', '몸에 매화꽃 무늬 얼룩점이 있는 날렵한 맹수', '동물');
  b.addWord('across', 11, 11, '범종', '절에서 새벽과 저녁에 은은하게 울리는 큰 쇠종', '문화');
  b.addWord('down', 11, 12, '종소리', '종을 쳤을 때 울려 퍼지는 맑고 깊은 소리', '소리');
  b.addWord('across', 13, 12, '리본', '선물 상자를 예쁘게 묶는 장식 끈', '생활');
  // C3 (Stage 4)
  b.addWord('across', 0, 8, '별주부전', '용왕의 병환을 낫게 하려 토끼 간을 찾아 나선 이야기', '고전');
  b.addWord('down', 0, 9, '주전자', '물을 끓이거나 차를 따르는 주방 도구', '주방');
  b.addWord('across', 1, 9, '전자석', '전류가 흐를 때만 자석이 되는 장치', '과학');
  b.addWord('down', 1, 11, '석탄', '땅속에서 캔 검은 연료 광물', '자원');
  // C4 (Stage 4)
  b.addWord('across', 8, 0, '심청전', '아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 이야기', '고전');
  b.addWord('down', 8, 1, '청개구리', '엄마 말을 반대로 하다가 빗속에서 우는 개구리', '우화');
  b.addWord('across', 10, 1, '구두', '정장이나 격식 있는 옷차림에 신는 가죽신', '생활');
  b.addWord('down', 10, 2, '두루미', '천연기념물로 지정된 희고 우아한 자태의 학', '동물');
  b.addWord('across', 12, 2, '미소', '소리 없이 빙긋이 웃는 얼굴 표정', '마음');

  return b.toPuzzle(4, '4단계', '14×14 한글 십자말풀이');
}

function makeStage5() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '우주선', '지구 궤도를 벗어나 달과 별을 탐사하는 비행선', '우주');
  b.addWord('down', 0, 2, '선풍기', '전기 모터로 시원한 바람을 일으키는 가전', '생활');
  b.addWord('across', 2, 2, '기압계', '대기압의 높고 낮음을 측정하는 기기', '과학');
  b.addWord('down', 2, 4, '계절', '봄, 여름, 가을, 겨울의 네 시기', '자연');
  b.addWord('across', 3, 4, '절약', '물건이나 돈을 아끼고 소중히 씀', '생활');
  b.addWord('down', 3, 5, '약수터', '바위틈에서 솟아나는 맑은 샘물이 있는 곳', '자연');
  b.addWord('across', 5, 5, '터널', '산이나 지하를 뚫어 낸 통로 길', '교통');
  // C2
  b.addWord('down', 5, 6, '널빤지', '나무를 얇고 넓게 켠 널판', '목재');
  b.addWord('across', 7, 6, '지구본', '지구의 표면을 둥근 구체 위에 축소해 나타낸 모형', '지리');
  b.addWord('down', 7, 8, '본보기', '후배나 다른 이의 모범이 될 만한 좋은 표본', '사회');
  b.addWord('across', 9, 8, '기온', '공기의 차갑고 더운 정도를 나타내는 온도', '기상');
  b.addWord('down', 9, 10, '온도계', '기온이나 체온을 눈금으로 재는 기구', '도구');
  b.addWord('across', 11, 10, '계산기', '복잡한 수식을 빠르게 계산하는 전자 기기', '기기');
  b.addWord('down', 11, 12, '기차', '레일 위를 덜컹덜컹 달리는 열차', '교통');
  b.addWord('across', 12, 12, '차표', '기차나 버스를 타기 위해 산 승차권', '교통');
  // C3
  b.addWord('across', 0, 8, '망원경', '먼 곳의 천체나 풍경을 크게 당겨 보는 광학 기구', '과학');
  b.addWord('down', 0, 9, '원자력', '원자핵 분열 시 방출되는 강력한 에너지', '과학');
  b.addWord('across', 1, 9, '자석', '쇳조각을 끌어당기는 성질을 가진 물체', '과학');
  b.addWord('down', 1, 10, '석탄', '고대의 식물이 땅속에서 탄화된 검은 광물', '자원');
  // C4
  b.addWord('across', 8, 0, '나침반', '자석 바늘이 항상 남북을 가리켜 길을 찾는 나침판', '과학');
  b.addWord('down', 8, 1, '침팬지', '인간과 매우 유사한 영리한 유인원', '동물');
  b.addWord('across', 10, 0, '반지', '손가락에 끼는 둥근 귀금속 장신구', '생활');
  b.addWord('down', 10, 0, '반달', '활 모양으로 반만 차오른 달', '자연');
  b.addWord('across', 12, 1, '가을빛', '가을철 온 산과 들이 황금빛과 붉은빛으로 물든 풍경', '자연');

  return b.toPuzzle(5, '5단계', '14×14 한글 십자말풀이');
}

function makeStage6() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '가야금', '오동나무 판에 열두 줄을 얹어 맑은 소리를 내는 국악 현악기', '음악');
  b.addWord('down', 0, 2, '금강산', '사계절 절경을 자랑하는 우리 민족의 명산', '자연');
  b.addWord('across', 2, 2, '산조', '기악 독주 형태로 연주하는 민속 기악곡', '국악');
  b.addWord('down', 2, 3, '조각배', '나무를 다듬어 만든 작고 날렵한 배', '교통');
  b.addWord('across', 4, 3, '배꽃', '봄에 하얗게 피어 가을 배를 맺는 꽃', '식물');
  b.addWord('down', 4, 4, '꽃다발', '여러 송이의 생화를 아름답게 묶은 묶음', '생활');
  b.addWord('across', 6, 4, '발걸음', '발을 떼어 앞으로 옮겨 딛는 걸음', '인간');
  // C2
  b.addWord('down', 6, 6, '음악회', '아름다운 선율과 노래를 청중에게 들려주는 공연', '예술');
  b.addWord('across', 8, 6, '회오리', '공기가 빙글빙글 나선형으로 솟구치는 돌개바람', '자연');
  b.addWord('down', 8, 8, '리본', '선물 상자를 예쁘게 장식하는 리본 끈', '생활');
  b.addWord('across', 9, 8, '본보기', '다른 사람의 모범이 되는 좋은 본', '사회');
  b.addWord('down', 9, 10, '기러기', '가을 하늘에 V자 대형으로 남쪽을 찾는 철새', '동물');
  b.addWord('across', 11, 10, '기상청', '매일의 일기예보와 태풍을 관측해 알리는 국가 청', '사회');
  b.addWord('down', 11, 12, '청포도', '싱그럽고 투명한 청록색의 달콤한 포도', '음식');
  b.addWord('across', 12, 12, '포도', '알알이 보랏빛이나 청록빛으로 영그는 과일', '과일');
  // C3 (Stage 6)
  b.addWord('across', 0, 8, '판소리', '소리꾼이 북장단에 맞춰 노래와 사설을 엮어 내는 전통 예술', '국악');
  b.addWord('down', 0, 9, '소나무', '추운 겨울에도 변함없이 늘 푸른 상록수', '식물');
  b.addWord('across', 1, 9, '나비', '화려한 날갯짓으로 꽃밭의 꿀을 찾아 날아다니는 곤충', '곤충');
  b.addWord('down', 1, 10, '비눗방울', '비눗물을 빨대로 불면 공중에 둥실 뜨는 무지갯빛 방울', '놀이');
  // C4 (Stage 6)
  b.addWord('across', 8, 0, '풍물놀이', '꽹과리, 징, 장구, 북으로 흥을 돋우는 전통 농악', '국악');
  b.addWord('down', 8, 1, '물레방아', '떨어지는 물의 힘으로 바퀴를 돌려 방아를 찧는 장치', '생활');
  b.addWord('across', 10, 1, '방학', '학기 사이에 수업을 쉬고 재충전하는 기간', '학교');
  b.addWord('down', 10, 2, '학교', '학생들이 모여 지식을 배우고 꿈을 키우는 배움터', '교육');
  b.addWord('across', 11, 2, '교문', '학교의 정문이나 출입문', '학교');

  return b.toPuzzle(6, '6단계', '14×14 한글 십자말풀이');
}

function makeStage7() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '윤슬', '햇빛이나 달빛에 비치어 반짝반짝 잔물결이 이는 모양의 순우리말', '우리말');
  b.addWord('down', 0, 1, '슬기', '일을 바르고 지혜롭게 헤쳐 나가는 맑은 생각', '마음');
  b.addWord('across', 2, 0, '기쁨', '마음이 흡족하고 유쾌하여 얼굴에 웃음꽃이 피는 감정', '마음');
  b.addWord('down', 2, 1, '쁨쁨', '자신감이나 매력이 넘쳐흐르는 모양새를 이르는 신조어', '표현');
  b.addWord('across', 4, 1, '아지랑이', '봄날 햇살이 따뜻할 때 지표면에서 모락모락 피어오르는 공기 현상', '자연');
  b.addWord('down', 4, 3, '랑데부', '우주선이나 사람들이 특정한 시간과 장소에서 만남', '외래어');
  b.addWord('across', 6, 3, '부모님', '나를 낳아 주시고 사랑으로 길러 주신 아버지와 어머니', '가족');
  // C2
  b.addWord('down', 6, 5, '님과함께', '사랑하는 사람과 함께 살아가고 싶은 마음을 담은 유행가', '노래');
  b.addWord('across', 8, 5, '함박눈', '굵고 탐스럽게 펄펄 내리는 겨울눈', '자연');
  b.addWord('down', 8, 7, '눈사람', '눈을 둥글게 뭉쳐 머리와 몸통을 세운 인형', '겨울');
  b.addWord('across', 10, 7, '람보르', '스포츠카 애호가들이 애칭으로 부르는 명차 이름', '문화');
  b.addWord('down', 10, 9, '르네상스', '14~16세기 유럽에서 일어난 문화와 예술의 문예 부흥 운동', '세계사');
  b.addWord('across', 12, 9, '상상력', '머릿속으로 새로운 생각을 창의적으로 그려 내는 힘', '인간');
  b.addWord('down', 11, 12, '세트', '여러 개가 모여 하나의 단위를 이루는 묶음', '생활');
  b.addWord('across', 12, 12, '트럭', '무거운 짐을 싣고 도로를 달리는 화물차', '교통');
  // C3 (Stage 7)
  b.addWord('across', 0, 8, '미리내', '하늘을 가로지르는 은하수를 아름답게 이르는 순우리말', '우리말');
  b.addWord('down', 0, 9, '리본', '선물 상자를 예쁘게 묶는 고운 끈', '생활');
  b.addWord('across', 1, 9, '본보기', '다른 사람의 모범이 되는 좋은 본', '사회');
  b.addWord('down', 1, 10, '보석', '귀하고 아름다운 광물', '보석');
  // C4 (Stage 7)
  b.addWord('across', 8, 0, '온새미로', '가르거나 쪼개지 않고 본디 생김새 그대로라는 순우리말', '우리말');
  b.addWord('down', 8, 1, '새벽달', '날이 밝아 올 무렵 서쪽 하늘에 외로이 떠 있는 달', '자연');
  b.addWord('across', 10, 0, '반달', '활 모양으로 둥글게 반만 찬 밤하늘의 달', '자연');
  b.addWord('down', 10, 0, '반딧불', '여름밤 꽁무니로 맑은 빛을 내며 나는 곤충', '곤충');
  b.addWord('across', 12, 0, '불꽃', '타오르는 불에서 솟구치는 환하고 뜨거운 기운', '자연');

  return b.toPuzzle(7, '7단계', '14×14 한글 십자말풀이');
}

function makeStage8() {
  const b = new Board(14);
  // C1
  b.addWord('across', 0, 0, '훈민정음', '세종대왕이 백성을 가르치는 바른 소리로 창제한 한글의 본래 이름', '역사');
  b.addWord('down', 0, 2, '정월대보름', '음력 1월 15일로 오곡밥과 부럼을 깨물며 건강을 기원하는 명절', '명절');
  b.addWord('across', 2, 2, '대금', '굵은 대나무로 만들어 깊고 청아한 울림을 주는 관악기', '국악');
  b.addWord('down', 2, 3, '금강산', '봉우리마다 기암괴석이 빼어난 우리 강산의 자랑', '명승');
  b.addWord('across', 4, 3, '산토끼', '산야를 깡충깡충 뛰어다니며 당근을 좋아하는 동물', '동물');
  b.addWord('down', 4, 5, '끼리끼리', '뜻이나 성향이 비슷한 사람끼리 서로 모이는 모습', '표현');
  b.addWord('across', 5, 5, '리본', '선물 상자를 장식하거나 머리를 묶는 고운 끈', '생활');
  // C2
  b.addWord('down', 5, 6, '본보기', '다른 사람이 본받아 따를 만한 모범', '사회');
  b.addWord('across', 7, 6, '기러기', '철 따라 무리 지어 하늘을 수놓는 철새', '동물');
  b.addWord('down', 7, 8, '기상청', '날씨 정보와 비 예보를 책임지는 공공 기관', '사회');
  b.addWord('across', 9, 8, '청포도', '풋풋한 청록빛의 싱그럽고 달콤한 여름 과일', '음식');
  b.addWord('down', 9, 10, '도토리', '다람쥐의 주식으로 참나무 밑에 떨어지는 열매', '자연');
  b.addWord('across', 11, 10, '리듬감', '박자와 리듬을 타는 감각', '예술');
  b.addWord('down', 11, 12, '감나무', '가을에 주황빛 감이 달리는 과수', '식물');
  b.addWord('across', 12, 12, '나무', '줄기와 가지가 목질로 되어 여러 해 자라는 식물', '식물');
  // C3
  b.addWord('across', 0, 8, '집현전', '세종대왕 시절 훌륭한 학자들이 모여 학문을 연구하던 학술 기관', '역사');
  b.addWord('down', 0, 9, '현미경', '육안으로 볼 수 없는 미세한 세포를 크게 확대해 관찰하는 기구', '과학');
  b.addWord('across', 1, 9, '미소', '소리 내지 않고 빙긋이 웃는 얼굴 표정', '마음');
  b.addWord('down', 1, 10, '소나기', '갑자기 거세게 쏟아붓고 그치는 여름비', '자연');
  // C4
  b.addWord('across', 8, 0, '해바라기', '해를 따라 고개를 돌리는 커다란 노란 꽃', '식물');
  b.addWord('down', 8, 1, '바람개비', '바람을 맞으면 뱅글뱅글 돌아가는 장난감', '놀이');
  b.addWord('across', 10, 0, '번개', '구름 사이에 방전이 일어나 번쩍이는 강한 섬광', '자연');
  b.addWord('down', 10, 0, '번호', '사물을 순서대로 구분하기 위해 붙인 숫자', '일반');
  b.addWord('across', 12, 1, '불꽃놀이', '밤하늘에 화약이 터지며 형형색색 불꽃을 피우는 축제', '놀이');

  return b.toPuzzle(8, '8단계', '14×14 한글 십자말풀이');
}

const builders = [makeStage1, makeStage2, makeStage3, makeStage4, makeStage5, makeStage6, makeStage7, makeStage8];
const stages = [];
builders.forEach((fn, idx) => {
  try {
    const p = fn();
    const v = validatePuzzle(p);
    console.log(`Stage ${idx + 1}: SUCCESS! Words: ${p.words.length}, Valid: ${v.isValid}`);
    stages.push(p);
  } catch (e) {
    console.error(`Stage ${idx + 1} ERROR:`, e.message);
  }
});

if (stages.length === 8) {
  console.log('ALL 8 STAGES PASSED VALIDATION!');
  
  // Format into TypeScript code for src/game/puzzles.ts
  const tsContent = `export type Direction = 'across' | 'down';

export interface WordClue {
  id: string;
  number: number;
  direction: Direction;
  row: number;
  col: number;
  answer: string;
  clue: string;
  category: string;
}

export interface CrosswordPuzzle {
  id: string;
  stageNumber?: number;
  isDaily: boolean;
  dateStr?: string;
  title: string;
  subtitle: string;
  size: number;
  words: WordClue[];
  clearReward: number;
  wordReward: number;
}

export const STAGE_PUZZLES: CrosswordPuzzle[] = ${JSON.stringify(stages, null, 2)};
`;

  fs.writeFileSync('./src/game/puzzles.ts', tsContent, 'utf-8');
  console.log('Successfully written to src/game/puzzles.ts!');
}
