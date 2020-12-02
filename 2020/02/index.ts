import { logicalXor, numBetween, readFileLines } from "../utils";

const inputLines = readFileLines(`${__dirname}/input.txt`);
export type PasswordParts = {
  min: number
  max: number
  char: string
  password: string
}

export const getParts = (inputString: string): PasswordParts => {
  const reg = /(\d+)\-(\d+) (\w): (\w+)/;
  const parts = inputString.match(reg)!;

  return {
    min: Number(parts[1]),
    max: Number(parts[2]),
    char: parts[3],
    password: parts[4],
  };
}

export const countValidPasswordsPartOne = (inputPasswords: string[]): number => {
  return inputPasswords.reduce((count, passwordLine) => {
    const { min, max, char, password } = getParts(passwordLine);
    const charCount = password.split(char).length - 1;
    if (numBetween(charCount, { min, max })) {
      count++;
    }
    return count;
  }, 0);
}

export const countValidPasswordsPartTwo = (inputPasswords: string[]): number => {
  return inputPasswords.reduce((count, passwordLine) => {
    const { min, max, char, password } = getParts(passwordLine);
    const passwordChars = password.split('');

    if (logicalXor(passwordChars[min - 1] === char, passwordChars[max - 1] === char)) {
      count++;
    }

    return count;
  }, 0);
}

const part1 = countValidPasswordsPartOne(inputLines);
const part2 = countValidPasswordsPartTwo(inputLines);
console.log(`Part 1: ${part1}`);
console.log(`Part 2: ${part2}`);