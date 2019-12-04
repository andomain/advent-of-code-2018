import { Validator } from '../utils/Validator';
import { printResult, readFile } from '../utils';

class PasswordValidator extends Validator<number> {
  validate(candidate: number) {
    const digits = candidate.toString().split('').map(d => Number(d));
    let double = false;

    for (let i = 0; i < digits.length - 1; i += 1) {
      const current = digits[i];
      const next = digits[i + 1];

      if (next < current) {
        return false;
      }
      if (current === next) {
        double = true;
      }
    }
    return double;
  }
}

const input = readFile(`${__dirname}/input.txt`);
const [lower, upper] = input.split('-').map(n => Number(n));

const passwordValidator = new PasswordValidator();

// Dumb implementation: could be optimised
let count = 0
for (let i = lower; i <= upper; i += 1) {
  count += passwordValidator.validate(i) ? 1 : 0;
}

printResult(4, count);
