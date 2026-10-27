// Script to design and validate 14x14 Korean crossword stages with 20-25 words each

function validatePuzzle(puzzle) {
  const size = puzzle.size;
  const grid = Array.from({ length: size }, () => Array(size).fill(null));
  const errors = [];

  if (puzzle.words.length < 20 || puzzle.words.length > 25) {
    errors.push(`Word count ${puzzle.words.length} is not between 20 and 25.`);
  }

  for (const word of puzzle.words) {
    const chars = Array.from(word.answer);
    if (word.direction === 'across') {
      if (word.col + chars.length > size || word.row >= size || word.row < 0 || word.col < 0) {
        errors.push(`Word "${word.answer}" out of bounds at row ${word.row}, col ${word.col}`);
        continue;
      }
      for (let i = 0; i < chars.length; i++) {
        const r = word.row;
        const c = word.col + i;
        const ch = chars[i];
        if (grid[r][c] !== null && grid[r][c] !== ch) {
          errors.push(`Conflict at (${r}, ${c}): '${grid[r][c]}' vs '${ch}' for word "${word.answer}"`);
        }
        grid[r][c] = ch;
      }
    } else {
      if (word.row + chars.length > size || word.col >= size || word.row < 0 || word.col < 0) {
        errors.push(`Word "${word.answer}" out of bounds at row ${word.row}, col ${word.col}`);
        continue;
      }
      for (let i = 0; i < chars.length; i++) {
        const r = word.row + i;
        const c = word.col;
        const ch = chars[i];
        if (grid[r][c] !== null && grid[r][c] !== ch) {
          errors.push(`Conflict at (${r}, ${c}): '${grid[r][c]}' vs '${ch}' for word "${word.answer}"`);
        }
        grid[r][c] = ch;
      }
    }
  }

  return { isValid: errors.length === 0, errors, wordCount: puzzle.words.length };
}

module.exports = { validatePuzzle };
