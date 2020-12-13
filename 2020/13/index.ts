import { readFileLines } from "../utils"

export const getParameters = (filename: string) => {
  const lines = readFileLines(filename);

  return {
    earliest: Number(lines[0]),
    running: lines[1].split(',').filter(id => id !== 'x').map(Number),
  }
};

export const getNextDepartTime = (after: number, busId: number): number => {
  const loops = after / busId;

  if (Number.isInteger(loops)) {
    return after;
  }

  return Math.ceil(loops) * busId;
}

export const getNextBus = (departAfter: number, buses: number[]): { id: number, time: number } => buses.reduce((nextBus: { id: number, time: number }, id) => {
  const time = getNextDepartTime(departAfter, id);

  if (time < nextBus.time) {
    nextBus = { id, time }
  }

  return nextBus;
}, { id: 0, time: Number.MAX_SAFE_INTEGER })

const { earliest, running } = getParameters(`${__dirname}/input.txt`);
const nextBus = getNextBus(earliest, running);

const part1 = nextBus.id * (nextBus.time - earliest);
console.log(`Part One: ${part1}`);

