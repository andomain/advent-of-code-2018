import { readFileLines } from "../../utils";

export enum Opcode {
  NOP = 'nop',
  ACC = 'acc',
  JMP = 'jmp',
};

interface iInstruction {
  opcode: Opcode
  arg: number
}

export class Instruction implements iInstruction {
  constructor (public opcode: Opcode, public arg: number) { }

  changeOpcode(newOp: Opcode) {
    this.opcode = newOp;
  }
}

export class GameConsole {
  public initFile: string;
  public memory: Instruction[];
  public executed: Set<Instruction>;
  public pointer: number = 0;
  public acc: number = 0;
  public ended: boolean = false;
  public loopDetected: boolean = false;
  public completed: boolean = false;
  public modified:boolean = false;

  constructor (inputFile: string) {
    this.initFile = inputFile;
    this.memory = this.readProgram(inputFile);
    this.executed = new Set<Instruction>();
  }

  public readProgram(inputFile: string): Instruction[] {
    return readFileLines(inputFile)
      .map(line => line.split(/\s/) as [Opcode, string])
      .map(([opcode, arg]) => new Instruction(opcode, Number(arg)));
  }

  step(): void {
    const instr = this.memory[this.pointer];
    // If loop detected set flags and end early
    if (this.executed.has(instr)) {
      this.loopDetected = true;
      this.ended = true;
      return;
    }

    // If last instruction update flags before executing
    if (this.pointer === this.memory.length - 1) {
      this.ended = true;
      this.completed = true;
    }

    this.execute(instr);
    this.executed.add(instr);
  }

  execute(instruction: Instruction): void {
    switch (instruction.opcode) {
      case Opcode.NOP:
        this.pointer++;
        break;
      case Opcode.ACC:
        this.pointer++;
        this.acc += instruction.arg;
        break;
      case Opcode.JMP:
        this.pointer += instruction.arg;
        break;
      default: throw new Error(`Unknown opcode ${instruction.opcode}`);
    }
  }

  run() {
    while (!this.ended) {
      this.step();
    }
  }

  reset(): void {
    if(this.modified) {
      this.memory = this.readProgram(this.initFile);
    }
    
    this.ended = false;
    this.modified = false;
    this.completed = false;
    this.loopDetected = false;
    this.pointer = 0;
    this.acc = 0;
  }

  public swapJmpNoop(address: number) {
    const current = this.memory[address];
    const currentOpcode = current.opcode;
    if (currentOpcode === Opcode.ACC) {
      return;
    }

    this.modified = true;

    const newOp = currentOpcode === Opcode.JMP ? Opcode.NOP : Opcode.JMP;
    current.changeOpcode(newOp);
  }
}