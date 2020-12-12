import { SeatPlan, SYMBOL } from '.';
import { readFileLines } from "../utils"

describe(' Day 11', () => {
  describe('SeatPlan', () => {
    let plan: SeatPlan;

    beforeEach(() => {
      plan = new SeatPlan(`${__dirname}/test.txt`);
    });

    it('tests if a position is floor', () => {
      expect(plan.isFloor(0, 0)).toBeFalsy();
      expect(plan.isFloor(3, 1)).toBeFalsy();
      expect(plan.isFloor(6, 1)).toBeTruthy();
    });

    it('tests if a position is occupied', () => {
      plan.positions[3][1] = SYMBOL.OCCUPIED;
      expect(plan.isOccupied(0, 0)).toBeFalsy();
      expect(plan.isOccupied(3, 1)).toBeTruthy();
      expect(plan.isOccupied(6, 1)).toBeFalsy();
    });

    it('tests if a position is empy', () => {
      plan.positions[3][1] = SYMBOL.OCCUPIED;
      expect(plan.isEmpty(0, 0)).toBeTruthy();
      expect(plan.isEmpty(3, 1)).toBeFalsy();
      expect(plan.isEmpty(6, 1)).toBeFalsy();
    });

    it('calculates surrounding positions', () => {
      const occupiedPlan = new SeatPlan(`${__dirname}/testOccupied.txt`);
      expect(occupiedPlan.getSurroundings(1, 1)).toEqual({ empty: 4, occupied: 2 })
      expect(occupiedPlan.getSurroundings(2, 1)).toEqual({ empty: 4, occupied: 0 })
    });

    it('iterates', () => {
      plan.iterate();
      // console.log(plan.positions);
      expect(plan.positions).toEqual([
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '#', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '.', '#', '.', '.', '#', '.', '.'],
        ['#', '#', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '.', '#', '#', '.', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
        ['.', '.', '#', '.', '#', '.', '.', '.', '.', '.'],
        ['#', '#', '#', '#', '#', '#', '#', '#', '#', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '#', '.', '#'],
        ['#', '.', '#', '#', '#', '#', '#', '.', '#', '#'],
      ])
    });

    it('runs until stable', () => {
      plan.run();
      expect(plan.stable).toBeTruthy();
      expect(plan.positions).toEqual([
        ['#', '.', '#', 'L', '.', 'L', '#', '.', '#', '#'],
        ['#', 'L', 'L', 'L', '#', 'L', 'L', '.', 'L', '#'],
        ['L', '.', '#', '.', 'L', '.', '.', '#', '.', '.'],
        ['#', 'L', '#', '#', '.', '#', '#', '.', 'L', '#'],
        ['#', '.', '#', 'L', '.', 'L', 'L', '.', 'L', 'L'],
        ['#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#'],
        ['.', '.', 'L', '.', 'L', '.', '.', '.', '.', '.'],
        ['#', 'L', '#', 'L', '#', '#', 'L', '#', 'L', '#'],
        ['#', '.', 'L', 'L', 'L', 'L', 'L', 'L', '.', 'L'],
        ['#', '.', '#', 'L', '#', 'L', '#', '.', '#', '#'],
      ]);
    });

    it('counts occupied', () => {
      plan.run();
      expect(plan.countOccupied()).toBe(37);
    });
  });
});