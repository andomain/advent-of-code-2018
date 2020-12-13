import { CountFunction, SeatCount, ToggleRules, SeatPlan, Position, Direction, SYMBOL } from './SeatPlan'

const DIRECTIONS: { [key: string]: Direction } = {
  UP: { down: -1, right: 0 },
  DOWN: { down: 1, right: 0 },
  RIGHT: { down: 0, right: 1 },
  LEFT: { down: 0, right: -1 },
  UPRIGHT: { down: -1, right: 1 },
  UPLEFT: { down: -1, right: -1 },
  DOWNRIGHT: { down: 1, right: 1 },
  DOWNLEFT: { down: 1, right: -1 },
}

export const getImmediateSurroundings: CountFunction = (plan, position) => {
  const surroundings: SeatCount = { empty: 0, occupied: 0 };

  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const nextCol = position.column + x;
      const nextRow = position.row + y;

      const checkPosition = new Position(nextRow, nextCol);

      if (
        (x === 0 && y === 0)
        || !plan.inBounds(checkPosition)
      ) {
        continue;
      }

      if (plan.isEmpty(checkPosition)) {
        surroundings.empty++;
        continue;
      }

      if (plan.isOccupied(checkPosition)) {
        surroundings.occupied++;
        continue;
      }
    }
  }

  return surroundings;
}

export const getNextInDirection = (plan: SeatPlan, position: Position, direction: Direction): string => {
  let nextPosition = position.move(direction);

  if (!plan.inBounds(nextPosition)) {
    return SYMBOL.FLOOR;
  }
  
  if (plan.isEmpty(nextPosition)) {
    return SYMBOL.EMPTY;
  }
  
  if (plan.isOccupied(nextPosition)) {
    return SYMBOL.OCCUPIED;
  }

  return getNextInDirection(plan, nextPosition, direction);
}



export const getNextInAllDirections: CountFunction = (plan, position) => {
  let surroundings = { empty: 0, occupied: 0 };

  for (let dir of Object.keys(DIRECTIONS)) {
    const symbol = getNextInDirection(plan, position, DIRECTIONS[dir]);

    surroundings.occupied += symbol === SYMBOL.OCCUPIED ? 1 : 0;
    surroundings.empty += symbol === SYMBOL.EMPTY ? 1 : 0;
  }

  return surroundings;
}

const partOneRules: ToggleRules = {
  becomeOccupied: count => count.occupied === 0,
  becomeEmpty: count => count.occupied >= 4,
}

const plan1 = new SeatPlan(
  `${__dirname}/input.txt`,
  getImmediateSurroundings,
  partOneRules
);

plan1.run();
const part1 = plan1.countOccupied()

console.log(`Part One: ${part1}`);

const plan2 = new SeatPlan(
  `${__dirname}/test.txt`,
  getNextInAllDirections,
  {
    becomeOccupied: count => count.occupied === 0,
    becomeEmpty: count => count.occupied >= 5,
  }
);

plan2.run();

const part2 = plan2.countOccupied();

console.log(`Part Two: ${part2}`);