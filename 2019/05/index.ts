import { readFile, printResult } from '../utils';
import { Intcode } from '../utils/Intcode';

// Get data
const init = readFile(`${__dirname}/input.txt`)
  .split(',')
  .map(n => Number(n));

const intCode1 = new Intcode(init);
const intCode2 = new Intcode(init);

const outputs1 = intCode1.execute([1])
const outputs2 = intCode2.execute([5])

const result1 = outputs1[outputs1.length - 1];
const result2 = outputs2[outputs2.length - 1];

printResult(5, result1, result2);
