import { readFile, printResult } from '../utils';
import { Intcode } from '../utils/Intcode';

// Get data
const init = readFile(`${__dirname}/input.txt`)
    .split(',')
    .map(n => Number(n));

const intCode = new Intcode(init);
intCode.process(1);
const result1 = intCode.output;
intCode.reset();

if (result1 === null) {
    throw new Error('No output set');
}

intCode.process(5);
const result2 = intCode.output;

if (result2 === null) {
    throw new Error('No output set');
}

printResult(5, result1, result2);
