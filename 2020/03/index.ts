import { readFileLines } from "../utils";

const TREE = '#';

type SLOPE = {
  right: number
  down: number
};

const RIGHT = 3;
const DOWN = 1;

const inputLines = readFileLines(`${__dirname}/input.txt`);

export const traverseMapAndCountTrees = (map: string[], slope: SLOPE): number => {
  const width = map[0].length;
  let count = 0;
  let horizProgress = 0;
  let vertProgress = 0;

  while (vertProgress < map.length) {
    const square = map[vertProgress][horizProgress % width];
    if (square === TREE) {
      count += 1;
    }
    vertProgress += slope.down;
    horizProgress += slope.right;
  }

  return count;
}

const SLOPE = { right: RIGHT, down: DOWN };

const part1 = traverseMapAndCountTrees(inputLines, SLOPE);

const SLOPES = [
  { right: 1, down: 1 },
  { right: 3, down: 1 },
  { right: 5, down: 1 },
  { right: 7, down: 1 },
  { right: 1, down: 2 },
];

const scores = SLOPES.map(slope => traverseMapAndCountTrees(inputLines, slope));
const part2 = scores.reduce((score, slopeScore) => score * slopeScore, 1);

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);


