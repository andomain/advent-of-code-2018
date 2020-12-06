export enum OPCODE {
  ADD = 1,
  MULT = 2,
  END = 99,
};

export type Memory = number[];

interface iInstruction {
  execute: (inputState: Memory) => Memory
}

export abstract class Instruction implements iInstruction {
  abstract pointerStep: number

  abstract execute(inputState: Memory): Memory
};

export class AddInstruction extends Instruction {
  public pointerStep = 4;

  constructor (public paramA: number, public paramB: number, public destAddr: number) {
    super();
  }

  execute(input: Memory): Memory {
    const updated = Array.from(input);
    updated[this.destAddr] = this.paramA + this.paramB
    return updated;
  }
}

export class MultInstruction extends Instruction {
  public pointerStep = 4;

  constructor (public paramA: number, public paramB: number, public destAddr: number) {
    super();
  }

  execute(input: Memory): Memory {
    const updated = Array.from(input);
    updated[this.destAddr] = this.paramA * this.paramB
    return updated;
  }
}