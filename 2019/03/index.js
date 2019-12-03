const {
  Point,
  Grid,
  Line,
} = require('../utils/Grid');
const { printResult, readFileLines, minReduce } = require('../utils');

const [line1Data, line2Data] = readFileLines('./input.txt');
const line1Steps = line1Data.split(',').map(s => new Step(s));
const line2Steps = line2Data.split(',').map(s => new Step(s));

const origin = new Point(0, 0);
const grid = new Grid(origin);

const line1 = new Line(grid);
const line2 = new Line(grid);

// Build paths
line1Steps.forEach(step => line1.step(step));
line2Steps.forEach(step => line2.step(step));

const intersections = line1.getIntersections(line2);

const minDistance = intersections
  .map(p => grid.getManhattanDistance(p))
  .reduce(minReduce, Number.POSITIVE_INFINITY);

const minMoves = intersections.reduce((min, i) => {
  return Math.min(min, line1.getMovesToPoint(i) + line2.getMovesToPoint(i));
}, Number.POSITIVE_INFINITY);

printResult(3, minDistance, minMoves);
