const fs = require('fs');

export const readFile = (filePath: string, enc = 'utf-8'): string => fs.readFileSync(filePath, enc).trim();

export const readFileLines = (filePath: string, enc = 'utf-8'): string[] => readFile(filePath, enc)
  .split('\n');

export const minReduce = (currentMin: number, val: number): number => Math.min(currentMin, val);

export const sumArray = (input: number[], processElFn = (el: number) => el) => input.reduce(
  (acc, current) => acc += processElFn(current),
  0
);

export const printResult = (day: number, part1: string | number = 'n/a', part2: string | number = 'n/a'): void => console.log(`
Day ${day}
  Part 1: ${part1}
  Part 2: ${part2}
`);


export function getPermutations<T>(input: T[]): T[][] {
  let result: T[][] = [];

  const permute = (arr: T[], m: T[] = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next))
      }
    }
  }

  permute(input)

  return result;
}

export function chunkArray<T>(input: T[], size: number): T[][] {
  const result = [];
  for (let i = 0; i < input.length; i += size) {
    result.push(input.slice(i, i + size));
  }
  return result;
}
