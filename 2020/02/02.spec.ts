import { countValidPasswordsPartOne, getParts } from '.';
import { readFileLines } from '../utils';

const testInput = readFileLines(`${__dirname}/test.txt`);

describe('Methods', () => {
  describe('getParts', () => {
    it('converts a password line into PasswordParts', () => {
      expect(getParts('1-3 a: abcad')).toEqual({
        min: 1,
        max: 3,
        char: 'a',
        password: 'abcad',
      });
    });
  });
});
describe('Test inputs', () => {
  describe('Part one', () => {
    it('counts how many valid passwords there are', () => {
      expect(countValidPasswordsPartOne(testInput)).toEqual(2);
    });
  });
});
