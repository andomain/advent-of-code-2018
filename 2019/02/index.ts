import { Intcode } from '../lib';
import { readFile, printResult } from '../utils';

export const program = readFile(`${__dirname}/input.txt`);

const intcode = new Intcode(program);
intcode.setState(1, 12);
intcode.setState(2, 2);
intcode.run();

export const part1 = intcode.output;

export const getInputs = (intcodeMachine: Intcode, target: number): { verb: number, noun: number } => {
  for (let noun = 0; noun <= 99; noun++) {
    for (let verb = 0; verb <= 99; verb++) {
      intcodeMachine.reset();
      intcodeMachine.noun = noun;
      intcodeMachine.verb = verb;
      intcodeMachine.run();

      if (intcodeMachine.output === target) {
        return { verb, noun };
      }
    }
  }

  throw new Error('No noun/verb combination exists');
}

const { noun, verb } = getInputs(intcode, 19690720);

export const part2 = 100 * noun + verb;


printResult(2, part1, part2);

