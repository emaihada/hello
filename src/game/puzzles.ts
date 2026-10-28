import { generateOfficialStagePuzzle } from './wordcrossGenerator.ts';

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

export const INITIAL_STAGE_COUNT = 8;

export const STAGE_PUZZLES: CrosswordPuzzle[] = Array.from(
  { length: INITIAL_STAGE_COUNT },
  (_, idx) => generateOfficialStagePuzzle(idx + 1)
);
