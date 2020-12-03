import { TraverseMap } from ".";
import { readFileLines } from "../../utils";

const testInput = readFileLines(`${__dirname}/test.txt`);

describe('Map', () => {
  it('is instanced with an input map', () => {
    const instance = new TraverseMap(['abc', 'def', 'ghi']);
    expect(instance).toBeTruthy();
  });

  it('initialises to top left', () => {
    const instance = new TraverseMap(['abc', 'def', 'ghi']);
    expect(instance.currentPosition).toEqual({ right: 0, down: 0 });
  });

  it('can initialise to any start position', () => {
    const instance = new TraverseMap(['abc', 'def', 'ghi'], { symbol: 'a', startPosition: { right: 2, down: 3 } });
    expect(instance.currentPosition).toEqual({ right: 2, down: 3 });
  });

  it('can set current position', () => {
    const instance = new TraverseMap([]);
    instance.currentPosition = { right: 3, down: 4 };
    expect(instance.currentPosition).toEqual({ right: 3, down: 4 });
  })

  it('traverses the map on a fixed slope and counts symbols', () => {
    const map = new TraverseMap(testInput);
    expect(map.traverse({ right: 1, down: 1 })).toBe(2);
    expect(map.traverse({ right: 3, down: 1 })).toBe(7);
    expect(map.traverse({ right: 5, down: 1 })).toBe(3);
    expect(map.traverse({ right: 7, down: 1 })).toBe(4);
    expect(map.traverse({ right: 1, down: 2 })).toBe(2);
  });
})