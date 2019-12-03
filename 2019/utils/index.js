const fs = require('fs');

const readFile = (file, enc = 'utf-8') => fs.readFileSync(file, enc).trim();

const readFileLines = (file, enc = 'utf-8') => readFile(file, enc)
  .split('\n');

const minReduce = (currentMin, val) => Math.min(currentMin, val);

const sumArray = (input, processElFn = el => el) => input.reduce(
  (acc, current) => acc += processElFn(current),
  0
);

/**
 * Print the results
 * @param {number} day Advent day number
 * @param {number|string} part1 Answer to part 1
 * @param {number|string} part2 Answer to part 2
 */
const printResult = (day, part1 = 'n/a', part2 = 'n/a') => console.log(`
Day ${day}
  Part 1: ${part1}
  Part 2: ${part2}
`);

module.exports = { sumArray, readFile, readFileLines, printResult, minReduce }
