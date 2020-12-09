import { XmasCracker } from '.';
import { readFileLines } from "../../utils";

describe('Cracker', () => {
  const data = readFileLines(`${__dirname}/test.txt`).map(Number);
  const cracker = new XmasCracker(data, 5);
  const validCracker = new XmasCracker([1, 2, 3], 2);

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
    it('finds invalid values', () => {
      expect(cracker.findInvalid()).toBe(127)
    });

    it('returns -1 if no invalid value', () => {
      expect(validCracker.findInvalid()).toBe(-1);
    })
  });

  describe('weakness', () => {
    it('finds the weakness of an invalid value', () => {
      expect(cracker.weakness(127)).toBe(62);
    });

    it('returns -1 if no weakness found', () => {
      expect(validCracker.weakness(100)).toBe(-1);
    });
  });
});