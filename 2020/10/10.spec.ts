import { getAdapterDiffs, getRatings, getRoutes } from ".";

const testData1 = getRatings('test1.txt');
const testData2 = getRatings('test2.txt');

describe('Day 10', () => {
  describe('getAdapterDiffs', () => {
    it('calculates the diffs for a set of Adapters', () => {
      const diffs1 = getAdapterDiffs(testData1);
      expect(diffs1.get(1)).toBe(7);
      expect(diffs1.get(3)).toBe(4);

      const diffs2 = getAdapterDiffs(testData2);
      expect(diffs2.get(1)).toBe(22);
      expect(diffs2.get(3)).toBe(9);
    });
  });

  describe('getRoutes', () => {
    it('counts routes to the target', () => {
      const routes1 = getRoutes(testData1);
      expect(routes1).toBe(8);
      const routes2 = getRoutes(testData2);
      expect(routes2).toBe(19208);
    })
  })
})