import { readFileLines, printResult } from '../utils';

class Planet {
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

const countOrbits = (
    startPlanet: string,
    orbits: Map<string, string[]>,
    pathLength = 0
) => {
    const branches = orbits.get(startPlanet);
    if (!branches || branches.length < 1) return pathLength;

    let count = pathLength;

    branches.forEach(orbit => {
        count += countOrbits(orbit, orbits, pathLength + 1);
    });

const result1 = sumOrbits(planetLookup, 'COM');

const result1 = countOrbits('COM', orbits);

const santaOrbits = countOrbits('SAN', orbits);

printResult(6, result1);
