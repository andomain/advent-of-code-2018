const input = [0, 13, 1, 8, 6, 15];

type Memory = Map<number, number[]>;

const initMemory = (input: number[]): Memory => {
  const memory: Memory = new Map<number, number[]>();

  input.forEach((num, idx) => {
    memory.set(num, [idx + 1]);
  });

  return memory;
}

const getLastSpokenDifference = (input: number, memory: Memory): number => {
  const spokenTurns = memory.get(input) || [];
  return (spokenTurns[0] - spokenTurns[1]) || 0;
}

const playGame = (input: number[], rounds: number): number => {
  const memory = initMemory(input);

  let lastSpoken = input.length - 1;
  let turn = input.length + 1;

  while (turn <= rounds) {
    lastSpoken = getLastSpokenDifference(lastSpoken, memory);

    const prev = memory.get(lastSpoken) || [];
    memory.set(lastSpoken, [turn, ...prev].slice(0, 2));

    turn += 1;
  }

  return lastSpoken;
}

const part1 = playGame(input, 2020);
console.log(`Part One: ${part1}`);

const part2 = playGame(input, 30000000);
console.log(`Part Two: ${part2}`);