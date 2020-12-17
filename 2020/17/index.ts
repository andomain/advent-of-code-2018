import { readFileLines } from "../utils";

enum State {
  active = '#',
  inactive = '.',
}

class Cube {
  public memory: Set<string> = new Set();
  public activeCount: number = 0;
  public candidates: {
    [key: string]: { x: number, y: number, z: number, w: number },
  } = {};

  public getKey(x: number, y: number, z: number, w: number): string {
    return `${x}/${y}/${z}/${w}`;
  }

  public setValue(x: number, y: number, z: number, w: number): void {
    this.memory.add(this.getKey(x, y, z, w));
    this.activeCount++;

    for (let dx = -1; dx <= 1; dx++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dz = -1; dz <= 1; dz++) {
          for (let dw = -1; dw <= 1; dw++) {
            this.candidates[this.getKey(x + dx, y + dy, z + dz, w + dw)] = {
              x: x + dx,
              y: y + dy,
              z: z + dz,
              w: w + dw,
            }
          }
        }
      }
    }

  }

  public isActive(x: number, y: number, z: number, w: number): boolean {
    return this.memory.has(this.getKey(x, y, z, w));
  }
}

const parseInput = (inputFile: string): Cube => {
  const cube = new Cube();

  readFileLines(inputFile).forEach((line, y) => {
    line.split('').forEach((symbol, x) => {
      if (symbol === State.active) {
        cube.setValue(x, y, 0, 0);
      }
    })
  });

  return cube;
}


const simulateStepOne = (inputCube: Cube): Cube => {
  const result = new Cube();

  Object.values(inputCube.candidates).forEach((coord) => {
    const { x, y, z } = coord;
    let activeCount = 0;

    for (let dz = -1; dz <= 1; dz++) {
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          if (dx === 0 && dy === 0 && dz === 0) {
            continue;
          }

          if (inputCube.isActive(x + dx, y + dy, z + dz, 0)) {
            activeCount++;
          }
        }
      }
    }

    if (inputCube.isActive(x, y, z, 0)) {
      if (activeCount === 2 || activeCount === 3) {
        result.setValue(x, y, z, 0);
      }
    } else {
      if (activeCount === 3) {
        result.setValue(x, y, z, 0);
      }
    }
  });

  return result;
}

const simulateStepTwo = (inputCube: Cube): Cube => {
  const result = new Cube();

  Object.values(inputCube.candidates).forEach((coord) => {
    const { x, y, z, w } = coord;
    let activeCount = 0;

    for (let dw = -1; dw <= 1; dw++) {
      for (let dz = -1; dz <= 1; dz++) {
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            if (dx === 0 && dy === 0 && dz === 0 && dw === 0) {
              continue;
            }

            if (inputCube.isActive(x + dx, y + dy, z + dz, w + dw)) {
              activeCount++;
            }
          }
        }
      }
    }

    if (inputCube.isActive(x, y, z, w)) {
      if (activeCount === 2 || activeCount === 3) {
        result.setValue(x, y, z, w);
      }
    } else {
      if (activeCount === 3) {
        result.setValue(x, y, z, w);
      }
    }
  });

  return result;
}

let cube1 = parseInput(`${__dirname}/input.txt`);
let cube2 = parseInput(`${__dirname}/input.txt`);

for (let cycle = 1; cycle <= 6; cycle++) {
  cube1 = simulateStepOne(cube1);
}

const part1 = cube1.activeCount;
console.log(`Part One: ${part1}`);

for (let cycle = 1; cycle <= 6; cycle++) {
  cube2 = simulateStepTwo(cube2);
}

const part2 = cube2.activeCount;
console.log(`Part Two: ${part2}`);