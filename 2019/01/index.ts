import { printResult, sumArray, readFileLines } from '../utils';

const getRequiredFuel = (mass: number): number => Math.max((Math.floor(mass / 3) - 2), 0);

const getTotalRequiredFuel = (mass: number): number => {
  const fuel = getRequiredFuel(mass);

  if (fuel === 0) return 0;

  return fuel + getTotalRequiredFuel(fuel);
}

const inputData = readFileLines(`${__dirname}/input.txt`).map(line => Number(line));

const part1Result = sumArray(inputData, getRequiredFuel);
const part2Result = sumArray(inputData, getTotalRequiredFuel);

printResult(1, part1Result, part2Result);
