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
  })
})