import { Validator } from '../lib/Validator';
import { Passport, PASSPORTFIELD, PassportValidators } from './Passport';

import { readFileLines } from "../utils";

const input = readFileLines(`${__dirname}/input.txt`);

export const parseInput = (input: string[]): Passport[] => {
  const passports = [];
  let currentPassport = new Passport();

  for (let line of input) {
    if (line === '') {
      passports.push(currentPassport);
      currentPassport = new Passport();
    }

    const entries = line.split(/\s/);
    currentPassport = entries.reduce((data, entry) => {
      const [key, val] = entry.split(':') as [PASSPORTFIELD, string];
      data[key] = val;
      return data;
    }, currentPassport)
  }
  // Push last passport
  passports.push(currentPassport);

  return passports;
}

const passports = parseInput(input);

export const validator1 = new Validator<Passport>([PassportValidators.requiredKeys]);
export const validator2 = new Validator<Passport>([
  PassportValidators.requiredKeys,
  PassportValidators.validBirthYear,
  PassportValidators.validIssueYear,
  PassportValidators.validExpYear,
  PassportValidators.validHeight,
  PassportValidators.validHair,
  PassportValidators.validEye,
  PassportValidators.validPid,
]);

const validPassports = validator1.filterInvalid(passports);
const validPassport2 = validator2.filterInvalid(passports);
export const part1 = validPassports.length;
export const part2 = validPassport2.length;

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);