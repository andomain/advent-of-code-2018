interface IIntcode {
  input: number[];
  output: number | null;
}

const ADD_OPCODE = 1;
const MULT_OPCODE = 2;
const INPUT_OPCODE = 3;
const OUTPUT_OPCODE = 4;
const FINISH_OPCODE = 99;

export class Intcode implements IIntcode {
  public init: number[];
  private processed: number[];
  public output: number | null = null;

  constructor(public input: number[]) {
    this.init = Array.from(input);
    this.processed = Array.from(input);
  }

  set(position: number, value: number, mode: number = 1): void {
    if (mode === 1) {
      this.processed[position] = value;
    } else {
      this.processed[this.processed[position]] = value;
    }
  }

  get(position: number, mode: number = 1): number {
    if (mode === 1) {
      return this.processed[position];
    }

    return this.processed[this.processed[position]];
  }

  reset(): void {
    this.processed = Array.from(this.init);
  }

  private readOpcode = (rawCode: number): number[] => {
    const inter = rawCode
      .toString()
      .padStart(5, '0')
      .match(/(\d)(\d)(\d)(\d\d)/);

    if (inter !== null) {
      return inter.slice(1).map(s => Number(s)).reverse();
    }
    throw new Error("Couldn't generate parameters");
  }

  process(input?: number): void {
    let position = 0;

    while (this.processed[position] !== FINISH_OPCODE) {
      const op = this.readOpcode(this.processed[position]);
      const [opCode, mode1, mode2, mode3] = op;

      const opA = this.get(position + 1, mode1);
      const opB = this.get(position + 2, mode2);
      // const opC = this.get(position + 3, mode3);
      const destAddr = this.processed[position + 3];

      switch (opCode) {
        case ADD_OPCODE:
          this.processed[destAddr] = this.add(opA, opB);
          position += 4;
          break;
        case MULT_OPCODE:
          this.processed[destAddr] = this.multiply(opA, opB);
          position += 4;
          break;
        case INPUT_OPCODE:
          if (!input) throw new Error('Please supply an input');
          this.processed[destAddr] = input;
          position += 2;
          break;
        case OUTPUT_OPCODE:
          this.output = opA;
          position += 2;
          break;

        default: throw new Error(`Unknown opcode ${opCode}`);
      }
    }
  }

  private add(a: number, b: number): number {
    return a + b;
  }

  private multiply(a: number, b: number): number {
    return a * b;
  }
}
