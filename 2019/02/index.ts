import { readFile, printResult } from '../utils';
import { Intcode } from '../utils/Intcode';

const TARGET_OUTPUT = 19690720;

// Get data
const init = readFile(`${__dirname}/input.txt`).split(',').map(n => Number(n));

const intCode = new Intcode(init);

// Inefficient loop
const findTarget = (target: number): { noun: number, verb: number } => {
  for (let noun = 1; noun <= 99; noun++) {
    for (let verb = 1; verb <= 99; verb++) {
      intCode.set(1, noun);
      intCode.set(2, verb);
      const inter = intCode.process();
      if (inter === target) {
        return { noun, verb };
      }
    }
  }
  throw new Error('Could not calculate target')
}

intCode.set(1, 12);
intCode.set(2, 2);
const result1 = intCode.process();
const { noun, verb } = findTarget(TARGET_OUTPUT);
const result2 = 100 * noun + verb;

printResult(2, result1, result2);
