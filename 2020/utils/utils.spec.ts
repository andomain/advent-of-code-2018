import * as utils from "."

describe('readFile', () => {
  it('reads a text file and trims it', () => {
    expect(utils.readFile(`${__dirname}/test.txt`)).toBe('Multiple lines\ntest file with trailing whitespace');
  });
});

describe('readFileLines', () => {
  it('reads a text file into an array of strings', () => {
    expect(utils.readFileLines(`${__dirname}/test.txt`)).toEqual([
      'Multiple lines',
      'test file with trailing whitespace'
    ]);
  });

  it('passes encoding to readFile', () => {
    const spy = jest.spyOn(utils, 'readFile');
    const result = utils.readFileLines(`${__dirname}/test.txt`, 'latin1');
    expect(spy).toHaveBeenCalledWith(`${__dirname}/test.txt`, 'latin1');
  });
});

describe('numBetween', () => {
  it('returns true if a value is between a min max (inclusive)', () => {
    expect(utils.numBetween(3, { min: 1, max: 5 })).toBeTruthy();
    expect(utils.numBetween(1, { min: 1, max: 5 })).toBeTruthy();
    expect(utils.numBetween(5, { min: 1, max: 5 })).toBeTruthy();
  });

  it('returns false if a value is outside of a min max (inclusive)', () => {
    expect(utils.numBetween(0, { min: 1, max: 5 })).toBeFalsy();
    expect(utils.numBetween(6, { min: 1, max: 5 })).toBeFalsy();
  });

  it('has default arguments of 0 & MAX_NUM', () => {
    expect(utils.numBetween(1)).toBeTruthy();
    expect(utils.numBetween(-1)).toBeFalsy();
    expect(utils.numBetween(Number.MAX_SAFE_INTEGER + 1)).toBeFalsy();
  })
})
