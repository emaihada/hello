const { Board } = require('./board_builder.cjs');

const b = new Board(14);

// 1. Across at (0, 0): '호랑이' (col 0,1,2)
b.addWord('across', 0, 0, '호랑이', '용맹하고 날렵한 줄무늬를 가진 백수의 왕', '동물');
// 2. Down at (0, 2): '이슬방울' (row 0,1,2,3)
b.addWord('down', 0, 2, '이슬방울', '풀잎 끝에 영롱하게 맺힌 맑은 물방울', '자연');
// 3. Across at (2, 2): '방앗간' (col 2,3,4)
b.addWord('across', 2, 2, '방앗간', '곡식을 찧고 떡을 빚어 내는 정겨운 곳', '생활');
// 4. Down at (2, 4): '간장게장' (row 2,3,4,5)
b.addWord('down', 2, 4, '간장게장', '짭조름한 간장에 신선한 게를 절인 밥도둑 반찬', '음식');
// 5. Across at (4, 4): '게릴라' (col 4,5,6)
b.addWord('across', 4, 4, '게릴라', '정규군이 아닌 유격대나 불시에 깜짝 진행하는 활동', '사회');
// 6. Down at (4, 6): '라디오' (row 4,5,6)
b.addWord('down', 4, 6, '라디오', '전파를 통해 음성과 음악을 들려주는 방송 매체', '문화');
// 7. Across at (6, 6): '오솔길' (col 6,7,8)
b.addWord('across', 6, 6, '오솔길', '숲속이나 한적한 들판에 좁게 난 아늑한 길', '자연');
// 8. Down at (6, 8): '길잡이' (row 6,7,8)
b.addWord('down', 6, 8, '길잡이', '앞에서 길을 인도하거나 올바른 방향을 알려 주는 사람', '사회');
// 9. Across at (8, 8): '이발소' (col 8,9,10)
b.addWord('across', 8, 8, '이발소', '머리카락을 단정하게 깎고 다듬어 주는 가게', '생활');
// 10. Down at (8, 10): '소나기' (row 8,9,10)
b.addWord('down', 8, 10, '소나기', '여름철 갑자기 세차게 쏟아지다가 그치는 비', '자연');
// 11. Across at (10, 10): '기러기' (col 10,11,12)
b.addWord('across', 10, 10, '기러기', '가을 하늘을 V자로 수놓으며 날아가는 철새', '동물');
// 12. Down at (10, 12): '기상청' (row 10,11,12)
b.addWord('down', 10, 12, '기상청', '날씨와 일기예보를 관측하고 전달하는 국가 기관', '사회');
// 13. Across at (12, 11): '청포도' (col 11,12,13) - col 12 is '포'? Wait: '청' is at col 11!
// If col 11 is '청' then col 12 is '포', but at (12,12) is '청' from '기상청'(row 10,11,12 at col 12)!
// So at (12,12) it's '청'!
// Let's make Across at (12, 12): '청자' or '청개구리' (12, 12..15 out of bounds)
// (12, 10): '고려청자' -> col 10 '고', 11 '려', 12 '청', 13 '자'!

b.addWord('across', 12, 10, '고려청자', '은은한 비취색 빛깔을 자랑하는 고려 시대의 명품 도자기', '문화');

// Now let's connect more words to reach 20-25 words!
// Look at (0, 0 '호'): Down at (0, 0): '호박꽃' (row 0,1,2)
b.addWord('down', 0, 0, '호박꽃', '노랗고 커다랗게 피어 달콤한 호박을 맺는 꽃', '식물');
// Across at (2, 0): '꽃샘추위' (col 0..3: 꽃 샘 추 위)
// Wait! (2,2) has '방' from '방앗간'! So (2,0) col 2 would conflict with '방'!
// What if Down at (0,0) is '호롱불' (row 0,1,2: 호 롱 불)?
// Then Across at (2,0): '불가사리' (col 0,1,2: 불 가 사 -> col 2 would be '사', but at (2,2) is '방')
// But at (1,0 '롱'): Across at (1,0): '롱다리' (col 0,1,2)? col 2 is (1,2) which is '슬' in '이슬방울'!
// What if Across at (1,0) is '구슬' (col 1,2)?
b.addWord('across', 1, 1, '구슬', '유리나 옥 따위로 둥글고 반짝이게 만든 물건', '놀이');

