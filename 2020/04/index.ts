import { ModifierFlags } from "typescript";
import { numBetween, readFileLines } from "../utils";

const input = readFileLines(`${__dirname}/input.txt`);

const BIRTHY = 'byr';
const ISSUEY = 'iyr';
const EXPY = 'eyr';
const HEIGHT = 'hgt';
const HAIR = 'hcl';
const EYE = 'ecl';
const PASSPORTID = 'pid';
const COUNTRYID = 'cid';

export type Passport = {
  byr?: string
  iyr?: string
  eyr?: string
  hgt?: string
  hcl?: string
  ecl?: string
  pid?: string
  cid?: string
}

export type ValidatedPassport = {
  byr: string
  iyr: string
  eyr: string
  hgt: string
  hcl: string
  ecl: string
  pid: string
  cid?: string
}

type Rule<T> = (candidate: T) => boolean;

class Validator<T> {
  private rules: Rule<T>[];
  constructor (rules: Rule<T>[]) {
    this.rules = rules;
  }

  validate(input: T): boolean {
    return this.rules.every((rule => rule(input)))
  }

  filterInvalid(input: T[]): T[] {
    return input.filter(el => this.validate(el));
  }
}

export const parseInput = (input: string[]): Object[] => {
  const passports = [];
  let currentPassport = {};

  for (let line of input) {
    if (line === '') {
      passports.push(currentPassport);
      currentPassport = {};
    }

    const entries = line.split(/\s/);
    currentPassport = entries.reduce((data, entry) => {
      const [key, val] = entry.split(':');
      return {
        ...data,
        [key]: val,
      }
    }, currentPassport)
  }
  // Push last passport
  passports.push(currentPassport);

  return passports;
}

const passports = parseInput(input) as Passport[];

const requiredKeys = (passport: Passport): boolean => {
  const requiredKeys = [
    BIRTHY,
    ISSUEY,
    EXPY,
    HEIGHT,
    HAIR,
    EYE,
    PASSPORTID,
  ];

  const passportKeys = new Set(Object.keys(passport));

  return requiredKeys.every(reqKey => passportKeys.has(reqKey));
}

const validEyeColors = new Set(['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'])

const validBirthYear = (input: ValidatedPassport): boolean => numBetween(parseInt(input.byr, 10), { min: 1920, max: 2002 });
const validIssueYear = (input: ValidatedPassport): boolean => numBetween(parseInt(input.iyr, 10), { min: 2010, max: 2020 });
const validExpYear = (input: ValidatedPassport): boolean => numBetween(parseInt(input.eyr, 10), { min: 2020, max: 2030 });
const validHeight = (input: ValidatedPassport): boolean => {
  if (/^\d+cm/.test(input.hgt)) {
    return numBetween(parseInt(input.hgt), { min: 150, max: 193 });
  }

  if (/^\d+in/.test(input.hgt)) {
    return numBetween(parseInt(input.hgt), { min: 59, max: 76 });
  }

  return false;
}
const validHair = (input: ValidatedPassport): boolean => /^\#[0-9a-z]{6}$/.test(input.hcl);
const validEye = (input: ValidatedPassport): boolean => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(input.ecl) > -1;
const validPid = (input: ValidatedPassport): boolean => /^[0-9]{9}$/.test(input.pid);
export const validator1 = new Validator<Passport>([requiredKeys]);
export const validator2 = new Validator<ValidatedPassport>([
  validBirthYear,
  validIssueYear,
  validExpYear,
  validHeight,
  validHair,
  validEye,
  validPid,
]);

const validPassports = validator1.filterInvalid(passports) as ValidatedPassport[];
const validPassport2 = validator2.filterInvalid(validPassports);
export const part1 = validPassports.length;
export const part2 = validPassport2.length;

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);