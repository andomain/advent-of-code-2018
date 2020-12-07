import { Bag, canBagContain, part1, part2 } from ".";
import { readFileLines } from "../utils";

const testBags = readFileLines(`${__dirname}/test.txt`)
  .map(line => new Bag(line));
const bagMap = testBags.reduce((lookup, rule) => lookup.set(rule.color, rule), new Map<string, Bag>());


describe('Day 7', () => {

  describe('Bags', () => {
    it('initialises from a rule', () => {
      const ruleString = 'light red bags contain 1 bright white bag, 2 muted yellow bags.';
      const bag = new Bag(ruleString);
      expect(bag.color).toBe('light red');
      expect(bag.contains).toEqual([{
        color: 'bright white',
        count: 1,
      }, {
        color: 'muted yellow',
        count: 2,
      }]);
    })
  });

  describe('canBagContain', () => {
    it('returns true if bag contains a target', () => {
      expect(canBagContain('light red', 'bright white', bagMap)).toBeTruthy();
    });
    it('returns true if nested bag contains a target', () => {
      expect(canBagContain('light red', 'shiny gold', bagMap)).toBeTruthy();
    });

    it('returns false if bag does not contain target at any level', () => {
      expect(canBagContain('shiny gold', 'bright white', bagMap)).toBeFalsy();
    });

    it('returns false if no rules for bag exist', () => {
      expect(canBagContain('bright white', 'some other bag', bagMap)).toBeFalsy();
    })
  });

  describe('Results', () => {
    describe('Part One', () => {
      it('is correct', () => {
        expect(part1).toBe(355);
      });
    });

    describe('Part Two', () => {
      it('is correct', () => {
        expect(part2).toBe(5312);
      });
    });
  });
});