import { readFileLines } from '../utils';

const TARGET_SUM = 2020;

const getTwoArrayElementsThatSumTo = (inputArray: number[], target: number): [number, number] => {
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

  throw new Error(`Could not find elements summing to ${target}`);
}
}
const lines: number[] = readFileLines(`${__dirname}/input.txt`)
  .map(Number)
  .sort((a, b) => (a - b));

const [a, b] = getTwoArrayElementsThatSumTo(lines, TARGET_SUM);

const [a, b] = getArrayElementsThatSumTo(lines, TARGET_SUM);

console.log(`Part 1: ${a * b}`);