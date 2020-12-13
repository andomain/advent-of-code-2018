import { readFileLines } from "../../utils";

export enum Direction {
  N = 'N',
  S = 'S',
  W = 'W',
  E = 'E',
}

export enum Command {
  L = 'L',
  R = 'R',
  F = 'F',
}

export type InstructionType = Direction | Command

export type Position = {
  east: number,
  north: number,
}

export const getInstructions = (file: string) => readFileLines(file).map(line => new Instruction(line));

export class Instruction {
  public type: InstructionType;
  public value: number;

  constructor (instructionString: string) {
    this.type = instructionString[0] as InstructionType;
    this.value = Number(instructionString.slice(1));
  }
}

export class Ship {
  private pos: Position = { east: 0, north: 0 };
  public wayPoint: Position;

  constructor (public instructions: Instruction[], initWaypoint: Position = { east: 0, north: 0 }) {
    this.wayPoint = initWaypoint;
  }

  public followInstructions(initWaypoint: Position) {
    this.pos = { east: 0, north: 0 };
    this.wayPoint = initWaypoint;
    for (let instruction of this.instructions) {
      this.followInstruction(instruction);
      console.log(instruction, this.position);
    }
    return this;
  }

  public followWaypoint(initWaypoint: Position) {
    this.pos = { east: 0, north: 0 };
    this.wayPoint = initWaypoint;

    for (let instruction of this.instructions) {
      this.followWaypointInstruction(instruction);
    }
    return this;
  }

  private followInstruction(instruction: Instruction) {
    switch (instruction.type) {
      case Direction.N: this.pos.north += instruction.value;
        break;
      case Direction.S: this.pos.north -= instruction.value;
        break;
      case Direction.E: this.pos.east += instruction.value;
        break;
      case Direction.W: this.pos.east -= instruction.value;
        break;
      default: this.executeCommand(instruction);
    };
  }

  private followWaypointInstruction(instruction: Instruction) {
    switch (instruction.type) {
      case Direction.N: this.wayPoint.north += instruction.value;
        break;
      case Direction.E: this.wayPoint.east += instruction.value;
        break;
      case Direction.S: this.wayPoint.north -= instruction.value;
        break;
      case Direction.W: this.wayPoint.east -= instruction.value;
        break;
      default: this.executeCommand(instruction);
    }
  }

  private executeCommand(instruction: Instruction) {
    switch (instruction.type) {
      case Command.F: this.moveShip(instruction.value);
        break
      case Command.R: this.rotateWaypoint(instruction.value);
        break;
      case Command.L: this.rotateWaypoint(-instruction.value);
        break;
      default: throw new Error(`Unknown instruction: ${instruction.type}`);
    }
  }

  moveShip(distance: number) {
    this.pos.east += this.wayPoint.east * distance;
    this.pos.north += this.wayPoint.north * distance;
  }

  rotateWaypoint(degrees: number): void {
    const updated: Position = { east: 0, north: 0 };
    const antiClockwiseModifier = degrees < 0 ? -1 : 1;

    switch (Math.abs(degrees)) {
      case 90:
        updated.east = antiClockwiseModifier * this.wayPoint.north;
        updated.north = -1 * antiClockwiseModifier * this.wayPoint.east;
        break;
      case 180:
        updated.east = -this.wayPoint.east;
        updated.north = -this.wayPoint.north;
        break;
      case 270:
        return this.rotateWaypoint(antiClockwiseModifier * -90);
      default: throw new Error(`Unknown rotation angle: ${degrees}`);
    }

    this.wayPoint = { ...updated };
  }

  get position() {
    return this.pos;
  }

  get manhattan() {
    return Math.abs(this.pos.east) + Math.abs(this.pos.north);
  }
}