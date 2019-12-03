class Point {
  constructor(x, y) {
    this.id = `${x}/${y}`;
    this.x = x;
    this.y = y;
    this.manhattan = Math.abs(x) + Math.abs(y);
  }
}

class Grid {
  constructor(origin) {
    this.origin = origin;
    this.points = new Map();
  }

  addPoint(p) {
    this.points.set(p.id, {
      manhattan: Math.abs(p.x - this.origin.x) + Math.abs(p.y - this.origin.y),
    });
  }

  getManhattanDistance(pointId) {
    return this.points.get(pointId).manhattan;
  }
}

class Line {
  constructor(grid) {
    this.current = grid.origin;
    this.grid = grid;
    this.path = new Map();
    this.moves = 0;
  }

  move(moveX, moveY) {
    this.moves++;
    const nextPoint = new Point(this.current.x + moveX, this.current.y + moveY);
    this.grid.addPoint(nextPoint);
    if (!this.path.get(nextPoint.id)) {
      this.path.set(nextPoint.id, this.moves);
    }
    this.current = nextPoint;
  }

  step(step) {
    for (let i = 1; i <= step.distance; i++) {
      switch (step.dir) {
        case 'U': this.move(0, 1);
          break;
        case 'D': this.move(0, -1);
          break;
        case 'R': this.move(1, 0);
          break;
        case 'L': this.move(-1, 0);
          break;
        default: throw new Error('Unknown direction');
      }
    }
  }

  getIntersections(otherLine) {
    return Array.from(this.path.keys()).filter(p => otherLine.path.has(p));
  }

  getMovesToPoint(id) {
    return this.path.get(id);
  }
}

module.exports = {
  Point,
  Grid,
  Line,
};
