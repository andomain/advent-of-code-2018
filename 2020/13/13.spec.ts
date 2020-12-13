import { getNextBus, getNextDepartTime, getParameters } from "."

describe('getParameters', () => {
  it('reads input', () => {
    const results = getParameters(`${__dirname}/test.txt`);
    expect(results.earliest).toBe(939);
    expect(results.running).toEqual([7, 13, 59, 31, 19]);
  });
});

describe('getNextDepartTime', () => {
  it('gets the next departure time after a set time', () => {
    expect(getNextDepartTime(5, 1)).toBe(5);
    expect(getNextDepartTime(6, 2)).toBe(6);
    expect(getNextDepartTime(6, 5)).toBe(10);
    expect(getNextDepartTime(939, 7)).toBe(945);
  });
});

describe('getNextBus', () => {
  it('gets the next bus departing after a time', () => {
    expect(getNextBus(939, [7, 13, 59, 31, 19])).toEqual({ id: 59, time: 944 });
  });
});