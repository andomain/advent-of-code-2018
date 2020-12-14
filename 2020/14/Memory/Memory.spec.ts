import { Memory, VERSION } from '.';

describe('Memory', () => {
  let version1: Memory;
  let version2: Memory;

  beforeEach(() => {
    version1 = new Memory();
    version2 = new Memory(VERSION.TWO);
  });

  it('initialises', () => {
    expect(version1.mask).toBe('X'.repeat(36));
    expect(version1.memory).toEqual(new Map<number, number>());
  });

  it('runs branch instructions', () => {
    version1.run('mask = 000000000000000000000000000000X1001X');
    expect(version1.mask).toBe('000000000000000000000000000000X1001X');
  });

  it('throws if unknown instruction', () => {
    expect(() => version1.run('abc')).toThrow('Unknown instruction abc')
  });

  it('sums memory', () => {
    version1.run('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X');
    version1.run('mem[8] = 11');
    version1.run('mem[7] = 101');
    version1.run('mem[8] = 0');

    expect(version1.memorySum).toBe(165);
  });

  it('operates in version 1 or 2', () => {
    const error = new Memory();
    error.version = 3 as VERSION;

    expect(() => error.run('mem[1] = 1')).toThrow('Unknown operating version 3');
  })

  describe('Version 1', () => {
    it('runs memory instructions', () => {
      version1.run('mask = XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X');
      version1.run('mem[8] = 11');

      expect(version1.memory.get(8)).toBe(73);
    });
  });

  describe('Version 2', () => {
    it('runs memory instructions', () => {
      version2.run('mask = 000000000000000000000000000000X1001X');
      version2.run('mem[42] = 100');
      console.log("🚀 ~ file: Memory.spec.ts ~ line 49 ~ it ~ version2", version2.memory)

      expect(version2.memory.get(26)).toBe(100);
      expect(version2.memory.get(27)).toBe(100);
      expect(version2.memory.get(58)).toBe(100);
      expect(version2.memory.get(59)).toBe(100);
    });
  });
});