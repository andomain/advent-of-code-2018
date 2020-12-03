export const TREE = '#';

export type Position = {
  right: number
  down: number
}

export type SLOPE = {
  right: number
  down: number
};

export type MapCfg = {
  startPosition?: Position
  symbol: string
}

export class TraverseMap {
  private position: Position;
  private startPosition: Position;
  private symbol: string;
  private map: string[];

  constructor (public inputArr: string[], { startPosition = { right: 0, down: 0 }, symbol }: MapCfg = { symbol: TREE }) {
    this.startPosition = startPosition;
    this.position = startPosition;
    this.symbol = symbol;
    this.map = inputArr;
  }

  public traverse(slope: SLOPE): number {
    let count = 0;
    this.position = this.startPosition;

    while (this.position.down < this.map.length) {
      if (this.isSymbol(this.position)) {
        count++;
      }

      this.position = this.step(slope);
    }
    this.reset();
    return count;
  }

  private isSymbol(pos: Position): boolean {
    return this.map[pos.down][pos.right] === this.symbol;
  }

  private step(step: Position): Position {
    const width = this.map[0].length;

    return {
      right: (this.position.right + step.right) % width,
      down: this.position.down + step.down,
    }
  }

  private reset(): void {
    this.position = this.startPosition;
  }

  public get currentPosition() {
    return this.position;
  }

  public set currentPosition(pos: Position) {
    this.position = pos;
  }
}