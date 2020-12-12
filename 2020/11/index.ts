import { CountFunction, SeatCount, ToggleRules, SeatPlan, Position } from './SeatPlan'

export const getImmediateSurroundings: CountFunction = (plan, position) => {
  const surroundings: SeatCount = { empty: 0, occupied: 0 };

  for (let y = -1; y <= 1; y++) {
    for (let x = -1; x <= 1; x++) {
      const nextCol = position.column + x;
      const nextRow = position.row + y;

      const checkPosition = new Position(nextRow, nextCol);

      if (
        (x === 0 && y === 0)
        || !plan.hasRow(nextRow)
        || !plan.hasColumn(nextCol)
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
export const part1 = plan1.countOccupied()

console.log(`Part One: ${part1}`);