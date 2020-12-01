import { parseInput, getTwoArrayElementsThatSumTo, getThreeArrayElementsThatSumTo } from ".";

const testInput = parseInput(`${__dirname}/test.txt`);

describe('Methods', () => {
  describe('parseInput', () => {
    it('parses input text lines into a sorted array of numbers', () => {
      expect(testInput).toEqual([
        299,
        366,
        675,
        979,
        1456,
        1721,
      ])
    })
  })

  describe('getTwoArrayElementsThatSumTo', () => {
    it('returns two elements that sum to a value', () => {
      expect(getTwoArrayElementsThatSumTo([1, 2, 3], 5)).toEqual([2, 3]);
    });

    it('throws if no elements sum to value', () => {
      expect(() => getTwoArrayElementsThatSumTo([1, 2, 3], 6)).toThrow('Could not find 2 elements summing to 6');
    });
  });

  describe('getThreeArrayElementsThatSumTo', () => {
    it('returns three elements that sum to a value', () => {
      expect(getThreeArrayElementsThatSumTo([1, 2, 3, 4, 5], 12)).toEqual([3, 4, 5]);
    });

    it('throws if no elements sum to value', () => {
      expect(() => getThreeArrayElementsThatSumTo([1, 2, 3], 7)).toThrow('Could not find 3 elements summing to 7');
    });
  });

  describe('Test inputs', () => {
    describe('Part 1', () => {
      it('gets expected values', () => {
        expect(getTwoArrayElementsThatSumTo(testInput, 2020)).toEqual([299, 1721]);
      });
    });

    describe('Part 2', () => {
      it('gets expected values', () => {
        expect(getThreeArrayElementsThatSumTo(testInput, 2020)).toEqual([366, 675, 979]);
      });
    });
  });
})