import { readFileLines, printResult } from '../utils';

const input = readFileLines(`${__dirname}/input.txt`).map(orbitData => {
    const [center, orbit] = orbitData.split(')');
    return {
        center,
        orbit,
    };
});

const orbits = input.reduce((lookup, orbitData) => {
    const currentCenter = lookup.get(orbitData.center) || [];
    currentCenter.push(orbitData.orbit);
    lookup.set(orbitData.center, currentCenter);
    if (!lookup.has(orbitData.orbit)) {
        lookup.set(orbitData.orbit, []);
    }
    return lookup;
}, new Map<string, string[]>());

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

    return count;
};

const result1 = countOrbits('COM', orbits);

const santaOrbits = countOrbits('SAN', orbits);

printResult(6, result1);
