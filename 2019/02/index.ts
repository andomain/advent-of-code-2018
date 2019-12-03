import { readFile, printResult } from '../utils';

const STEP_SIZE = 4;

const ADD_OPCODE = 1;
const MULT_OPCODE = 2;
const FINISH_OPCODE = 99;

const TARGET_OUTPUT = 19690720;

// Get data
const init = readFile(`${__dirname}/input.txt`).split(',').map(n => Number(n));

const processList = (list: number[], noun: number, verb: number) => {
  const processed = Array.from(list);
  let position = 0;

  processed[1] = noun;
  processed[2] = verb;

  while (processed[position] !== FINISH_OPCODE) {
    const opA = processed[processed[position + 1]];
    const opB = processed[processed[position + 2]];
    const dest = processed[position + 3];

    switch (processed[position]) {
      case ADD_OPCODE:
        processed[dest] = opA + opB;
        break;
      case MULT_OPCODE:
        processed[dest] = opA * opB;
        break;
      default: throw new Error(`Unknown opcode ${processed[position]}`);
    }
    position += STEP_SIZE;
  }

  return processed;
}


// Inefficient loop
const findTarget = (target: number, startList: number[]): { noun: number, verb: number } => {
  for (let noun = 1; noun <= 99; noun++) {
    for (let verb = 1; verb <= 99; verb++) {
      const inter = processList(startList, noun, verb)[0];
      if (inter === target) {
        return { noun, verb };
      }
    }
  }
  throw new Error('Could not calculate target')
}

const result1 = processList(init, 12, 2)[0];
const { noun, verb } = findTarget(TARGET_OUTPUT, init);
const result2 = 100 * noun + verb;

printResult(2, result1, result2);