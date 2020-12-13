import { readFileLines } from "../utils"

type Route = { id: number, offset: number };

export const getParameters = (filename: string): {
  earliest: number,
  routes: Route[]
} => {
  const lines = readFileLines(filename);

  const busRoutes = lines[1].split(',');

  return {
    earliest: Number(lines[0]),
    routes: busRoutes.reduce((routes: Route[], routeId, offset) => {
      if (routeId !== 'x') {
        routes.push({ id: Number(routeId), offset });
      }
      return routes;
    }, []),
  }
};

export const getNextDepartTime = (after: number, busId: number): number => {
  const loops = after / busId;

  if (Number.isInteger(loops)) {
    return after;
  }

  return Math.ceil(loops) * busId;
}

export const getNextBus = (departAfter: number, buses: Route[]): { id: number, time: number } => buses.reduce((nextBus: { id: number, time: number }, route) => {
  const time = getNextDepartTime(departAfter, route.id);

  if (time < nextBus.time) {
    nextBus = { id: route.id, time }
  }

  return nextBus;
}, { id: 0, time: Number.MAX_SAFE_INTEGER });

export const departsAtTime = (time: number, id: number) => time % id === 0;

export const findTimestamp = (schedule: Route[]): number => {
  const routeCount = schedule.length;
  // Start incrementing by the interval of the first bus
  let increment = schedule[0].id;
  let timestamp = increment;

  // For each bus, find the time when that bus departs at the correct offset
  for (let index = 1; index < routeCount; index++) {
    const thisRoute = schedule[index];
    while (!departsAtTime(timestamp + thisRoute.offset, thisRoute.id)) {
      timestamp += increment;
    }

    // We now increment by the amount to maintain interval of the previous buses
    increment *= thisRoute.id;
  }

  return timestamp;
}

const { earliest, routes } = getParameters(`${__dirname}/input.txt`);
const nextBus = getNextBus(earliest, routes);

const part1 = nextBus.id * (nextBus.time - earliest);
console.log(`Part One: ${part1}`);

const part2 = findTimestamp(routes);
console.log(`Part Two: ${part2}`);
