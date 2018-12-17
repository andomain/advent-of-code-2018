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
            result[0] = playGame(game);
            if (game.test && (result[0] !== game.test)) {
                throw new Error(`Test: Game ${idx} result is ${result[0]}. Expected ${game.test}`);
            }
        });

        console.log(result);
    });

} catch (e) {
    console.log(e);
}

processInput = str => {
    const reg = /(\d+) players; last marble is worth (\d+) points/;
    const isTestReg = /\: high score is (\d+)$/;

    return str.split('\n').map(line => {
        const matches = reg.exec(line);
        const isTest = isTestReg.exec(line);

        return {
            players: matches[1],
            lastMarble: matches[2],
            test: isTest ? isTest[1] : null,
        }
    })
}

playGame = data => {
    const circle = [0];
    let currentPosition = 0;

    const players = initPlayers(data.players);

    for(let marble = 1; marble <= data.lastMarble; marble++) {
        const playerId = (marble - 1) % data.players;
        if(marble && marble % 23 === 0) {
            console.log(`Marble ${marble} is a multiple of 23. Do the handling here`);
            return;
        }

        // Calculate position to insert marble by incrementing current by 1
        currentPosition = currentPosition + 1;
        // If this is equal to the end of the array, add to the beginning, else insert into middle
        currentPosition = (currentPosition >= circle.length ? 0 : currentPosition) + 1;
        console.log(`Player ${playerId} plays marble ${marble} at position ${currentPosition}`);

        circle.splice(currentPosition, 0, marble);
    }
    return data;
}

initPlayers = n => {
    const result = Array(n);
    for(let i = 0; i < n; i++) {
        result[i] = {
            id: i,
            score: 0,
        }
    }
    return result;
}