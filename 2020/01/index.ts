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

const getThreeArrayElementsThatSumTo = (inputArray: number[], target: number): [number, number, number] => {
  let startIndex = 0;
  let maxIndex = inputArray.length - 1;

  while (startIndex <= maxIndex) {
    try {
      const tmp = inputArray[startIndex];
      const [a, b] = getTwoArrayElementsThatSumTo(inputArray.slice(startIndex + 1), target - tmp);
      if (tmp + a + b === target) {
        return [tmp, a, b];
      } else {
        startIndex++;
      }
    } catch (err) {
      startIndex++;
    }
  }
  throw new Error(`Could not find 3 elements summing to ${target}`);
}

const lines: number[] = readFileLines(`${__dirname}/input.txt`)
  .map(Number)
  .sort((a, b) => (a - b));

const [a, b] = getTwoArrayElementsThatSumTo(lines, TARGET_SUM);

const [c, d, e] = getThreeArrayElementsThatSumTo(lines, TARGET_SUM);

console.log(`Part 1: ${a * b}`);
console.log(`Part 2: ${c * d * e}`);