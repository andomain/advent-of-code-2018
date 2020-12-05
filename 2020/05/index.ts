import { readFileLines } from "../utils";

const inputLines = readFileLines(`${__dirname}/input.txt`);

export const searchBinaryPartition = (input: string[], min: number, max: number, upperSymbol: string): number => {
  let initialRange = [min, max - 1];

  for (let symbol of input) {
    const [min, max] = initialRange
    if (symbol === upperSymbol) {
      initialRange = [min, min + Math.floor((max - min) / 2)];
    } else {
      initialRange = [min + Math.ceil((max - min) / 2), max];
    }
  }
  return initialRange[0];
}

export const getSeatId = (boardingPass: string): number => {
  const chars = boardingPass.split('')
  const rowId = searchBinaryPartition(chars.slice(0, 7), 0, 128, 'F');
  const columnId = searchBinaryPartition(chars.slice(7), 0, 8, 'L');
  return rowId * 8 + columnId;
}

const ids = inputLines.map(line => getSeatId(line));
const idSet = new Set(ids);

const minId = Math.min(...ids);
const maxId = Math.max(...ids);

export const part1 = maxId;

let missingId;

for (let id = minId + 1; minId < maxId; id++) {
  if (!idSet.has(id)) {
    missingId = id;
    break;
  }
}

export const part2 = missingId;

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);




