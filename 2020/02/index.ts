import { numBetween, readFileLines } from "../utils";

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

const part1 = countValidPasswordsPartOne(inputLines);
console.log(`Part 1: ${part1}`);