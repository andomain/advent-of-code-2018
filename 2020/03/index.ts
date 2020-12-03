import { TraverseMap, TREE } from '../lib';
import { readFileLines } from "../utils";

const inputLines = readFileLines(`${__dirname}/input.txt`);

const SLOPE = { right: 3, down: 1 };
const SLOPE_ARRAY = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const map = new TraverseMap(inputLines, { symbol: TREE })

export const part1 = map.traverse(SLOPE);
export const part2 = SLOPE_ARRAY.reduce((score, slope) => score * map.traverse(slope), 1);

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);


