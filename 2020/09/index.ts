import { readFileLines } from "../utils";
import { XmasCracker } from "./XmasCracker";

const PREAMBLE_SIZE = 25;

const data = readFileLines(`${__dirname}/input.txt`).map(Number);

const cracker = new XmasCracker(data, PREAMBLE_SIZE);

const part1 = cracker.findInvalid();
console.log(`Part One: ${part1}`);

const part2 = cracker.weakness(part1);
console.log(`Part Two: ${part2}`);

console.assert(part1 === 1124361034);
console.assert(part2 === 129444555);