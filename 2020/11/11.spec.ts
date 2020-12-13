import { getImmediateSurroundings, getNextInDirection, getNextInAllDirections } from '.';
import { Position, SeatPlan } from './SeatPlan';

describe('Day 11', () => {
  describe('Part One', () => {
    it('counts immediate surroundings', () => {
      const plan = new SeatPlan(
        `${__dirname}/test.txt`,
        getImmediateSurroundings,
        {
          becomeEmpty: () => false,
          becomeOccupied: () => false,
        }
      );

      expect(getImmediateSurroundings(plan, new Position(2, 3))).toEqual({
        empty: 6,
        occupied: 1,
      });
    })
  });

  describe('Part Two', () => {
    let plan: SeatPlan;

    beforeEach(() => {
      plan = new SeatPlan(
        `${__dirname}/test.txt`,
        jest.fn(),
        {
          becomeEmpty: () => false,
          becomeOccupied: () => false,
        }
      );
    });

    it('checks next in direction', () => {
      expect(getNextInDirection(plan, new Position(4, 4), { down: -1, right: 0 })).toBe('#');
    });

    it('counts surroundings in all directions', () => {
      expect(getNextInAllDirections(plan, new Position(6, 7))).toEqual({
        empty: 6,
        occupied: 1,
      })
    })
  })
});