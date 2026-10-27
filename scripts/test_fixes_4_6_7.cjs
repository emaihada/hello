const { Board } = require('./board_builder.cjs');

// Test C4 of stage 4
const b4 = new Board(14);
b4.addWord('across', 8, 0, '심청전', '아버지의 눈을 뜨게 하려 인당수에 몸을 던진 효녀 이야기', '고전');
b4.addWord('down', 8, 1, '청개구리', '엄마 말을 반대로 하다가 빗속에서 우는 개구리', '우화');
b4.addWord('across', 10, 1, '구두', '정장이나 격식 있는 옷차림에 신는 가죽신', '생활');
b4.addWord('down', 10, 2, '두루미', '천연기념물로 지정된 희고 우아한 자태의 학', '동물');
b4.addWord('across', 12, 2, '미소', '소리 없이 빙긋이 웃는 얼굴 표정', '마음');
console.log('Stage 4 C4 valid!');

// Test C4 of stage 6
const b6 = new Board(14);
b6.addWord('across', 8, 0, '풍물놀이', '꽹과리, 징, 장구, 북으로 흥을 돋우는 전통 농악', '국악');
b6.addWord('down', 8, 1, '물레방아', '떨어지는 물의 힘으로 바퀴를 돌려 방아를 찧는 장치', '생활');
b6.addWord('across', 10, 1, '방학', '학기 사이에 수업을 쉬고 재충전하는 기간', '학교');
b6.addWord('down', 10, 2, '학교', '학생들이 모여 지식을 배우고 꿈을 키우는 배움터', '교육');
b6.addWord('across', 11, 2, '교문', '학교의 정문이나 출입문', '학교');
console.log('Stage 6 C4 valid!');

// Test C4 of stage 7
const b7 = new Board(14);
b7.addWord('across', 8, 0, '온새미로', '가르거나 쪼개지 않고 본디 생김새 그대로라는 순우리말', '우리말');
b7.addWord('down', 8, 1, '새벽달', '날이 밝아 올 무렵 서쪽 하늘에 외로이 떠 있는 달', '자연');
b7.addWord('across', 10, 0, '반달', '활 모양으로 둥글게 반만 찬 밤하늘의 달', '자연');
b7.addWord('down', 10, 0, '반딧불', '여름밤 꽁무니로 맑은 빛을 내며 나는 곤충', '곤충');
b7.addWord('across', 12, 0, '불꽃', '타오르는 불에서 솟구치는 환하고 뜨거운 기운', '자연');
console.log('Stage 7 C4 valid!');
