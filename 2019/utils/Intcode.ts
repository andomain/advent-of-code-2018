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

  process(): void {
    let position = 0;

    while (this.processed[position] !== FINISH_OPCODE) {
      const opA = this.processed[this.processed[position + 1]];
      const opB = this.processed[this.processed[position + 2]];
      const dest = this.processed[position + 3];

      switch (this.processed[position]) {
        case ADD_OPCODE:
          this.processed[dest] = opA + opB;
          break;
        case MULT_OPCODE:
          this.processed[dest] = opA * opB;
          break;
        default: throw new Error(`Unknown opcode ${this.processed[position]}`);
      }
      position += STEP_SIZE;
    }
  }

}