// At (3, 2 '울') in '이슬방울': Across at (3, 0): '겨울바람' (col 0,1,2,3 -> col 2 is '바', but we have '울'!)
// What word has '울' at index 1 or 2?
// '서울' (col 1 '서', col 2 '울')!
b.addWord('across', 3, 1, '서울', '한강이 흐르는 유서 깊은 대한민국의 수도', '지리');

// At (3, 1 '서'): Down at (3, 1): '서예' (row 3,4)?
b.addWord('down', 3, 1, '서예', '붓으로 먹물을 묻혀 화선지에 글씨를 쓰는 예술', '예술');

// At (3, 4 '장') in '간장게장': Across at (3, 4): '장독대' (col 4,5,6)
b.addWord('across', 3, 4, '장독대', '간장과 된장, 고추장 항아리를 정갈하게 모아 둔 양지바른 자리', '생활');

// At (5, 4 '장') in '간장게장': Across at (5, 2): '된장찌개' (col 2..5: 된 장 찌 개 -> col 4 is '찌' vs '장')
// What word ends in '장'? '골목대장' (col 1..4: 골 목 대 장)!
b.addWord('across', 5, 1, '골목대장', '동네 골목에서 아이들을 앞장서 이끌며 신나게 노는 아이', '놀이');

// At (5, 6 '이') in '라디오': Across at (5, 6): '이모부' (col 6,7,8)
b.addWord('across', 5, 6, '이모부', '어머니의 여자 형제인 이모의 남편', '가족');

// At (7, 6 '길') in '오솔길': Down at (7, 6): '길동무' (row 7,8,9)
b.addWord('down', 7, 6, '길동무', '먼 길을 함께 도란도란 이야기 나누며 걷는 동무', '인간');

// At (9, 6 '무'): Across at (9, 4): '단무지' (col 4,5,6 -> col 6 is '지' vs '무')
// What word has '무'? '사과나무' (col 3,4,5,6: 사 과 나 무)
b.addWord('across', 9, 3, '사과나무', '가을에 탐스럽고 빨간 사과가 주렁주렁 열리는 과일나무', '식물');

// At (9, 3 '사'): Down at (9, 3): '사다리' (row 9,10,11)
b.addWord('down', 9, 3, '사다리', '높은 곳에 올라가거나 내려올 수 있도록 만든 도구', '생활');

// At (11, 3 '리'): Across at (11, 1): '항아리' (col 1,2,3)
b.addWord('across', 11, 1, '항아리', '음식이나 장류를 담아 두는 배가 불룩한 질그릇', '생활');

// At (7, 8 '자') in '길잡이': Across at (7, 8): '자전거' (col 8,9,10)
b.addWord('across', 7, 8, '자전거', '두 발로 페달을 밟아 힘차게 바퀴를 굴리는 탈것', '생활');

// At (7, 10 '거'): Down at (7, 10): '거미줄' (row 7,8,9 -> row 8 is (8,10) which is '소' in '소나기'!)
// Can't use (8,10) for '미'!
// But what about Down at (7, 9 '전')? '전화기' (row 7,8,9)?
// row 8 col 9 in '이발소' (8, 8..10) is '발'! So row 8 col 9 must be '발'!
// Down at (6, 9) ending in (8,9 '발'): '출발' (row 7 '출', 8 '발')?
b.addWord('down', 7, 9, '출발', '목적지를 향하여 길을 떠나거나 경기를 시작함', '일반');

console.log('Words count:', b.words.length);
console.log('Stage 1 successfully built!');
