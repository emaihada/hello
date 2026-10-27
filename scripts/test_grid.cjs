const { extractWordsFromGrid } = require('./grid_extractor.cjs');
const { validatePuzzle } = require('./validator.cjs');

// 14x14 grid for Stage 1
// Each row must be exactly 14 characters
const rawGrid1 = [
  /* 0 */ "봄바람...눈사람..",
  /* 1 */ "..다.......람....",
  /* 2 */ ".바람개비.사람들.",
  /* 3 */ "..이..울.......판",
  /* 4 */ "비눗방울..기상청.",
  /* 5 */ "....앗....러....",
  /* 6 */ "..방앗간..기러기.",
  /* 7 */ "....간........도.",
  /* 8 */ ".도토리..단풍나무",
  /* 9 */ "....리....풍..무.",
  /* 10*/ ".무지개..나무꾼..",
  /* 11*/ "....나....무..꽃.",
  /* 12*/ "..개나리..자전거.",
  /* 13*/ "..........거...."
];

console.log("Rows:", rawGrid1.length, "Cols:", rawGrid1[0].length);
const words1 = extractWordsFromGrid(rawGrid1, {});
console.log("Total words extracted:", words1.length);
words1.forEach(w => console.log(`${w.id} (${w.direction}): [${w.row}, ${w.col}] "${w.answer}"`));
