import { readFileLines, printResult } from '../utils';

interface Node {
  parent: Planet | null;
  children: Planet[];
}
class Planet implements Node {
  public parent: Planet | null;
  public children: Planet[];

  constructor(public name: string) {
    this.parent = null;
    this.children = [];
  }

  addChild(child: Planet) {
    this.children.push(child);
  }
}

const planetLookup = readFileLines(`${__dirname}/input.txt`)
  .reduce((lookup, orbitData) => {
    const [center, orbit] = orbitData.split(')');
    let parent = lookup.get(center);
    let thisPlanet = lookup.get(orbit);

    if (!parent) {
      parent = new Planet(center);
    }
    if (!thisPlanet) {
      thisPlanet = new Planet(orbit);
    }

    thisPlanet.parent = parent;
    parent.addChild(thisPlanet);

    lookup.set(orbit, thisPlanet);
    lookup.set(center, parent);

    return lookup;
  }, new Map<string, Planet>());

const sumOrbits = (planets: Map<string, Planet>, start: string, count = 0) => {
  const current = planets.get(start);
  if (!current) {
    throw new Error(`Unknown planet ${start}`);
  }
  if (current.children.length < 1) {
    return count;
  }
  let currentLength = count;
  current.children.forEach(child => {
    currentLength += sumOrbits(planets, child.name, count + 1);
  });
  return currentLength;
}

const getPath = (planets: Map<string, Planet>, from: string, to: string): string[] => {
  const path = [];
  let current = planets.get(to) || null;

  while (current !== null && current.name !== from) {
    path.unshift(current.name);
    current = current.parent;
  }
  path.unshift(from);
  return path;

}

const result1 = sumOrbits(planetLookup, 'COM');
const youPath = getPath(planetLookup, 'COM', 'YOU');
const sanPath = getPath(planetLookup, 'COM', 'SAN');

const minPath = youPath.reduce((min, currentStep, idx): number => {
  const joinPoint = sanPath.indexOf(currentStep);
  if (joinPoint < 0) return min;

  // Remember to subtract two to ignore start/end points
  const interPath = (youPath.length - idx - 1) + (sanPath.length - 1 - joinPoint) - 2;
  return Math.min(min, interPath);
}, Number.MAX_SAFE_INTEGER);

printResult(6, result1, minPath);
