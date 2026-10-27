export type Direction = 'across' | 'down';

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

export const STAGE_PUZZLES: CrosswordPuzzle[] = [
  {
    "id": "stage-1",
    "stageNumber": 1,
    "isDaily": false,
    "title": "1단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "호랑이",
        "clue": "용맹하고 날렵한 줄무늬를 가진 백수의 왕",
        "category": "동물"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "이슬비",
        "clue": "실처럼 아주 가늘고 보슬보슬 내리는 비",
        "category": "자연"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "비눗방울",
        "clue": "비눗물을 빨대로 불면 둥실 떠오르는 방울",
        "category": "놀이"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 4,
        "answer": "방앗간",
        "clue": "곡식을 찧고 떡을 빚어 내는 정겨운 시골 가게",
        "category": "생활"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 4,
        "answer": "간장",
        "clue": "메주를 소금물에 발효시켜 만든 우리 전통 기본 양념",
        "category": "음식"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 5,
        "answer": "장구",
        "clue": "양쪽에 가죽을 대고 채로 치는 우리 고유의 타악기",
        "category": "음악"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 5,
        "col": 5,
        "answer": "구름",
        "clue": "하늘에 하얗거나 잿빛으로 뭉게뭉게 떠 있는 수증기 덩어리",
        "category": "자연"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 4,
        "col": 6,
        "answer": "보름달",
        "clue": "음력 보름날 밤하늘에 둥글고 환하게 뜨는 달",
        "category": "자연"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 6,
        "col": 6,
        "answer": "달팽이",
        "clue": "등에 나선형 껍데기를 지고 느릿느릿 기어가는 연체동물",
        "category": "생물"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 6,
        "col": 8,
        "answer": "이발소",
        "clue": "머리카락을 단정하게 깎고 다듬어 주는 전통 가게",
        "category": "생활"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 8,
        "col": 8,
        "answer": "소나기",
        "clue": "여름철 갑자기 세차게 쏟아지다가 금세 그치는 비",
        "category": "자연"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 8,
        "col": 10,
        "answer": "기러기",
        "clue": "가을철 V자로 줄지어 남쪽으로 날아가는 철새",
        "category": "동물"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 10,
        "col": 10,
        "answer": "기상청",
        "clue": "날씨와 일기예보를 관측하고 발표하는 국가 기관",
        "category": "사회"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 10,
        "col": 12,
        "answer": "청포도",
        "clue": "싱그럽고 투명한 연둣빛을 띤 달콤하고 상큼한 포도",
        "category": "음식"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "도시",
        "clue": "인구가 많고 정치·경제의 중심이 되는 큰 지역",
        "category": "사회"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "해바라기",
        "clue": "해를 향해 고개를 들고 피어나는 커다란 노란 꽃",
        "category": "식물"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "바람개비",
        "clue": "바람이 불면 빙글빙글 돌아가는 날개 달린 장난감",
        "category": "놀이"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 8,
        "answer": "사람들",
        "clue": "세상을 함께 살아가는 많은 이들",
        "category": "사회"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 10,
        "answer": "들판",
        "clue": "풀이나 곡식이 넓게 자라는 평평하고 넓은 땅",
        "category": "자연"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "단풍나무",
        "clue": "가을이면 잎이 붉고 곱게 물드는 친숙한 나무",
        "category": "식물"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "풍선",
        "clue": "고무주머니에 공기를 넣어 부풀리는 알록달록한 장난감",
        "category": "놀이"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "무지개",
        "clue": "비 온 뒤 하늘에 영롱하게 뜨는 일곱 색깔 아치",
        "category": "자연"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 2,
        "answer": "개나리",
        "clue": "이른 봄에 노란 꽃망울을 피우며 봄을 알리는 꽃나무",
        "category": "식물"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 1,
        "answer": "유리병",
        "clue": "유리로 만든 투명하고 맑은 음료나 꿀 담는 병",
        "category": "생활"
      }
    ]
  },
  {
    "id": "stage-2",
    "stageNumber": 2,
    "isDaily": false,
    "title": "2단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "비빔밥",
        "clue": "여러 가지 나물과 고추장, 참기름을 넣어 쓱쓱 비벼 먹는 우리 대표 밥",
        "category": "음식"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "밥주걱",
        "clue": "갓 지은 밥을 푸거나 골고루 섞을 때 쓰는 납작한 도구",
        "category": "주방"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "걱정",
        "clue": "마음이 편하지 않고 안절부절못하며 애태우는 일",
        "category": "마음"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 3,
        "answer": "정종",
        "clue": "쌀을 맑게 빚어 제사나 차례상에 올리는 맑은 술",
        "category": "문화"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 2,
        "answer": "종달새",
        "clue": "봄 하늘 높이 날아올라 맑고 고운 소리로 지저귀는 새",
        "category": "새"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 4,
        "answer": "새우깡",
        "clue": "고소한 튀김 과자로 손이 가요 손이 가는 국민 과자",
        "category": "간식"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 6,
        "col": 4,
        "answer": "깡통",
        "clue": "음식이나 음료수를 밀봉해 보관하는 양철 용기",
        "category": "생활"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 6,
        "col": 5,
        "answer": "통나무",
        "clue": "베어 낸 그대로 쪼개거나 켜지 않은 둥근 원목",
        "category": "자연"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 6,
        "col": 6,
        "answer": "무궁화",
        "clue": "영원히 피고 또 피어 지지 않는 대한민국의 국화",
        "category": "상징"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 6,
        "col": 8,
        "answer": "화선지",
        "clue": "붓글씨나 수묵화를 그릴 때 먹물이 잘 번지는 얇은 종이",
        "category": "문화"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 8,
        "col": 8,
        "answer": "지도자",
        "clue": "조직이나 사회를 올바르고 정의로운 길로 이끄는 사람",
        "category": "사회"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 8,
        "col": 10,
        "answer": "자전거",
        "clue": "두 발로 페달을 힘차게 밟아 바퀴를 굴리는 탈것",
        "category": "생활"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 10,
        "col": 10,
        "answer": "거미줄",
        "clue": "거미가 먹이를 잡기 위해 방사형으로 가늘게 친 줄",
        "category": "생물"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 10,
        "col": 12,
        "answer": "줄넘기",
        "clue": "양손에 끈을 쥐고 돌리며 발을 굴러 뛰는 유산소 운동",
        "category": "운동"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "기차",
        "clue": "레일 위를 긴 객차들을 이끌고 덜컹덜컹 달리는 열차",
        "category": "교통"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "가마솥",
        "clue": "두꺼운 무쇠로 만들어 구수한 누룽지와 밥을 짓는 솥",
        "category": "주방"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "마늘쫑",
        "clue": "알싸하고 아삭하여 장아찌나 볶음으로 먹는 마늘의 꽃줄기",
        "category": "음식"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 8,
        "answer": "하늘",
        "clue": "머리 위에 파랗고 높게 펼쳐진 맑은 공간",
        "category": "자연"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 8,
        "answer": "하마",
        "clue": "물속에서 주로 생활하는 거대한 덩치의 초식 동물",
        "category": "동물"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "도토리묵",
        "clue": "도토리 녹말을 끓여 굳힌 탱글탱글하고 떫싸한 전통 묵",
        "category": "음식"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "토기",
        "clue": "흙을 빚어 구워 만든 원시 또는 삼국 시대의 그릇",
        "category": "역사"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "막걸리",
        "clue": "쌀과 누룩으로 빚어 뽀얗고 구수한 우리 전통 발효 탁주",
        "category": "음식"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 2,
        "answer": "리듬감",
        "clue": "음악이나 춤의 박자에 알맞게 흥을 맞추는 감각",
        "category": "예술"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 0,
        "answer": "오감",
        "clue": "시각, 청각, 후각, 미각, 촉각의 다섯 가지 감각",
        "category": "인체"
      }
    ]
  },
  {
    "id": "stage-3",
    "stageNumber": 3,
    "isDaily": false,
    "title": "3단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "한라산",
        "clue": "제주도 중심에 우뚝 솟은 백록담을 품은 남한 최고봉",
        "category": "자연"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "산울림",
        "clue": "산골짜기에서 소리가 메아리쳐 울려 퍼지는 현상",
        "category": "자연"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "림보",
        "clue": "가로대를 건드리지 않고 허리를 뒤로 젖혀 통과하는 놀이",
        "category": "놀이"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 3,
        "answer": "보름달",
        "clue": "음력 보름날 밤하늘을 환하게 비추는 둥근 달",
        "category": "자연"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 3,
        "answer": "달맞이",
        "clue": "대보름이나 한가위에 뜨는 보름달을 보며 소원을 빎",
        "category": "명절"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 5,
        "answer": "이슬",
        "clue": "밤사이에 기온이 내려가 풀잎 위에 맺히는 맑은 물방울",
        "category": "자연"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 5,
        "col": 5,
        "answer": "슬기",
        "clue": "사리를 밝게 판단하고 어려움을 슬기롭게 헤쳐 나가는 지혜",
        "category": "마음"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 5,
        "col": 6,
        "answer": "기러기",
        "clue": "가을 하늘에 V자로 줄을 지어 남녘으로 날아가는 철새",
        "category": "동물"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 7,
        "col": 6,
        "answer": "기상청",
        "clue": "매일 날씨와 일기예보를 정밀하게 관측하고 알리는 청",
        "category": "사회"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 7,
        "col": 8,
        "answer": "청포도",
        "clue": "싱그럽고 청명한 연둣빛을 띤 달콤한 여름 포도",
        "category": "음식"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 9,
        "col": 8,
        "answer": "도토리",
        "clue": "참나무에서 떨어져 다람쥐의 겨울 양식이 되는 열매",
        "category": "자연"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 9,
        "col": 10,
        "answer": "리본",
        "clue": "선물 상자를 예쁘게 묶거나 머리에 꽂는 장식 띠",
        "category": "생활"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 10,
        "col": 10,
        "answer": "본보기",
        "clue": "다른 사람이나 후배들이 모범으로 삼을 만한 좋은 본",
        "category": "사회"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 10,
        "col": 12,
        "answer": "기차역",
        "clue": "승객이 기차를 타고 내리는 정거장",
        "category": "교통"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "역사",
        "clue": "인류 사회가 거쳐 온 과거의 발자취와 변천 과정",
        "category": "인문"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "백두산",
        "clue": "한반도 북단에 위치한 천지를 품은 민족의 영산",
        "category": "지리"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "두루미",
        "clue": "천연기념물로 지정된 희고 우아한 자태의 학",
        "category": "동물"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 8,
        "answer": "하루",
        "clue": "아침부터 밤까지의 스물네 시간 동안의 날",
        "category": "시간"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 8,
        "answer": "하마",
        "clue": "물속에서 주로 사는 거대한 몸집의 동물",
        "category": "동물"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "소나무",
        "clue": "사시사철 눈보라 속에서도 푸르름을 잃지 않는 나무",
        "category": "식물"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "나비",
        "clue": "아름다운 날개로 꽃밭을 날아다니는 곤충",
        "category": "곤충"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "무지개",
        "clue": "비 갠 하늘에 영롱하게 걸리는 일곱 빛깔 반원",
        "category": "자연"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 2,
        "answer": "개구리",
        "clue": "봄철 논둑이나 연못에서 개골개골 높이 뛰는 양서류",
        "category": "생물"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 1,
        "answer": "유리",
        "clue": "투명하고 매끄러우며 창문이나 거울을 만드는 재료",
        "category": "생활"
      }
    ]
  },
  {
    "id": "stage-4",
    "stageNumber": 4,
    "isDaily": false,
    "title": "4단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "흥부전",
        "clue": "착한 아우가 제비 다리를 고쳐 주어 박씨를 얻은 이야기",
        "category": "고전"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "전래동화",
        "clue": "옛날부터 전해 내려오는 정답고 교훈적인 이야기",
        "category": "이야기"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "동아줄",
        "clue": "하늘에서 썩은 줄과 튼튼한 줄이 내려왔다는 전래동화의 밧줄",
        "category": "고전"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 4,
        "answer": "줄다리기",
        "clue": "양편으로 나뉘어 굵은 줄을 힘껏 당기는 민속놀이",
        "category": "놀이"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 5,
        "col": 4,
        "answer": "기러기",
        "clue": "가을철 V자로 질서정연하게 날아가는 철새",
        "category": "동물"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 5,
        "col": 6,
        "answer": "기상청",
        "clue": "매일 날씨와 태풍을 관측해 예보하는 국가 기관",
        "category": "사회"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 6,
        "col": 6,
        "answer": "상자",
        "clue": "물건을 넣어 보관하는 네모난 상자",
        "category": "생활"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 6,
        "col": 7,
        "answer": "자전거",
        "clue": "두 발로 페달을 밟아 바퀴를 굴리는 탈것",
        "category": "교통"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 8,
        "col": 7,
        "answer": "거미줄",
        "clue": "거미가 먹이를 잡으려 친 방사형 그물",
        "category": "생물"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 8,
        "col": 9,
        "answer": "줄넘기",
        "clue": "줄을 돌리며 깡충깡충 뛰는 운동",
        "category": "운동"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 10,
        "col": 9,
        "answer": "기차표",
        "clue": "열차를 탈 수 있도록 구입한 승차권",
        "category": "교통"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 10,
        "col": 11,
        "answer": "표범",
        "clue": "몸에 매화꽃 무늬 얼룩점이 있는 날렵한 맹수",
        "category": "동물"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 11,
        "col": 11,
        "answer": "범종",
        "clue": "절에서 새벽과 저녁에 은은하게 울리는 큰 쇠종",
        "category": "문화"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 11,
        "col": 12,
        "answer": "종소리",
        "clue": "종을 쳤을 때 울려 퍼지는 맑고 깊은 소리",
        "category": "소리"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 13,
        "col": 12,
        "answer": "리본",
        "clue": "선물 상자를 예쁘게 묶는 장식 끈",
        "category": "생활"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "별주부전",
        "clue": "용왕의 병환을 낫게 하려 토끼 간을 찾아 나선 이야기",
        "category": "고전"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "주전자",
        "clue": "물을 끓이거나 차를 따르는 주방 도구",
        "category": "주방"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 9,
        "answer": "전자석",
        "clue": "전류가 흐를 때만 자석이 되는 장치",
        "category": "과학"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 11,
        "answer": "석탄",
        "clue": "땅속에서 캔 검은 연료 광물",
        "category": "자원"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "심청전",
        "clue": "아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 이야기",
        "category": "고전"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "청개구리",
        "clue": "엄마 말을 반대로 하다가 빗속에서 우는 개구리",
        "category": "우화"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 1,
        "answer": "구두",
        "clue": "정장이나 격식 있는 옷차림에 신는 가죽신",
        "category": "생활"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 2,
        "answer": "두루미",
        "clue": "천연기념물로 지정된 희고 우아한 자태의 학",
        "category": "동물"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 2,
        "answer": "미소",
        "clue": "소리 없이 빙긋이 웃는 얼굴 표정",
        "category": "마음"
      }
    ]
  },
  {
    "id": "stage-5",
    "stageNumber": 5,
    "isDaily": false,
    "title": "5단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "우주선",
        "clue": "지구 궤도를 벗어나 달과 별을 탐사하는 비행선",
        "category": "우주"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "선풍기",
        "clue": "전기 모터로 시원한 바람을 일으키는 가전",
        "category": "생활"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "기압계",
        "clue": "대기압의 높고 낮음을 측정하는 기기",
        "category": "과학"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 4,
        "answer": "계절",
        "clue": "봄, 여름, 가을, 겨울의 네 시기",
        "category": "자연"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 3,
        "col": 4,
        "answer": "절약",
        "clue": "물건이나 돈을 아끼고 소중히 씀",
        "category": "생활"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 3,
        "col": 5,
        "answer": "약수터",
        "clue": "바위틈에서 솟아나는 맑은 샘물이 있는 곳",
        "category": "자연"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 5,
        "col": 5,
        "answer": "터널",
        "clue": "산이나 지하를 뚫어 낸 통로 길",
        "category": "교통"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 5,
        "col": 6,
        "answer": "널빤지",
        "clue": "나무를 얇고 넓게 켠 널판",
        "category": "목재"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 7,
        "col": 6,
        "answer": "지구본",
        "clue": "지구의 표면을 둥근 구체 위에 축소해 나타낸 모형",
        "category": "지리"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 7,
        "col": 8,
        "answer": "본보기",
        "clue": "후배나 다른 이의 모범이 될 만한 좋은 표본",
        "category": "사회"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 9,
        "col": 8,
        "answer": "기온",
        "clue": "공기의 차갑고 더운 정도를 나타내는 온도",
        "category": "기상"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 9,
        "col": 10,
        "answer": "온도계",
        "clue": "기온이나 체온을 눈금으로 재는 기구",
        "category": "도구"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 11,
        "col": 10,
        "answer": "계산기",
        "clue": "복잡한 수식을 빠르게 계산하는 전자 기기",
        "category": "기기"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 11,
        "col": 12,
        "answer": "기차",
        "clue": "레일 위를 덜컹덜컹 달리는 열차",
        "category": "교통"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "차표",
        "clue": "기차나 버스를 타기 위해 산 승차권",
        "category": "교통"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "망원경",
        "clue": "먼 곳의 천체나 풍경을 크게 당겨 보는 광학 기구",
        "category": "과학"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "원자력",
        "clue": "원자핵 분열 시 방출되는 강력한 에너지",
        "category": "과학"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 9,
        "answer": "자석",
        "clue": "쇳조각을 끌어당기는 성질을 가진 물체",
        "category": "과학"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 10,
        "answer": "석탄",
        "clue": "고대의 식물이 땅속에서 탄화된 검은 광물",
        "category": "자원"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "나침반",
        "clue": "자석 바늘이 항상 남북을 가리켜 길을 찾는 나침판",
        "category": "과학"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "침팬지",
        "clue": "인간과 매우 유사한 영리한 유인원",
        "category": "동물"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "반지",
        "clue": "손가락에 끼는 둥근 귀금속 장신구",
        "category": "생활"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 0,
        "answer": "반달",
        "clue": "활 모양으로 반만 차오른 달",
        "category": "자연"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 1,
        "answer": "가을빛",
        "clue": "가을철 온 산과 들이 황금빛과 붉은빛으로 물든 풍경",
        "category": "자연"
      }
    ]
  },
  {
    "id": "stage-6",
    "stageNumber": 6,
    "isDaily": false,
    "title": "6단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "가야금",
        "clue": "오동나무 판에 열두 줄을 얹어 맑은 소리를 내는 국악 현악기",
        "category": "음악"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "금강산",
        "clue": "사계절 절경을 자랑하는 우리 민족의 명산",
        "category": "자연"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "산조",
        "clue": "기악 독주 형태로 연주하는 민속 기악곡",
        "category": "국악"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 3,
        "answer": "조각배",
        "clue": "나무를 다듬어 만든 작고 날렵한 배",
        "category": "교통"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 3,
        "answer": "배꽃",
        "clue": "봄에 하얗게 피어 가을 배를 맺는 꽃",
        "category": "식물"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 4,
        "answer": "꽃다발",
        "clue": "여러 송이의 생화를 아름답게 묶은 묶음",
        "category": "생활"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 6,
        "col": 4,
        "answer": "발걸음",
        "clue": "발을 떼어 앞으로 옮겨 딛는 걸음",
        "category": "인간"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 6,
        "col": 6,
        "answer": "음악회",
        "clue": "아름다운 선율과 노래를 청중에게 들려주는 공연",
        "category": "예술"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 8,
        "col": 6,
        "answer": "회오리",
        "clue": "공기가 빙글빙글 나선형으로 솟구치는 돌개바람",
        "category": "자연"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 8,
        "col": 8,
        "answer": "리본",
        "clue": "선물 상자를 예쁘게 장식하는 리본 끈",
        "category": "생활"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 9,
        "col": 8,
        "answer": "본보기",
        "clue": "다른 사람의 모범이 되는 좋은 본",
        "category": "사회"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 9,
        "col": 10,
        "answer": "기러기",
        "clue": "가을 하늘에 V자 대형으로 남쪽을 찾는 철새",
        "category": "동물"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 11,
        "col": 10,
        "answer": "기상청",
        "clue": "매일의 일기예보와 태풍을 관측해 알리는 국가 청",
        "category": "사회"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 11,
        "col": 12,
        "answer": "청포도",
        "clue": "싱그럽고 투명한 청록색의 달콤한 포도",
        "category": "음식"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "포도",
        "clue": "알알이 보랏빛이나 청록빛으로 영그는 과일",
        "category": "과일"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "판소리",
        "clue": "소리꾼이 북장단에 맞춰 노래와 사설을 엮어 내는 전통 예술",
        "category": "국악"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "소나무",
        "clue": "추운 겨울에도 변함없이 늘 푸른 상록수",
        "category": "식물"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 9,
        "answer": "나비",
        "clue": "화려한 날갯짓으로 꽃밭의 꿀을 찾아 날아다니는 곤충",
        "category": "곤충"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 10,
        "answer": "비눗방울",
        "clue": "비눗물을 빨대로 불면 공중에 둥실 뜨는 무지갯빛 방울",
        "category": "놀이"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "풍물놀이",
        "clue": "꽹과리, 징, 장구, 북으로 흥을 돋우는 전통 농악",
        "category": "국악"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "물레방아",
        "clue": "떨어지는 물의 힘으로 바퀴를 돌려 방아를 찧는 장치",
        "category": "생활"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 1,
        "answer": "방학",
        "clue": "학기 사이에 수업을 쉬고 재충전하는 기간",
        "category": "학교"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 2,
        "answer": "학교",
        "clue": "학생들이 모여 지식을 배우고 꿈을 키우는 배움터",
        "category": "교육"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 11,
        "col": 2,
        "answer": "교문",
        "clue": "학교의 정문이나 출입문",
        "category": "학교"
      }
    ]
  },
  {
    "id": "stage-7",
    "stageNumber": 7,
    "isDaily": false,
    "title": "7단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "윤슬",
        "clue": "햇빛이나 달빛에 비치어 반짝반짝 잔물결이 이는 모양의 순우리말",
        "category": "우리말"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 1,
        "answer": "슬기",
        "clue": "일을 바르고 지혜롭게 헤쳐 나가는 맑은 생각",
        "category": "마음"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 0,
        "answer": "기쁨",
        "clue": "마음이 흡족하고 유쾌하여 얼굴에 웃음꽃이 피는 감정",
        "category": "마음"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 1,
        "answer": "쁨쁨",
        "clue": "자신감이나 매력이 넘쳐흐르는 모양새를 이르는 신조어",
        "category": "표현"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 1,
        "answer": "아지랑이",
        "clue": "봄날 햇살이 따뜻할 때 지표면에서 모락모락 피어오르는 공기 현상",
        "category": "자연"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 3,
        "answer": "랑데부",
        "clue": "우주선이나 사람들이 특정한 시간과 장소에서 만남",
        "category": "외래어"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 6,
        "col": 3,
        "answer": "부모님",
        "clue": "나를 낳아 주시고 사랑으로 길러 주신 아버지와 어머니",
        "category": "가족"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 6,
        "col": 5,
        "answer": "님과함께",
        "clue": "사랑하는 사람과 함께 살아가고 싶은 마음을 담은 유행가",
        "category": "노래"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 8,
        "col": 5,
        "answer": "함박눈",
        "clue": "굵고 탐스럽게 펄펄 내리는 겨울눈",
        "category": "자연"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 8,
        "col": 7,
        "answer": "눈사람",
        "clue": "눈을 둥글게 뭉쳐 머리와 몸통을 세운 인형",
        "category": "겨울"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 10,
        "col": 7,
        "answer": "람보르",
        "clue": "스포츠카 애호가들이 애칭으로 부르는 명차 이름",
        "category": "문화"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 10,
        "col": 9,
        "answer": "르네상스",
        "clue": "14~16세기 유럽에서 일어난 문화와 예술의 문예 부흥 운동",
        "category": "세계사"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 12,
        "col": 9,
        "answer": "상상력",
        "clue": "머릿속으로 새로운 생각을 창의적으로 그려 내는 힘",
        "category": "인간"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 11,
        "col": 12,
        "answer": "세트",
        "clue": "여러 개가 모여 하나의 단위를 이루는 묶음",
        "category": "생활"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "트럭",
        "clue": "무거운 짐을 싣고 도로를 달리는 화물차",
        "category": "교통"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "미리내",
        "clue": "하늘을 가로지르는 은하수를 아름답게 이르는 순우리말",
        "category": "우리말"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "리본",
        "clue": "선물 상자를 예쁘게 묶는 고운 끈",
        "category": "생활"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 9,
        "answer": "본보기",
        "clue": "다른 사람의 모범이 되는 좋은 본",
        "category": "사회"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 10,
        "answer": "보석",
        "clue": "귀하고 아름다운 광물",
        "category": "보석"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "온새미로",
        "clue": "가르거나 쪼개지 않고 본디 생김새 그대로라는 순우리말",
        "category": "우리말"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "새벽달",
        "clue": "날이 밝아 올 무렵 서쪽 하늘에 외로이 떠 있는 달",
        "category": "자연"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "반달",
        "clue": "활 모양으로 둥글게 반만 찬 밤하늘의 달",
        "category": "자연"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 0,
        "answer": "반딧불",
        "clue": "여름밤 꽁무니로 맑은 빛을 내며 나는 곤충",
        "category": "곤충"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 0,
        "answer": "불꽃",
        "clue": "타오르는 불에서 솟구치는 환하고 뜨거운 기운",
        "category": "자연"
      }
    ]
  },
  {
    "id": "stage-8",
    "stageNumber": 8,
    "isDaily": false,
    "title": "8단계",
    "subtitle": "14×14 한글 십자말풀이",
    "size": 14,
    "wordReward": 20,
    "clearReward": 150,
    "words": [
      {
        "id": "H1",
        "number": 1,
        "direction": "across",
        "row": 0,
        "col": 0,
        "answer": "훈민정음",
        "clue": "세종대왕이 백성을 가르치는 바른 소리로 창제한 한글의 본래 이름",
        "category": "역사"
      },
      {
        "id": "V2",
        "number": 2,
        "direction": "down",
        "row": 0,
        "col": 2,
        "answer": "정월대보름",
        "clue": "음력 1월 15일로 오곡밥과 부럼을 깨물며 건강을 기원하는 명절",
        "category": "명절"
      },
      {
        "id": "H3",
        "number": 3,
        "direction": "across",
        "row": 2,
        "col": 2,
        "answer": "대금",
        "clue": "굵은 대나무로 만들어 깊고 청아한 울림을 주는 관악기",
        "category": "국악"
      },
      {
        "id": "V4",
        "number": 4,
        "direction": "down",
        "row": 2,
        "col": 3,
        "answer": "금강산",
        "clue": "봉우리마다 기암괴석이 빼어난 우리 강산의 자랑",
        "category": "명승"
      },
      {
        "id": "H5",
        "number": 5,
        "direction": "across",
        "row": 4,
        "col": 3,
        "answer": "산토끼",
        "clue": "산야를 깡충깡충 뛰어다니며 당근을 좋아하는 동물",
        "category": "동물"
      },
      {
        "id": "V6",
        "number": 6,
        "direction": "down",
        "row": 4,
        "col": 5,
        "answer": "끼리끼리",
        "clue": "뜻이나 성향이 비슷한 사람끼리 서로 모이는 모습",
        "category": "표현"
      },
      {
        "id": "H7",
        "number": 7,
        "direction": "across",
        "row": 5,
        "col": 5,
        "answer": "리본",
        "clue": "선물 상자를 장식하거나 머리를 묶는 고운 끈",
        "category": "생활"
      },
      {
        "id": "V8",
        "number": 8,
        "direction": "down",
        "row": 5,
        "col": 6,
        "answer": "본보기",
        "clue": "다른 사람이 본받아 따를 만한 모범",
        "category": "사회"
      },
      {
        "id": "H9",
        "number": 9,
        "direction": "across",
        "row": 7,
        "col": 6,
        "answer": "기러기",
        "clue": "철 따라 무리 지어 하늘을 수놓는 철새",
        "category": "동물"
      },
      {
        "id": "V10",
        "number": 10,
        "direction": "down",
        "row": 7,
        "col": 8,
        "answer": "기상청",
        "clue": "날씨 정보와 비 예보를 책임지는 공공 기관",
        "category": "사회"
      },
      {
        "id": "H11",
        "number": 11,
        "direction": "across",
        "row": 9,
        "col": 8,
        "answer": "청포도",
        "clue": "풋풋한 청록빛의 싱그럽고 달콤한 여름 과일",
        "category": "음식"
      },
      {
        "id": "V12",
        "number": 12,
        "direction": "down",
        "row": 9,
        "col": 10,
        "answer": "도토리",
        "clue": "다람쥐의 주식으로 참나무 밑에 떨어지는 열매",
        "category": "자연"
      },
      {
        "id": "H13",
        "number": 13,
        "direction": "across",
        "row": 11,
        "col": 10,
        "answer": "리듬감",
        "clue": "박자와 리듬을 타는 감각",
        "category": "예술"
      },
      {
        "id": "V14",
        "number": 14,
        "direction": "down",
        "row": 11,
        "col": 12,
        "answer": "감나무",
        "clue": "가을에 주황빛 감이 달리는 과수",
        "category": "식물"
      },
      {
        "id": "H15",
        "number": 15,
        "direction": "across",
        "row": 12,
        "col": 12,
        "answer": "나무",
        "clue": "줄기와 가지가 목질로 되어 여러 해 자라는 식물",
        "category": "식물"
      },
      {
        "id": "H16",
        "number": 16,
        "direction": "across",
        "row": 0,
        "col": 8,
        "answer": "집현전",
        "clue": "세종대왕 시절 훌륭한 학자들이 모여 학문을 연구하던 학술 기관",
        "category": "역사"
      },
      {
        "id": "V17",
        "number": 17,
        "direction": "down",
        "row": 0,
        "col": 9,
        "answer": "현미경",
        "clue": "육안으로 볼 수 없는 미세한 세포를 크게 확대해 관찰하는 기구",
        "category": "과학"
      },
      {
        "id": "H18",
        "number": 18,
        "direction": "across",
        "row": 1,
        "col": 9,
        "answer": "미소",
        "clue": "소리 내지 않고 빙긋이 웃는 얼굴 표정",
        "category": "마음"
      },
      {
        "id": "V19",
        "number": 19,
        "direction": "down",
        "row": 1,
        "col": 10,
        "answer": "소나기",
        "clue": "갑자기 거세게 쏟아붓고 그치는 여름비",
        "category": "자연"
      },
      {
        "id": "H20",
        "number": 20,
        "direction": "across",
        "row": 8,
        "col": 0,
        "answer": "해바라기",
        "clue": "해를 따라 고개를 돌리는 커다란 노란 꽃",
        "category": "식물"
      },
      {
        "id": "V21",
        "number": 21,
        "direction": "down",
        "row": 8,
        "col": 1,
        "answer": "바람개비",
        "clue": "바람을 맞으면 뱅글뱅글 돌아가는 장난감",
        "category": "놀이"
      },
      {
        "id": "H22",
        "number": 22,
        "direction": "across",
        "row": 10,
        "col": 0,
        "answer": "번개",
        "clue": "구름 사이에 방전이 일어나 번쩍이는 강한 섬광",
        "category": "자연"
      },
      {
        "id": "V23",
        "number": 23,
        "direction": "down",
        "row": 10,
        "col": 0,
        "answer": "번호",
        "clue": "사물을 순서대로 구분하기 위해 붙인 숫자",
        "category": "일반"
      },
      {
        "id": "H24",
        "number": 24,
        "direction": "across",
        "row": 12,
        "col": 1,
        "answer": "불꽃놀이",
        "clue": "밤하늘에 화약이 터지며 형형색색 불꽃을 피우는 축제",
        "category": "놀이"
      }
    ]
  }
];
