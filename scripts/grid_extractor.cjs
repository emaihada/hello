// Grid-to-puzzle extractor
// Guarantees zero intersection conflicts because words are derived from a unified character matrix!

function extractWordsFromGrid(charGrid, clueDictionary) {
  const height = charGrid.length;
  const width = charGrid[0].length;
  const words = [];
  let numberCounter = 1;

  // We assign clue numbers to cells that start an across or down word
  const cellNumbers = Array.from({ length: height }, () => Array(width).fill(0));

  for (let r = 0; r < height; r++) {
    for (let c = 0; c < width; c++) {
      if (charGrid[r][c] === '.') continue;

      const startsAcross = (c === 0 || charGrid[r][c - 1] === '.') && (c + 1 < width && charGrid[r][c + 1] !== '.');
      const startsDown = (r === 0 || charGrid[r - 1][c] === '.') && (r + 1 < height && charGrid[r + 1][c] !== '.');

      if (startsAcross || startsDown) {
        cellNumbers[r][c] = numberCounter++;
      }
    }
  }

  // Extract Across words
  for (let r = 0; r < height; r++) {
    let c = 0;
    while (c < width) {
      if (charGrid[r][c] !== '.') {
        const startCol = c;
        let wordStr = '';
        while (c < width && charGrid[r][c] !== '.') {
          wordStr += charGrid[r][c];
          c++;
        }
        if (wordStr.length >= 2) {
          const num = cellNumbers[r][startCol];
          const clueInfo = clueDictionary[wordStr] || {
            clue: `${wordStr}에 관한 알맞은 풀이말입니다.`,
            category: '일반'
          };
          words.push({
            id: `H${num}`,
            number: num,
            direction: 'across',
            row: r,
            col: startCol,
            answer: wordStr,
            clue: clueInfo.clue,
            category: clueInfo.category
          });
        }
      } else {
        c++;
      }
    }
  }

  // Extract Down words
  for (let c = 0; c < width; c++) {
    let r = 0;
    while (r < height) {
      if (charGrid[r][c] !== '.') {
        const startRow = r;
        let wordStr = '';
        while (r < height && charGrid[r][c] !== '.') {
          wordStr += charGrid[r][c];
          r++;
        }
        if (wordStr.length >= 2) {
          const num = cellNumbers[startRow][c];
          const clueInfo = clueDictionary[wordStr] || {
            clue: `${wordStr}에 관한 알맞은 풀이말입니다.`,
            category: '일반'
          };
          words.push({
            id: `V${num}`,
            number: num,
            direction: 'down',
            row: startRow,
            col: c,
            answer: wordStr,
            clue: clueInfo.clue,
            category: clueInfo.category
          });
        }
      } else {
        r++;
      }
    }
  }

  // Sort by number then direction
  words.sort((a, b) => a.number - b.number || (a.direction === 'across' ? -1 : 1));

  return words;
}

module.exports = { extractWordsFromGrid };
