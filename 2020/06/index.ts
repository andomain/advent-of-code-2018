import { splitByEmptyLine } from "../utils";

export const getUniqueAnswerCount = (groups: string[][]): number => groups.reduce((sum, group) => {
  const allAnswers = group.join('');
  const uniqueAnswers = new Set(allAnswers.split(''));

  return sum += uniqueAnswers.size;
}, 0);

export const getAllAnsweredCount = (groups: string[][]): number => groups.reduce((sum, group) => {
  const numPeople = group.length;
  const allAnswers = group.join('').split('');
  const answerCount = allAnswers.reduce((lookup, answer) => {
    const current = lookup.get(answer) || 0;
    return lookup.set(answer, current + 1);
  }, new Map<string, number>());
  const allAnswered = Array.from(answerCount.entries()).filter(([answer, count]) => count === numPeople)

  return sum += allAnswered.length;
}, 0)

const groups = splitByEmptyLine(`${__dirname}/input.txt`);

export const part1 = getUniqueAnswerCount(groups);
export const part2 = getAllAnsweredCount(groups);

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);
