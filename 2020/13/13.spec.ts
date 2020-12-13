import { departsAtTime, findTimestamp, getNextBus, getNextDepartTime, getParameters } from "."

describe('getParameters', () => {
  it('reads input', () => {
    const results = getParameters(`${__dirname}/test.txt`);
    expect(results.earliest).toBe(939);
    // expect(results.running).toEqual([7, 13, 59, 31, 19]);
    expect(results.routes).toEqual([
      { id: 7, offset: 0 },
      { id: 13, offset: 1 },
      { id: 59, offset: 4 },
      { id: 31, offset: 6 },
      { id: 19, offset: 7 },
    ]);
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
    const testParams = getParameters(`${__dirname}/test.txt`);

    expect(getNextBus(testParams.earliest, testParams.routes)).toEqual({ id: 59, time: 944 });
  });
});

describe('departsAtTime', () => {
  it('returns true if a bus departs at that time', () => {
    expect(departsAtTime(15, 5)).toBeTruthy();
  });

  it('returns false if a bus does not departs at that time', () => {
    expect(departsAtTime(7, 5)).toBeFalsy();
  });
});

describe('findTimestamp', () => {
  it('finds the time when all buses depart at correct offsets', () => {
    const testParams = getParameters(`${__dirname}/test.txt`);
    expect(findTimestamp(testParams.routes)).toBe(1068781);
  });
});