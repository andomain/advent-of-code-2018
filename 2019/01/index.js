const { sumArray, readFileLines } = require('../utils');

const getRequiredFuel = mass => Math.max((Math.floor(mass / 3) - 2), 0);

const getTotalRequiredFuel = (mass) => {
  const fuel = getRequiredFuel(mass);

  if (fuel === 0) return 0;

  return fuel + getTotalRequiredFuel(fuel);
}

const inputData = readFileLines('./input.txt').map(line => Number(line));

const part1Result = sumArray(inputData, getRequiredFuel);
const part2Result = sumArray(inputData, getTotalRequiredFuel);

console.log(`
Day 1
  Part 1: ${part1Result}
  Part 2: ${part2Result}
`);
