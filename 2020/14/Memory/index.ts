export enum VERSION {
  'ONE',
  'TWO',
};

enum InstructionType {
  MASK = 'mask',
  MEM = 'mem',
}

type Mask = string[];

type Instruction = {
  type: InstructionType,
  address?: string,
  value: string,
}

export class Memory {
  private size: number = 36;
  private maskArr: Mask;
  private mem = new Map<number, number>();

  constructor (public version: VERSION = VERSION.ONE) {
    this.maskArr = new Array(this.size).fill('X');
  }

  public run(instructionString: string): void {
    const instruction = this.parseInstruction(instructionString);

    switch (instruction.type) {
      case InstructionType.MASK:
        this.mask = instruction.value;
        break;
      case InstructionType.MEM: this.runMemoryInstruction(instruction);
        break;
      /* istanbul ignore next */
      default: break;
    }
  }

  private runMemoryInstruction(instruction: Instruction) {
    if (this.version === VERSION.ONE) {
      const masked = this.maskBinaryString(instruction.value);
      this.mem.set(this.binaryToDecimal(instruction.address!), this.binaryToDecimal(masked));
      return;
    }

    if (this.version === VERSION.TWO) {
      const addresses = this.maskAddress(instruction.address!);
      addresses.forEach(addr => this.mem.set(addr, this.binaryToDecimal(instruction.value)));
      return;
    }

    throw new Error(`Unknown operating version ${this.version}`);

  }

  private parseInstruction(instructionString: string): Instruction {
    const [opcode, arg] = instructionString.split(/\s+\=\s+/);

    if (opcode === InstructionType.MASK) {
      return {
        type: InstructionType.MASK,
        value: arg,
      }
    }

    if (opcode.match(/^mem/)) {
      const [, address] = /mem\[(\d+)\]/.exec(opcode)!;
      return {
        type: InstructionType.MEM,
        address: this.decimaltoBinary(address),
        value: this.decimaltoBinary(arg),
      }
    }

    throw new Error(`Unknown instruction ${instructionString}`)
  }

  private decimaltoBinary(input: string): string {
    return Number(input).toString(2).padStart(this.size, '0')
  }

  private binaryToDecimal(input: string): number {
    return parseInt(input, 2);
  }

  private maskBinaryString(binaryStr: string): string {
    const result = new Array(this.size);

    for (let i = 0; i < this.size; i++) {
      result[i] = this.mask[i] === 'X' ? binaryStr[i] : this.mask[i];
    }

    return result.join('');
  }

  private maskAddress(addr: string): number[] {
    const padded = addr;
    let results: string[] = [];
    let masked = new Array(this.size);


    for (let i = 0; i < this.size; i++) {
      masked[i] = this.mask[i] === '0' ? padded[i] : this.mask[i];
    }

    results.push(masked.join(''));

    let pointer = 0;
    while (pointer < this.size) {
      const updated: string[] = [];

      for (let i = 0; i < results.length; i++) {
        if (results[i][pointer] !== 'X') {
          updated.push(results[i]);
          continue;
        }

        for (let j = 0; j <= 1; j++) {
          const newAddr = `${results[i].slice(0, pointer)}${j}${results[i].slice(pointer + 1)}`;
          updated.push(newAddr);
        }
      }

      results = updated;
      pointer++;
    }
    return results.map(addr => this.binaryToDecimal(addr));
  }

  set mask(input: string) {
    this.maskArr = input.split('');
  }

  get mask() {
    return this.maskArr.join('');
  }

  get memory() {
    return this.mem;
  }

  get memorySum() {
    return Array.from(this.memory.values()).reduce((sum, value) => sum += value, 0);
  }
}