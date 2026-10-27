const { validatePuzzle } = require('./validator.cjs');

// Helper to test a set of words
function testAndPrint(name, words) {
  const puzzle = {
    id: name,
    stageNumber: 1,
    size: 14,
    words: words.map((w, i) => ({ ...w, id: `W${i+1}`, number: i+1 }))
  };
  const res = validatePuzzle(puzzle);
  if (!res.isValid) {
    console.log(name, 'Errors:', res.errors);
  } else {
    console.log(name, 'SUCCESS! Words:', words.length);
  }
  return res.isValid;
}

// Stage 1 layout design
// 14x14 board
// Let's place:
// H1: row 0, col 0: "호랑이" (col 0,1,2)
// V1: col 2, row 0: "이슬방울" (row 0..3: 이 슬 방 울)
// H2: row 2, col 2: "방앗간" (col 2..4: 방 앗 간)
// V2: col 4, row 2: "간장공장" (row 2..5: 간 장 공 장)
// H3: row 4, col 4: "공책" (col 4..5: 공 책)
// ... Let's build a grid builder!
