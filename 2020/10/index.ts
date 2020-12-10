import { readFileLines } from "../utils";

export const getRatings = (fileName: string) => readFileLines(`${__dirname}/${fileName}`)
  .map(Number);

const ratings = getRatings('input.txt');

export const getAdapterDiffs = (ratings: number[]): Map<number, number> => {
  const sortedRatings = ratings.sort((a, b) => a - b)

  const numRatings = ratings.length;

  let currentRating = 0;
  const diffs = new Map<number, number>();

  for (let i = 0; i < numRatings; i++) {
    // Ascending sort
    const diff = sortedRatings[i] - currentRating;
    currentRating = sortedRatings[i];
    const diffCount = diffs.get(diff) || 0;
    diffs.set(diff, diffCount + 1);
  }

  return diffs;
}

const diffs = getAdapterDiffs(ratings);
const part1 = diffs.get(1)! * (diffs.get(3)! + 1);
console.log(`Part One: ${part1}`);

export const getRoutes = (ratings: number[]): number => {
  // Descending sort
  const sortedRatings = ratings.sort((a, b) => b - a);
  // const max = Math.max(...sortedRatings);
  const max = sortedRatings[0];

  // Init with known/required key/values
  const routes: { [key: number]: number } = {
    1: 0,
    2: 0,
    3: 0,
    [max]: 1,
  };
  routes[max] = 1;

  ratings.slice(1).forEach((rating) => {
    let routeCount = 0;

    // Check if there is already a route +1/+2/+3 that leads to the target
    // and add those lengths
    for (let i = rating + 1; i <= rating + 3; i++) {
      const count = routes[i];
      if (count !== undefined) {
        routeCount += count;
      }
    }

    routes[rating] = routeCount;
  });

  return routes[1] + routes[2] + routes[3];
}


const part2 = getRoutes(ratings);
console.log(`Part two: ${part2}`);