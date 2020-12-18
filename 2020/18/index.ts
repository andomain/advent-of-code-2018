import { readFileLines } from "../utils";

type evaluator = (input: string) => number;

export const getParts = (input: string): { a: number, b: number, op: string } => {
  const [_, a, op, b] = input.match(/\(?(\d+)\s*([\+\*])\s*(\d+)\)?/)!;
  return { a: Number(a), op, b: Number(b) };
}

export const evaluateExpression: evaluator = (input) => {
  let evaluated = input;

  while (/[\+\*]/.test(evaluated)) {
    const firstOp = evaluated.match(/^\(?\d+\s+[\+\*]\s+\d+\)?/)![0];
    const { a, b, op } = getParts(firstOp);

    let result = op === '+' ? a + b : a * b;

    evaluated = evaluated.replace(firstOp, result.toString())
  }

  return Number(evaluated);
}

export const prioritizeAddition: evaluator = (input) => {
  let evaluated = input;

  while (/\+/.test(evaluated)) {
    const thisOp = evaluated.match(/\(?\d+\s*\+\s*\d+\)?/)![0];
    const { a, b } = getParts(thisOp);
    evaluated = evaluated.replace(thisOp, (a + b).toString());
  }

  while (/\*/.test(evaluated)) {
    const thisOp = evaluated.match(/\(?\d+\s*\*\s*\d+\)?/)![0];
    const { a, b, op } = getParts(thisOp);

    evaluated = evaluated.replace(thisOp, (a * b).toString());
  }

  return Number(evaluated);
}

export const evaluateParenthesis = (inputString: string, evaluateFn: evaluator): number => {
  let evaluated = inputString;

  const parenthesisReg = /\(([\d\+\*\s]+)\)/g;
  let bracketsExist = parenthesisReg.test(evaluated);

  while (bracketsExist) {
    evaluated.match(parenthesisReg)!.forEach((bracket) => {
      const result = evaluateFn(bracket);
      evaluated = evaluated.replace(bracket, result.toString());
    });

    bracketsExist = parenthesisReg.test(evaluated);
  }

  return evaluateFn(evaluated);
}

const sum = (sum: number, val: number): number => sum += val;

const lines = readFileLines(`${__dirname}/input.txt`);

const part1 = lines.map(line => evaluateParenthesis(line, evaluateExpression))
  .reduce(sum, 0);
console.log("Part One: ", part1)

const part2 = lines.map(line => evaluateParenthesis(line, prioritizeAddition))
  .reduce(sum, 0);
console.log("Part Two: ", part2)