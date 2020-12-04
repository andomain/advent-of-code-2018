import { parseInput, validator1, part1, part2 } from '.';
import { Passport } from './Passport';
import { readFileLines } from '../utils';

const testInput = readFileLines(`${__dirname}/test.txt`);

describe('Methods', () => {
  describe('parseInput', () => {
    it('reads input into an array of objects', () => {
      expect(parseInput(testInput)).toEqual([
        new Passport({
          ecl: 'gry',
          pid: '860033327',
          eyr: '2020',
          hcl: '#fffffd',
          byr: '1937',
          iyr: '2017',
          cid: '147',
          hgt: '183cm',
        }),
        new Passport({
          iyr: '2013',
          ecl: 'amb',
          cid: '350',
          eyr: '2023',
          pid: '028048884',
          hcl: '#cfa07d',
          byr: '1929',
        }),
        new Passport({
          hcl: '#ae17e1',
          iyr: '2013',
          eyr: '2024',
          ecl: 'brn',
          pid: '760753108',
          byr: '1931',
          hgt: '179cm',
        }),
        new Passport({
          hcl: '#cfa07d',
          eyr: '2025',
          pid: '166559648',
          iyr: '2011',
          ecl: 'brn',
          hgt: '59in',
        }),
      ]);
    });
  });
});

describe('Results', () => {
  describe('Part One', () => {
    it('is correct', () => {
      expect(part1).toBe(235);
    });
  });

  describe('Part Two', () => {
    it('is correct', () => {
      expect(part2).toBe(194);
    });
  });
});