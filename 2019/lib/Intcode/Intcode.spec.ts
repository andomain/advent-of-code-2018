import { Intcode } from '.';
import { AddInstruction, MultInstruction, OPCODE, Memory } from './Instructions';

const executeTestProgram = (program: string): Memory => {
  const intcode = new Intcode(program);
  intcode.run();
  return intcode.state;
}

describe('Intcode', () => {
  it('initializes a program', () => {
    const intcode = new Intcode('1,2,3');
    expect(intcode.state).toEqual([1, 2, 3]);
    expect(intcode.finished).toBeFalsy();
  });

  describe('Instructions', () => {
    it('builds add instructions', () => {
      const intcode = new Intcode('');
      const instr = intcode.buildInstruction(1);
      expect(instr).toBeInstanceOf(AddInstruction);
    });

    it('builds mult instructions', () => {
      const intcode = new Intcode('');
      const instr = intcode.buildInstruction(2);
      expect(instr).toBeInstanceOf(MultInstruction);
    });

    it('executes a basic Add instruction', () => {
      const intcode = new Intcode('2,3,1,4,99')
      const add = new AddInstruction(1, 2, 3);

      const updated = intcode.execute(add);
      expect(updated).toEqual([2, 3, 1, 3, 99]);
    });

    it('executes a basic Mult instruction', () => {
      const intcode = new Intcode('2,2,3,4,99')
      const mult = new MultInstruction(1, 2, 3);

      const updated = intcode.execute(mult);
      expect(updated).toEqual([2, 2, 3, 2, 99]);
    });

    it('throws when an invalid opcode is detected', () => {
      const intcode = new Intcode('a,2,3,4,99');
      expect(() => intcode.buildInstruction('a' as unknown as OPCODE)).toThrow()
    });
  })

  describe('Execution', () => {
    it('steps through a program', () => {
      const intcode = new Intcode('1,9,10,3,2,3,11,0,99,30,40,50');
      intcode.step();
      expect(intcode.state).toEqual([1, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
      intcode.step();
      expect(intcode.state).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
      intcode.step();
      expect(intcode.state).toEqual([3500, 9, 10, 70, 2, 3, 11, 0, 99, 30, 40, 50]);
      expect(intcode.finished).toBeTruthy();
    });

    it('runs a whole program and ends', () => {
      const intcode = new Intcode('1,9,10,3,2,3,11,0,99,30,40,50');
      const stepSpy = jest.spyOn(intcode, 'step');
      const buildSpy = jest.spyOn(intcode, 'buildInstruction');

      expect(intcode.finished).toBeFalsy();
      intcode.run();
      expect(intcode.finished).toBeTruthy();

      // There are 3 steps in the program
      expect(stepSpy).toHaveBeenCalledTimes(3);
      // There are 2 executable instructions
      expect(buildSpy).toHaveBeenCalledTimes(2);
    });
  });

  // 1,0,0,0,99 becomes 2,0,0,0,99 (1 + 1 = 2).
  // 2,3,0,3,99 becomes 2,3,0,6,99 (3 * 2 = 6).
  // 2,4,4,5,99,0 becomes 2,4,4,5,99,9801 (99 * 99 = 9801).
  // 1,1,1,4,99,5,6,0,99 becomes 30,1,1,4,2,5,6,0,99.

  describe('Basic programs', () => {
    it('executes programs', () => {
      // 1 + 1 = 2
      const test1 = executeTestProgram('1,0,0,0,99');
      // 3 * 2 = 6
      const test2 = executeTestProgram('2,3,0,3,99');
      // 99 * 99 = 9801
      const test3 = executeTestProgram('2,4,4,5,99,0');
      const test4 = executeTestProgram('1,1,1,4,99,5,6,0,99');

      expect(test1).toEqual([2, 0, 0, 0, 99]);
      expect(test2).toEqual([2, 3, 0, 6, 99]);
      expect(test3).toEqual([2, 4, 4, 5, 99, 9801]);
      expect(test4).toEqual([30, 1, 1, 4, 2, 5, 6, 0, 99]);
    });
  });

  describe('Editing State', () => {
    it('updates state', () => {
      const intcode = new Intcode('1,2,3,4,5');
      intcode.setState(1, 9);
      expect(intcode.state).toEqual([1, 9, 3, 4, 5]);
    });

    it('resets modified state', () => {
      const intcode = new Intcode('1,2,3,4,5');
      intcode.reset();
      expect(intcode.state).toEqual([1, 2, 3, 4, 5]);
    });

    it('resets intcode status', () => {
      const intcode = new Intcode('1,0,0,0,99');
      intcode.run();
      expect(intcode.finished).toBeTruthy();
      expect(intcode.pointer).not.toBe(0);

      intcode.reset();
      expect(intcode.finished).toBeFalsy();
      expect(intcode.pointer).toBe(0);
    });

    it('sets a noun at position 1', () => {
      const intcode = new Intcode('1,1,1,1');
      intcode.noun = 2;
      intcode.verb = 3;
      expect(intcode.state).toEqual([1, 2, 3, 1]);
    });
  });
});