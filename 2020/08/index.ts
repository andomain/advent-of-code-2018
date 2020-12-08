import { GameConsole } from "./GameConsole";

const gameConsole = new GameConsole(`${__dirname}/input.txt`);

// Run with initial loop
gameConsole.run();
const part1 = gameConsole.acc;
console.log(`Part One: ${part1}`);

let swapPointer = 0;

while (!gameConsole.completed) {
  gameConsole.reset();
  gameConsole.swapJmpNoop(swapPointer);
  gameConsole.run();
  swapPointer++;
}

console.log(`Part Two: ${gameConsole.acc}`);
