import { readFile, getPermutations, printResult } from '../utils';
import { Intcode } from '../utils/Intcode';

interface IAmp {
  phaseSetting: number;
  run: (nuinput: number) => number;
}

interface ICircuit<T> {
  elements: T[];
  size: number;
  run: (initial: number) => number;
}

class Amplifier implements IAmp {
  private processor: Intcode;

  constructor(public phaseSetting: number, program: number[]) {
    this.processor = new Intcode(program);
  }

  run(input: number): number {
    return this.processor.execute([this.phaseSetting, input])
  }
}

class AmpCircuit implements ICircuit<Amplifier>{
  public elements: Amplifier[];

  constructor(public size: number, phase: number[], program: number[]) {
    if (size !== phase.length) {
      throw new Error(`Circuit lenbgth ${size} does not match phase settings ${phase}`);
    }
    this.elements = [];
    for (let i = 0; i < size; i += 1) {
      this.elements.push(new Amplifier(phase[i], program))
    }
  }

  run(initalInput: number = 0): number {
    let input = initalInput;
    for (let i = 0; i < this.size; i += 1) {
      input = this.elements[i].run(input);
    }
    return input;
  }
}

const input = readFile(`${__dirname}/input.txt`).split(',').map(s => Number(s));

const permutations1 = getPermutations([0, 1, 2, 3, 4]);

let result1 = 0;
for (let permutation of permutations1) {
  const circuit = new AmpCircuit(5, permutation, input);
  const tmp = circuit.run(0);
  if (tmp > result1) {
    result1 = tmp;
  }
}

printResult(7, result1);
