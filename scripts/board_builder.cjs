const fs = require('fs');

class Board {
  constructor(size = 14) {
    this.size = size;
    this.grid = Array.from({ length: size }, () => Array(size).fill(null));
    this.words = [];
  }

  addWord(direction, row, col, answer, clue, category = '일반') {
    const chars = Array.from(answer);
    if (direction === 'across') {
      if (col + chars.length > this.size || row >= this.size || row < 0 || col < 0) {
        throw new Error(`Across "${answer}" at (${row},${col}) out of bounds`);
      }
      for (let i = 0; i < chars.length; i++) {
        const r = row;
        const c = col + i;
        if (this.grid[r][c] !== null && this.grid[r][c] !== chars[i]) {
          throw new Error(`Conflict at (${r},${c}): existing '${this.grid[r][c]}' vs new '${chars[i]}' in "${answer}"`);
        }
      }
      for (let i = 0; i < chars.length; i++) {
        this.grid[row][col + i] = chars[i];
      }
    } else {
      if (row + chars.length > this.size || col >= this.size || row < 0 || col < 0) {
        throw new Error(`Down "${answer}" at (${row},${col}) out of bounds`);
      }
      for (let i = 0; i < chars.length; i++) {
        const r = row + i;
        const c = col;
        if (this.grid[r][c] !== null && this.grid[r][c] !== chars[i]) {
          throw new Error(`Conflict at (${r},${c}): existing '${this.grid[r][c]}' vs new '${chars[i]}' in "${answer}"`);
        }
      }
      for (let i = 0; i < chars.length; i++) {
        this.grid[row + i][col] = chars[i];
      }
    }

    this.words.push({
      direction,
      row,
      col,
      answer,
      clue,
      category
    });
  }

  toPuzzle(stageNumber, title, subtitle) {
    return {
      id: `stage-${stageNumber}`,
      stageNumber,
      isDaily: false,
      title,
      subtitle,
      size: this.size,
      wordReward: 20,
      clearReward: 150,
      words: this.words.map((w, idx) => ({
        id: `${w.direction === 'across' ? 'H' : 'V'}${idx + 1}`,
        number: idx + 1,
        direction: w.direction,
        row: w.row,
        col: w.col,
        answer: w.answer,
        clue: w.clue,
        category: w.category
      }))
    };
  }
}

module.exports = { Board };
