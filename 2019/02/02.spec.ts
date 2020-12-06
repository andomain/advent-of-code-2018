import { getInputs, part1, part2, program } from '.';
import { Intcode } from '../lib';

describe('Results', () => {
  describe('Part One', () => {
    it('is correct', () => {
      expect(part1).toBe(6327510);
    });
  });

  describe('Part Two', () => {
    it('gets correct verb/noun', () => {
      const intcode = new Intcode(program);
      const { noun, verb } = getInputs(intcode, 19690720);
      
      expect(noun).toBe(41);
      expect(verb).toBe(12);
    });
    
    it('throws if no combo found', () => {
      const intcode = new Intcode('1,0,0,0,99');
      expect(() => getInputs(intcode, 999)).toThrow('No noun/verb combination exists');
      
    })

    it('is correct', () => {
      expect(part2).toBe(4112);
    });
  });
});