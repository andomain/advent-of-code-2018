import { readFileLines } from "../utils";

const TARGET_COLOR = 'shiny gold';

type BagLookup = Map<string, Bag>;

export class Bag {
  public color: string
  public contains: {
    color: string,
    count: number,
  }[] = [];

  constructor (ruleString: string) {
    const ruleParts = Array.from(/^\s*(.*) bags contain (.*)\.\s*$/gm.exec(ruleString)!);
    this.color = ruleParts[1];

    this.contains = ruleParts[2]
      .split(/,/g)
      .filter(containStr => !/no other bags/.test(containStr))
      .map((containStr) => {
        const [, count, color] = Array.from(/(\d+) ([\w\s]+) bag[s]?/.exec(containStr)!);

        return { color, count: Number(count) };
      });
  }
}

export const canBagContain = (color: string, target: string, rules: BagLookup): boolean => {
  if (!rules.has(target)) {
    return false;
  }

  const bag = rules.get(color)!;

  if (bag.contains.some(contained => (contained.color === target) || canBagContain(contained.color, target, rules))) {
    return true;
  }

  return false;
}

export const countBagContents = (target: string, rules: BagLookup): number => {
  const bag = rules.get(target)!;

  return bag.contains.reduce((sum, contents) => {
    sum += (contents.count + contents.count * countBagContents(contents.color, rules));
    return sum;
  }, 0)
}

const bags = readFileLines(`${__dirname}/input.txt`)
  .map(line => new Bag(line))

const bagMap = bags.reduce((lookup, rule) => lookup.set(rule.color, rule), new Map<string, Bag>());

export const part1 = new Set(
  bags.filter(bag => canBagContain(bag.color, TARGET_COLOR, bagMap))
).size;

export const part2 = countBagContents(TARGET_COLOR, bagMap);

console.log(`Part One: ${part1}`);
console.log(`Part Two: ${part2}`);
