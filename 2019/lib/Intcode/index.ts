import { AddInstruction, Instruction, MultInstruction, OPCODE, Memory } from "./Instructions";

export class Intcode {
  private initMemory: Readonly<Memory>
  private memory: Memory
  public pointer: number = 0
  public finished: boolean = false;

  constructor (init: string) {
    const program = init.split(',').map(Number);
    this.initMemory = program
    this.memory = init.split(',').map(Number);
  }

  public buildInstruction(opcode: OPCODE): Instruction {
    switch (opcode) {
      case OPCODE.ADD: return new AddInstruction(this.memory[this.pointer + 1], this.memory[this.pointer + 2], this.memory[this.pointer + 3]);
      case OPCODE.MULT: return new MultInstruction(this.memory[this.pointer + 1], this.memory[this.pointer + 2], this.memory[this.pointer + 3]);
      default: throw new Error(`Unknown instruction opcode ${opcode}`);
    }
  }

  public step(): void {
    const opcode = this.memory[this.pointer];
    if (opcode === OPCODE.END) {
      return this.end()
    }

    const instruction = this.buildInstruction(opcode);
    this.memory = instruction.execute(this.memory);
    this.pointer += instruction.pointerStep;
  }

  public run(): void {
    while (!this.finished) {
      this.step();
    }
  }

  public execute(instruction: Instruction): Memory {
    return instruction.execute(this.memory);
  }

  public end(): void {
    this.finished = true;
  }

  public reset() {
    this.pointer = 0;
    this.finished = false;
    this.memory = [...this.initMemory];
  }

  setState(position: number, value: number): void {
    this.memory[position] = value;
  }

  get state(): Memory {
    return this.memory;
  }

  get output(): number {
    return this.memory[0];
  }

  set noun(value: number) {
    this.memory[1] = value;
  }

  set verb(value: number) {
    this.memory[2] = value;
  }
}