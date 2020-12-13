import { readFileLines } from "../utils";

export enum Direction {

  N = 'N',
  S = 'S',
  W = 'W',
  E = 'E',
}

enum Command {
  L = 'L',
  R = 'R',
  F = 'F',
}

type InstructionType = Direction | Command

type Position = {
  east: number,
  north: number,
}


class Instruction {
  public type: InstructionType;
  public value: number;
  // public position: Position
  constructor (instructionString: string) {
    this.type = instructionString[0] as InstructionType;
    this.value = Number(instructionString.slice(1));
    // this.position = { east: 0, north: 0 }
  }
}

export class Ship {
  // public facing: Direction = Direction.E;
  public pos: Position = { east: 0, north: 0 };
  public instructions: Instruction[];
  private dirArray: Direction[] = [Direction.N, Direction.E, Direction.S, Direction.W,]
  private facingPointer = 1;

  constructor (inputFile: string) {
    const lines = readFileLines(inputFile);
    this.instructions = lines.map(line => new Instruction(line))
  }

  travel() {
    for (let instruction of this.instructions) {
      this.runInstruction(instruction);
    }
    return this;
  }

  runInstruction(instruction: Instruction) {
    switch (instruction.type) {
      case Direction.N: this.pos.north += instruction.value;
        break;
      case Direction.S: this.pos.north -= instruction.value;
        break;
      case Direction.E: this.pos.east += instruction.value;
        break;
      case Direction.W: this.pos.east -= instruction.value;
        break;
      case Command.F: this.travelForward(instruction.value);
        break
      case Command.R: this.turn(instruction.value);
        break;
      case Command.L: this.turn(-instruction.value);
        break;
      default: break;
    };
  }

  travelForward(distance: number) {
    if (this.facing === Direction.E) {
      this.pos.east += distance;
    }
    if (this.facing === Direction.W) {
      this.pos.east -= distance;
    }
    if (this.facing === Direction.N) {
      this.pos.north += distance;
    }
    if (this.facing === Direction.S) {
      this.pos.north -= distance;
    }
  }

  turn(degrees: number) {
    const turnStep = degrees / 90;
    this.facingPointer = (4 + this.facingPointer + turnStep) % 4;
  }

  get position() {
    return this.pos;
  }

  get facing() {
    return this.dirArray[this.facingPointer];
  }
}

const ship = new Ship(`${__dirname}/input.txt`);
const endPosition = ship.travel().position;
console.log("🚀 ~ file: index.ts ~ line 106 ~ endPosition", endPosition)

const manhattan = Math.abs(endPosition.east) + Math.abs(endPosition.north);

console.log(`Part One: ${manhattan}`);