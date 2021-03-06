import { readFileLines } from '../utils';

const TARGET_SUM = 2020;

export const parseInput = (inputFile: string): number[] => readFileLines(inputFile)
  .map(Number)
  .sort((a, b) => (a - b));

export const getTwoArrayElementsThatSumTo = (inputArray: number[], target: number): [number, number] => {
  let startIndex: number = 0;
  let endIndex: number = inputArray.length - 1;

  while (startIndex < endIndex) {
    const a = inputArray[startIndex];
    const b = inputArray[endIndex];
    if (a + b === target) {
      return [a, b];
    } else if (a + b < target) {
      startIndex++;
    } else {
      endIndex--;
    }
  }

  throw new Error(`Could not find 2 elements summing to ${target}`);
}

export const getThreeArrayElementsThatSumTo = (inputArray: number[], target: number): [number, number, number] => {
  let startIndex = 0;
  let maxIndex = inputArray.length - 1;

  while (startIndex <= maxIndex) {
    try {
      const tmp = inputArray[startIndex];
      const [a, b] = getTwoArrayElementsThatSumTo(inputArray.slice(startIndex + 1), target - tmp);
      return [tmp, a, b];
    } catch (err) {
      startIndex++;
    }
  }
  throw new Error(`Could not find 3 elements summing to ${target}`);
}

const lines: number[] = parseInput(`${__dirname}/input.txt`);
const [a, b] = getTwoArrayElementsThatSumTo(lines, TARGET_SUM);
const [c, d, e] = getThreeArrayElementsThatSumTo(lines, TARGET_SUM);

console.log(`Part 1: ${a * b}`);
console.log(`Part 2: ${c * d * e}`);