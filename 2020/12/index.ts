import { getInstructions, Ship } from './Ship';

const instructions = getInstructions(`${__dirname}/input.txt`);
const ship = new Ship(instructions);

const manhattan1 = ship.followInstructions({ east: 1, north: 0 }).manhattan;
console.log(`Part One: ${manhattan1}`);

const manhattan2 = ship.followWaypoint({ east: 10, north: 1 }).manhattan;
console.log(`Part Two: ${manhattan2}`);
