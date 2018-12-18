const fs = require('fs');

const args = process.argv.slice(2);

try {
    if (args.length !== 1) {
        throw new Error('Usage: index.js <inputFile>');
    }

    fs.readFile(args[0], 'utf8', (err, content) => {
        if (err) throw new Error(err);
        const data = processInput(content);
        const result = Array(2);

        data.forEach((game, idx) => {
            const winner = playGame(game);
            if (game.test) {
                if (winner.score !== game.test) {
                    throw new Error(`Test Failed: Game ${idx} result is ${winner.score}. Expected ${game.test}`);
                } else {
                    console.log(`Test Pass: Game ${idx} result is ${winner.score}. Expected ${game.test}`);
                }
            } else {
                result[0] = playGame(data[0]).score;
                console.log(result);
                result[1] = playGame(data[0], 100).score;
                console.log(result);
            }
        });

    });
} catch (e) {
    console.log(e);
}

/**
 * Convert input string into game data
 * @param {string} str
 */
processInput = str => {
    const reg = /(\d+) players; last marble is worth (\d+) points/;
    const isTestReg = /\: high score is (\d+)$/;

    return str.split('\n').map(line => {
        const matches = reg.exec(line);
        const isTest = isTestReg.exec(line);

        return {
            players: parseInt(matches[1]),
            lastMarble: parseInt(matches[2]),
            test: isTest ? parseInt(isTest[1]) : null,
        }
    })
}

/**
 * Reducer function to find the high score
 * @param {object} max - Accumulator
 * @param {object} player - Player to test
 */
const getHighScore = (max, player) => (player.score > max.score ? player : max);

/**
 * Play the game and return the winner
 * @param {object} data - Game data
 */
playGame = (data, modifier = 1) => {
    const circle = [0];
    const players = initPlayers(data.players);
    const lastMarble = modifier * data.lastMarble
    let currentPosition = 0;


    for (let marble = 1; marble <= lastMarble; marble++) {
        const playerId = (marble - 1) % data.players;
        if(marble % 1000 === 0) {
            console.log(`${marble} / ${lastMarble}`);
        }

        if (marble % 23 === 0) {
            currentPosition = getScorePosition(currentPosition, circle.length);

            players[playerId].score += marble;
            players[playerId].score += parseInt(circle.splice(currentPosition, 1).join());

            continue;
        }

        // Calculate position to insert marble by incrementing current by 1
        currentPosition = updateCurrentPosition(currentPosition, circle.length);
        // Insert marble
        circle.splice(currentPosition, 0, marble);
    }

    return players.reduce(getHighScore, { score: 0 });
}

/**
 * Initialise array of n player objects
 * @param {number} n - No. of players to create
 */
const initPlayers = n => {
    const result = Array(n);
    for (let i = 0; i < n; i++) {
        result[i] = {
            id: i + 1, // To match examples
            score: 0,
        }
    }
    return result;
}

/**
 * Update the current position for a norma round of the game
 * @param {number} current - current position
 * @param {number} length - length of array to find position of
 */
const updateCurrentPosition = (current,length) => {
    let newCurrent = current + 1;
    // If new position is at the end of the array, loop to the first index else increment
    // Add 1 to any result to insert into next position
    if(newCurrent >= length) {
        return 1;
    } else {
        return newCurrent + 1;
    }
}

/**
 * Update the current position for a scoring round of the game
 * @param {number} current
 * @param {number} length
 */
const getScorePosition = (current, length) => {
    let newCurrent = current - 7
    if(newCurrent > -1) {
        return newCurrent;
    }

    return newCurrent + length;
}