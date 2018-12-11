const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    if (err) throw new Error(err);

    // Get array of coordinates
    const coordinates = getCoordinates(content);

    // Get the largest coordinate
    const upperBound = getMaxCoord(coordinates);

    // Create an nxn array of grids, one for each point.
    // This will calculate the closest coordinate to each point
    const closest = Array(upperBound).fill().map(() => Array(upperBound));

    // For each point in the grid
    for (let x = 0; x < upperBound; x++) {
        for (let y = 0; y < upperBound; y++) {
            closest[x][y] = getShortestDistance(coordinates, [x, y]);
        }
    }

    // Build array of regions for each point
    const regionSizes = calculateRegions(coordinates,upperBound,closest);

    const result = Array(2);
    result[0] = getMaxOfArray(regionSizes);
    console.log(result);
});

/**
 * get minimum/maximum value in an array
 * @param {arr} arr
 */
const getMaxOfArray = arr => Math.max.apply(null, arr);
const getMinOfArray = arr => Math.min.apply(null, arr);

/**
 * Convert input string to array of coordinates
 * @param {string} str
 */
const getCoordinates = str => {
    return str.split('\n').map(line => line.split(', ').map(c => parseInt(c)));
}
/**
 * Get the Manahattan distance between two points
 * @param {array} param0
 * @param {array} param1
 */
const getDistance = ([x1, y1], [x2, y2]) => (Math.abs(x1 - x2) + Math.abs(y1 - y2));

/**
 * Get the highest x or y value in an array of coordinates
 * @param {array} coordArr - Array of coordinates
 */
const getMaxCoord = coordArr => {
    return coordArr.reduce((max, coords) => {
        const tmpMax = getMaxOfArray(coords);
        return tmpMax > max ? tmpMax : max;
    }, 0) + 1;

}

/**
 * Get the nearest coordinate to a point
 * @param {array} coordArr - Array of coordinates
 * @param {array} point - Single [x,y] coordinate
 */
const getShortestDistance = (coordArr, point) => {
    // calculate distance to each coordinate from the point
    const distances = coordArr.map(coord => getDistance(point, coord));
    // Find the shortest of these distances
    const shortest = getMinOfArray(distances);

    // If there is one instance of this distance
    if (distances.filter(d => d === shortest).length === 1) {
        // return index of the coordinate/distance for this point
        return distances.indexOf(shortest);
    }
}

/**
 * Get the size of the region closest to each coordinate
 * @param {array} coordArr - Array of coordinates
 * @param {number} upper - Boundary of grid to check
 * @param {array[array]} closestPoints - 2D array of the closest points to each coordinate
 */
const calculateRegions = (coordArr, upper, closestPoints) => {
    const regions = Array(coordArr.length).fill(0);

    const pointsToIgnore = new Set();
    const end = closestPoints.length - 1;

    // Build set of unique points to ignore
    for (let i = 0; i < upper; i++) {
        pointsToIgnore.add(closestPoints[0][i]);
        pointsToIgnore.add(closestPoints[i][0]);
        pointsToIgnore.add(closestPoints[end][i]);
        pointsToIgnore.add(closestPoints[i][end]);
    }

    for (let x = 0; x < upper; x++) {
        for (let y = 0; y < upper; y++) {
            const thisPoint = closestPoints[x][y];
            if (!pointsToIgnore.has(thisPoint)) {
                regions[thisPoint] += 1;
            }
        }
    }

    return regions;
}