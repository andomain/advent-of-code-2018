interface IIntcode {
  input: number[];
}

const STEP_SIZE = 4;

const ADD_OPCODE = 1;
const MULT_OPCODE = 2;
const FINISH_OPCODE = 99;

export class Intcode implements IIntcode {
  constructor(public input: number[]) { }

  process(noun: number, verb: number): number {
    const processed = Array.from(this.input);
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

    return processed[0];
  }

}
