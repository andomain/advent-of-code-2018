import { Rule } from "../../lib";
import { numBetween } from "../../utils";

export enum PASSPORTFIELD {
  BIRTHY = 'byr',
  ISSUEY = 'iyr',
  EXPY = 'eyr',
  HEIGHT = 'hgt',
  HAIR = 'hcl',
  EYE = 'ecl',
  PASSPORTID = 'pid',
  COUNTRYID = 'cid',
}

export type PassportRecord = {
  byr?: string
  iyr?: string
  eyr?: string
  hgt?: string
  hcl?: string
  ecl?: string
  pid?: string
  cid?: string
}

export interface IPassport {
  byr: string | null
  iyr: string | null
  eyr: string | null
  hgt: string | null
  hcl: string | null
  ecl: string | null
  pid: string | null
  cid: string | null
}

export class Passport implements IPassport {
  public byr: string;
  public iyr: string;
  public eyr: string;
  public hgt: string;
  public hcl: string;
  public ecl: string;
  public pid: string;
  public cid: string;

  constructor (data?: PassportRecord) {
    this.byr = data?.byr || ''
    this.iyr = data?.iyr || ''
    this.eyr = data?.eyr || ''
    this.hgt = data?.hgt || ''
    this.hcl = data?.hcl || ''
    this.ecl = data?.ecl || ''
    this.pid = data?.pid || ''
    this.cid = data?.cid || ''
  }
}

// Validator rules
const requiredKeys = (passport: Passport): boolean => {
  const requiredKeys = [
    PASSPORTFIELD.BIRTHY,
    PASSPORTFIELD.ISSUEY,
    PASSPORTFIELD.EXPY,
    PASSPORTFIELD.HEIGHT,
    PASSPORTFIELD.HAIR,
    PASSPORTFIELD.EYE,
    PASSPORTFIELD.PASSPORTID,
  ];

  return requiredKeys.every(reqKey => passport[reqKey] !== '');
}

const validBirthYear: Rule<Passport> = (input) => numBetween(Number(input.byr), { min: 1920, max: 2002 });
const validIssueYear: Rule<Passport> = (input) => numBetween(Number(input.iyr), { min: 2010, max: 2020 });
const validExpYear: Rule<Passport> = (input) => numBetween(Number(input.eyr), { min: 2020, max: 2030 });
const validHeight: Rule<Passport> = (input) => {
  if (/^\d+cm$/.test(input.hgt)) {
    const height = Number(input.hgt.split('cm')[0]);
    return numBetween(height, { min: 150, max: 193 });
  }

  if (/^\d+in$/.test(input.hgt)) {
    const height = Number(input.hgt.split('in')[0]);
    return numBetween(height, { min: 59, max: 76 });
  }

  return false;
}
const validHair: Rule<Passport> = (input) => /^\#[0-9a-z]{6}$/.test(input.hcl);
const validEye: Rule<Passport> = (input) => ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].indexOf(input.ecl) > -1;
const validPid: Rule<Passport> = (input) => /^[0-9]{9}$/.test(input.pid);

export const PassportValidators = {
  requiredKeys,
  validBirthYear,
  validIssueYear,
  validExpYear,
  validHeight,
  validHair,
  validEye,
  validPid,
}