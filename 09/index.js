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
    const players = initPlayers(data.players);
    const lastMarble = modifier * data.lastMarble

    // Set up start node of a Linked List
    let current = {
        value: 0,
    };
    current.next = current;
    current.prev = current;

    for (let marble = 1; marble <= lastMarble; marble += 1) {
        const player = (marble - 1) % data.players;

        if(marble % 23 === 0) {
            // Add marble to score
            players[player].score += marble;
            // Move current position and update score
            current = current.prev.prev.prev.prev.prev.prev;
            players[player].score += current.prev.value;

            // Remove node from LinkedList
            current.prev.prev.next = current;
            current.prev = current.prev.prev;
        } else {
            // Add marble into linkedlist
            current = addAfter(marble, current.next);
        }
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

const addAfter = (value, node) => {
    const newNode = {
        value,
        prev: node,
        next: node.next,
    }
    node.next.prev = newNode;
    node.next = newNode;
    return newNode;
}