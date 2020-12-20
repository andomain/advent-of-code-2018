import { Rule } from "../lib";
import { readFileLines, splitByEmptyLine } from "../utils"



type Rulebook = Map<number, number[][] | string>

const parseInput = (filePath: string): { rulebook: Rulebook, messages: string[] } => {
  const [ruleLines, messages] = splitByEmptyLine(filePath);
  const rulebook: Rulebook = new Map();

  for (let line of ruleLines) {
    const [index, ruleParts] = line.split(': ');
    const rules = ruleParts.split(' | ');
    if (rules[0].startsWith('"') && rules[0].endsWith('"')) {
      rulebook.set(Number(index), rules[0][1]);
    } else {
      rulebook.set(Number(index), rules.map(part => part.split(' ').map(ruleId => Number(ruleId))));
    }
  }

  return { rulebook, messages };
}

const matchRule = (
  line: string,
  ruleBook: Rulebook,
  ruleIndex: number,
  wordIndex = 0,
): number | undefined => {
  const rule = ruleBook.get(ruleIndex)!;

  if (typeof rule === 'string') {
    // If the character matches that in the rule return the next index
    return line[wordIndex] === rule ? wordIndex + 1 : undefined;
  } else {
    // Else check each part of the rule
    for (const rulePart of rule) {
      let i = wordIndex;
      let failed = false;
      for (const ruleIdx of rulePart) {
        const nextIndex = matchRule(line, ruleBook, ruleIdx, i);
        if (nextIndex === undefined) {
          failed = true;
          break;
        } else {
          i = nextIndex;
        }
      }
      if (!failed) {
        return i;
      }
    }
  }

  return undefined;
}

const matchLoopingRule = (
  line: string,
  ruleBook: Rulebook,
  ruleIndex: number,
  wordIndex = 0,
): number[] => {
  const rule = ruleBook.get(ruleIndex)!;

  if (typeof rule === 'string') {
    return line[wordIndex] === rule ? [wordIndex + 1] : [];
  } else {
    return rule.flatMap((r) =>
      r.reduce(
        (acc, n) => {
          return acc.flatMap((ir) => matchLoopingRule(line, ruleBook, n, ir));
        },
        [wordIndex]
      )
    );
  }
};

const data = parseInput(`${__dirname}/input.txt`);

const part1 = data.messages
  .filter(word => matchRule(word, data.rulebook, 0) === word.length).length;
console.log(`Part one: ${part1}`);

data.rulebook.set(8, [[42], [42, 8]]);
data.rulebook.set(11, [[42, 31], [42, 11, 31]]);

const partTwo = data.messages.filter(word => matchLoopingRule(word, data.rulebook, 0)[0] === word.length).length;
console.log("🚀 ~ file: index.ts ~ line 70 ~ partTwo", partTwo)

// Evaluate rules recursively
// const evaluatedRules = evaluateRules(data.rules);
