import { getUniqueAnswerCount, getAllAnsweredCount, part1, part2 } from '.';
import { splitByEmptyLine } from '../utils'

describe('Test inputs', () => {
  const inputs = splitByEmptyLine(`${__dirname}/test.txt`);

  describe('Part One', () => {
    it('gets unique answers', () => {
      expect(getUniqueAnswerCount(inputs)).toBe(11);
    });
  });

  describe('Part Two', () => {
    it('gets all answered questions', () => {
      expect(getAllAnsweredCount(inputs)).toBe(6);
    });
  });
});

describe('Results', () => {
  const inputs = splitByEmptyLine(`${__dirname}/input.txt`);

  describe('Part One', () => {
    it('is correct', () => {
      expect(part1).toBe(7283);
    });
  });

  describe('Part Two', () => {
    it('is correct', () => {
      expect(part2).toBe(3520);
    });
  });
});