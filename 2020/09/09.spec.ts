import { XmasCracker } from '.';
import { readFileLines } from "../utils";

describe('09', () => {
  describe('Cracker', () => {
    const data = readFileLines(`${__dirname}/test.txt`).map(Number);
    const cracker = new XmasCracker(data, 5);

    describe('validate', () => {
      it('returns true if preamble can sum to position', () => {
        expect(cracker.validate(6)).toBeTruthy();
        expect(cracker.validate(7)).toBeTruthy();
        expect(cracker.validate(8)).toBeTruthy();
        expect(cracker.validate(9)).toBeTruthy();
        expect(cracker.validate(10)).toBeTruthy();
        expect(cracker.validate(11)).toBeTruthy();
        expect(cracker.validate(12)).toBeTruthy();
        expect(cracker.validate(13)).toBeTruthy();
      });

      it('returns false if preamble cannot sum to position', () => {
        expect(cracker.validate(14)).toBeFalsy();
      });
    });

    describe('find invalid value', () => {
      expect(cracker.findInvalid()).toBe(127)
    });
  });
});