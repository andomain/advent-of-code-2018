import { Validator } from '../utils/Validator';
import { printResult, readFile } from '../utils';

const validateDescending = (candidate: number): boolean => {
  const digits = candidate.toString().split('').map(d => Number(d));
  for (let i = 0; i < digits.length - 1; i += 1) {
    const current = digits[i];
    const next = digits[i + 1];

    if (next < current) {
      return false;
    }
  }
  return true;
}

const validateDouble = (candidate: number): boolean => {
  const digits = candidate.toString().split('').map(d => Number(d));

  for (let i = 0; i < digits.length; i += 1) {
    const current = digits[i];
    const next = digits[i + 1];

    if (current === next) {
      return true
    }
  }
  return false;
}

const validateStrictDouble = (candidate: number): boolean => {
  const digits = candidate.toString().split('').map(d => Number(d));

  for (let i = 0; i < digits.length; i += 1) {
    const current = digits[i];
    let count = 1;

    for (let j = i + 1; j < digits.length; j += 1) {
      if (current === digits[j]) {
        count += 1;
        i = j;
      } else {
        if (count === 2) {
          return true;
        } else {
          j = digits.length;
        }
      }
    }
    if (count == 2) {
      return true;
    }
  }
  return false;
}

const input = readFile(`${__dirname}/input.txt`);
const [lower, upper] = input.split('-').map(n => Number(n));

const descendingValidator = new Validator<number>([validateDescending]);
const doubleValidator = new Validator<number>([validateDouble]);
const strictDoubleValidator = new Validator<number>([validateStrictDouble]);

// Dumb implementation: could be optimised
const nonDescending = [];

// Get all that pass the non descending rule
for (let i = lower; i <= upper; i += 1) {
  if (descendingValidator.validate(i)) {
    nonDescending.push(i);
  }
}

const valid1 = nonDescending.filter(n => doubleValidator.validate(n));
const valid2 = valid1.filter(n => strictDoubleValidator.validate(n))

printResult(4, valid1.length, valid2.length);
