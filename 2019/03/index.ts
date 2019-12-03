import {
  Point,
  ManhattanGrid,
  Line,
  Step,
} from '../utils/Grid';
import { printResult, readFileLines, minReduce } from '../utils';

const lineDataToSteps = (data: string): Step[] => data
  .split(',')
  .map(s => new Step(s.substring(0, 1), Number(s.substring(1))));

const [line1Data, line2Data] = readFileLines(`${__dirname}/input.txt`);
const line1Steps = lineDataToSteps(line1Data);
const line2Steps = lineDataToSteps(line2Data);

const origin = new Point(0, 0);
const grid = new ManhattanGrid(origin);

const line1 = new Line(grid);
const line2 = new Line(grid);

// Build paths
line1Steps.forEach(step => line1.step(step));
line2Steps.forEach(step => line2.step(step));

const intersections = line1.getIntersections(line2);

const minDistance = intersections
  .map(p => grid.getDistance(p))
  .reduce(minReduce, Number.POSITIVE_INFINITY);

const minMoves = intersections.reduce((min, i) => {
  return Math.min(min, line1.getMovesToPoint(i) + line2.getMovesToPoint(i));
}, Number.POSITIVE_INFINITY);

printResult(3, minDistance, minMoves);
