import { Memory, VERSION } from './Memory';
import { readFileLines } from "../utils"

const lines = readFileLines(`${__dirname}/input.txt`);

const program = new Memory();

lines.forEach(line => program.run(line));

const sum = program.memorySum;
console.log(`Part One: ${sum}`);

const program2 = new Memory(VERSION.TWO);

lines.forEach(line => program2.run(line));

const sum2 = program2.memorySum;
console.log(`Part Two: ${sum2}`);
