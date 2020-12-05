import { searchBinaryPartition, getSeatId, part1, part2 } from "."

describe('searchBinaryPartition', () => {
  it('gets the correct result', () => {
    expect(searchBinaryPartition('FBFBBFFRLR'.split(''), 0, 128, 'F')).toBe(44);
    expect(searchBinaryPartition('BFFFBBF'.split(''), 0, 128, 'F')).toBe(70);
    expect(searchBinaryPartition('FFFBBBF'.split(''), 0, 128, 'F')).toBe(14);
    expect(searchBinaryPartition('BBFFBBF'.split(''), 0, 128, 'F')).toBe(102);
    expect(searchBinaryPartition('RLR'.split(''), 0, 8, 'L')).toBe(5);
    expect(searchBinaryPartition('RRR'.split(''), 0, 8, 'L')).toBe(7);
    expect(searchBinaryPartition('RLL'.split(''), 0, 8, 'L')).toBe(4);
  });
});

describe('getSeatId', () => {
  it('gets the seatId', () => {
    expect(getSeatId('FBFBBFFRLR')).toBe(357);
  });
});

describe('Results', () => {
  describe('Part One', () => {
    expect(part1).toBe(955);
  });

  describe('Part Two', () => {
    expect(part2).toBe(569);
  });
})