import { readFile, printResult } from '../utils';
import { Intcode } from '../utils/Intcode';

const TARGET_OUTPUT = 19690720;

// Inefficient loop
const findTarget = (program: number[], target: number): { noun: number, verb: number } => {
  for (let noun = 1; noun <= 99; noun++) {
    for (let verb = 1; verb <= 99; verb++) {
      const intCode = new Intcode(program)
      intCode.set(1, noun);
      intCode.set(2, verb);
      if (intCode.execute() === target) {
        return { noun, verb };
      }
    }
  }
  throw new Error('Could not calculate target')
}


// Get data
const init = readFile(`${__dirname}/input.txt`).split(',').map(n => Number(n));

const intCode = new Intcode(init);
intCode.set(1, 12);
intCode.set(2, 2);
const result1 = intCode.execute();

const { noun, verb } = findTarget(init, TARGET_OUTPUT);
const result2 = 100 * noun + verb;

printResult(2, result1, result2);
