interface IIntcode {
  input: number[];
}

const STEP_SIZE = 4;

const ADD_OPCODE = 1;
const MULT_OPCODE = 2;
const FINISH_OPCODE = 99;

export class Intcode implements IIntcode {
  public init: number[];
  private processed: number[];

  constructor(public input: number[]) {
    this.init = Array.from(input);
    this.processed = Array.from(input);
  }

  set(position: number, value: number): void {
    this.processed[position] = value;
  }

  get(position: number): number {
    return this.processed[position];
  }

  reset(): void {
    this.processed = Array.from(this.init);
  }

  private readOpcode = (rawCode: number): number[] => rawCode
    .toString()
    .padStart(5, '0')
    .split('')
    .slice(1)  // All opcodes only 1 digit
    .reverse()
    .map(s => Number(s))

  process(): void {
    let position = 0;

    while (this.processed[position] !== FINISH_OPCODE) {
      const op = this.readOpcode(this.processed[position]);
      const [opCode, mode1, mode2, mode3] = op;

      const opA = mode1 ? this.processed[position + 1] : this.processed[this.processed[position + 1]];
      const opB = mode2 ? this.processed[position + 2] : this.processed[this.processed[position + 2]];
      // const opC = mode3 ? this.processed[position + 3] : this.processed[this.processed[position + 3];

      switch (opCode) {
        case ADD_OPCODE:
          this.processed[this.processed[position + 3]] = this.add(opA, opB);
          break;
        case MULT_OPCODE:
          this.processed[this.processed[position + 3]] = this.multiply(opA, opB);
          break;
        default: throw new Error(`Unknown opcode ${this.processed[position]}`);
      }
      position += STEP_SIZE;
    }
  }

  private add(a: number, b: number) {
    return a + b;
  }
  private multiply(a: number, b: number) {
    return a * b;
  }


}
