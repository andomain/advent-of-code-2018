import { SeatPlan } from '.';
import { getImmediateSurroundings } from '..';

describe('SeatPlan', () => {
  let plan: SeatPlan;

  beforeEach(() => {
    plan = new SeatPlan(
      `${__dirname}/plan.txt`,
      getImmediateSurroundings,
      {
        becomeOccupied: count => count.occupied === 0,
        becomeEmpty: count => count.occupied >= 4,
      },
    );
  });

  it('iterates', () => {
    plan.iterate();
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
    ]);
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

  it('prints', () => {
    const logSpy = jest.spyOn(console, 'log');
    logSpy.mockImplementation((() => null))
    plan.print();
    expect(logSpy).toHaveBeenCalledTimes(11)
  })
});