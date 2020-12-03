import { traverseMapAndCountTrees } from ".";
import { readFileLines } from "../utils";

const testInput = readFileLines(`${__dirname}/test.txt`);

describe('Test inputs', () => {
  describe('Part one', () => {
    it('traverses map and counts trees', () => {
      expect(traverseMapAndCountTrees(testInput, { right: 3, down: 1 })).toBe(7);
    })
  })
})