import { readFileLines } from "../utils";

export enum SYMBOL {
  FLOOR = '.',
  EMPTY = 'L',
  OCCUPIED = '#',
}


export class SeatPlan {
  public positions: string[][];

  public stable: boolean = true;
  private width: number;
  private height: number;

  constructor (public planFile: string) {
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

  public reset() {
    // this.positions = this.clonePlan(this.initPositions);
    this.stable = false;
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
        const surroundings = this.getSurroundings(row, column);
        if (this.isFloor(row, column)) {
          updated[row][column] = SYMBOL.FLOOR;

          continue;
        }


        if (this.isEmpty(row, column) && surroundings.occupied === 0) {          updated[row][column] = SYMBOL.OCCUPIED;
          tmpStable = false;
          continue;
        }

        if (this.isOccupied(row, column) && surroundings.occupied >= 4) {
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

  getSurroundings(row: number, column: number): { empty: number, occupied: number } {
    const surroundings = { empty: 0, occupied: 0 };

    for (let y = -1; y <= 1; y++) {
      for (let x = -1; x <= 1; x++) {
        if (
          (x === 0 && y === 0)
          || this.positions[row + y] === undefined
          || this.positions[row + y][column + x] === undefined
        ) {
          continue;
        }

        if (this.isEmpty(row + y, column + x)) {
          surroundings.empty++;
          continue;
        }

        if (this.isOccupied(row + y, column + x)) {
          surroundings.occupied++;
          continue;
        }
      }
    }

    return surroundings;
  }

  isFloor(row: number, column: number) {
    return this.positions[row][column] === SYMBOL.FLOOR;
  }

  isOccupied(row: number, column: number) {
    return this.positions[row][column] === SYMBOL.OCCUPIED;
  }

  isEmpty(row: number, column: number) {
    return this.positions[row][column] === SYMBOL.EMPTY;
  }

  countOccupied(): number {
    return this.positions.reduce((sum, row) => sum += row.reduce((occupiedCount, position) => {
      if (position === SYMBOL.OCCUPIED) {
        occupiedCount++;
      }
      return occupiedCount;
    }, 0), 0);
  }
}

const plan = new SeatPlan(`${__dirname}/input.txt`);

plan.run();

const part1 = plan.countOccupied();

console.log(`Part One: ${part1}`);