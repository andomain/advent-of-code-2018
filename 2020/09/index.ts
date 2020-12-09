import { readFileLines } from "../utils";

const PREAMBLE_SIZE = 25;

const data = readFileLines(`${__dirname}/input.txt`).map(Number);

export class XmasCracker {
  constructor (public stream: number[], public preambleSize: number) { }

  findInvalid(): number {
    const streamSize = this.stream.length;

    for (let i = this.preambleSize; i < streamSize; i++) {
      if (!this.validate(i)) {
        return this.stream[i];
      }
    }

    return -1;
  }

  validate(position: number): boolean {
    const candidate = this.stream[position];
    const parts = this.stream.slice(position - this.preambleSize, position)
      .filter(number => number < candidate)

    const validPartCount = parts.length;

    for (let i = 0; i < validPartCount; i++) {
      const a = parts[i];
      for (let j = 1; j < validPartCount; j++) {
        const b = parts[j];
        if (a + b === candidate) {
          return true;
        }
      }
    }

    return false;
  }
}

const cracker = new XmasCracker(data, PREAMBLE_SIZE);
const part1 = cracker.findInvalid();

console.log(`Part One: ${part1}`);