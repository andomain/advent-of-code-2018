import { readFileLines } from "../../utils";

export enum SYMBOL {
  FLOOR = '.',
  EMPTY = 'L',
  OCCUPIED = '#',
}

export type Plan = string[][];

export type SeatCount = {
  empty: number,
  occupied: number,
}

export class Position {
  constructor (public row: number, public column: number) { }

  move(direction: Direction): Position {
    return new Position(this.row + direction.down, this.column + direction.right);

  }
}

export type Direction = {
  right: number,
  down: number,
}

export type CountFunction = (plan: SeatPlan, position: Position, ...args: any) => SeatCount;

export type ToggleRules = {
  becomeEmpty: (count: SeatCount) => boolean,
  becomeOccupied: (count: SeatCount) => boolean,
};

export class SeatPlan {
  public positions: string[][];

  public stable: boolean = true;
  private width: number;
  private height: number;

  constructor (
    public planFile: string,
    public countSeats: CountFunction,
    public rules: ToggleRules,

  ) {
    this.positions = this.readPlan(planFile);;
    this.width = this.positions[0].length;
    this.height = this.positions.length;
  }

  public readPlan(planFile: string): SYMBOL[][] {
    return readFileLines(planFile)
      .map(line => line.split('')) as SYMBOL[][];
  }

  public print(): void {
    for (let row of this.positions) {
      console.log(row.join(''));
    }

    console.log('\n');
  }

  public run() {
    this.stable = false;
    while (!this.stable) {
      this.iterate();
    }
  }

  iterate() {
    const updated = new Array(this.height).fill(0).map(_ => new Array(this.width));
    let tmpStable = true;

    for (let row = 0; row < this.height; row++) {
      for (let column = 0; column < this.width; column++) {
        const thisPosition = new Position(row, column);
        const surroundings = this.countSeats(this, thisPosition);

        if (this.isFloor(thisPosition)) {
          updated[row][column] = SYMBOL.FLOOR;
          continue;
        }


        if (this.isEmpty(thisPosition) && this.rules.becomeOccupied(surroundings)) {
          updated[row][column] = SYMBOL.OCCUPIED;
          tmpStable = false;
          continue;
        }

        if (this.isOccupied(thisPosition) && this.rules.becomeEmpty(surroundings)) {
          updated[row][column] = SYMBOL.EMPTY;
          tmpStable = false;
          continue;
        }

        updated[row][column] = this.positions[row][column];
      }
    }

    this.stable = tmpStable;
    this.positions = [...updated];
  }

  countOccupied(): number {
    return this.positions.reduce((sum, row) => sum += row.reduce((occupiedCount, position) => {
      if (position === SYMBOL.OCCUPIED) {
        occupiedCount++;
      }
      return occupiedCount;
    }, 0), 0);
  }

  getPosition(pos: Position) {
    return this.positions[pos.row][pos.column];
  }

  isFloor(position: Position) {
    return this.getPosition(position) === SYMBOL.FLOOR;
  }

  isOccupied(position: Position) {
    return this.getPosition(position) === SYMBOL.OCCUPIED;
  }

  isEmpty(position: Position) {
    return this.getPosition(position) === SYMBOL.EMPTY;
  }

  inBounds(position: Position): boolean {
    return this.hasRow(position.row) && this.hasColumn(position.column);
  }

  hasRow(rowIndex: number): boolean {
    return this.positions[rowIndex] !== undefined;
  }

  hasColumn(colIndex: number): boolean {
    return this.positions[0][colIndex] !== undefined;
  }
}