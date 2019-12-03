const Direction = {
  up: 'U',
  down: 'D',
  left: 'L',
  right: 'R',
}

interface IStep {
  dir: string;
  distance: number;
}

interface IPoint {
  x: number;
  y: number;
}

interface GridPoint extends IPoint {
  distance: number;
}

interface LinePoint extends IPoint {
  moves: number;
}

interface ILine {
  grid: Grid<GridPoint>;
  path: Map<string, LinePoint>;
}

abstract class Grid<T extends GridPoint> {
  public points = new Map<string, T>();
  public origin: Point;

  constructor(public x: number = 0, y: number = 0) {
    this.origin = new Point(x, y);
  }

  abstract addPoint(p: Point): void;

  getDistance(pointId: string): number {
    const point = this.points.get(pointId);

    if (!point) throw new Error(`Point ${pointId} does not exist in the grid`);
    return point.distance;
  }
}

class Point implements IPoint {
  id: string;
  x: number;
  y: number;

  constructor(x: number, y: number) {
    this.id = `${x}/${y}`;
    this.x = x;
    this.y = y;
  }
}

export class Step implements IStep {
  constructor(public dir: string, public distance: number) { }
}

export class ManhattanGrid extends Grid<GridPoint> {
  addPoint(p: Point) {
    this.points.set(p.id, {
      ...p,
      distance: Math.abs(p.x - this.origin.x) + Math.abs(p.y - this.origin.y),
    });
  }
}

export class Line implements ILine {
  public path = new Map<string, LinePoint>()
  public moves = 0;
  public current: Point;

  constructor(public grid: Grid<GridPoint>) {
    this.current = grid.origin;
  }

  move(moveX: number, moveY: number) {
    this.moves++;
    const nextPoint = new Point(this.current.x + moveX, this.current.y + moveY);
    this.grid.addPoint(nextPoint);
    if (!this.path.get(nextPoint.id)) {
      this.path.set(nextPoint.id, {
        ...nextPoint,
        moves: this.moves
      });
    }
    this.current = nextPoint;
  }

  step(step: Step) {
    for (let i = 1; i <= step.distance; i++) {
      switch (step.dir) {
        case Direction.up: this.move(0, 1);
          break;
        case Direction.down: this.move(0, -1);
          break;
        case Direction.right: this.move(1, 0);
          break;
        case Direction.left: this.move(-1, 0);
          break;
        default: throw new Error('Unknown direction');
      }
    }
  }

  getIntersections(otherLine: ILine) {
    return Array.from(this.path.keys()).filter(p => otherLine.path.has(p));
  }

  getMovesToPoint(id: string) {
    const pointData = this.path.get(id);
    if (!pointData) {
      throw new Error(`No data for point ${id}`)
    }
    return pointData.moves;
  }
}
