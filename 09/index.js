const fs = require('fs');

const args = process.argv.slice(2);

try {
    if (args.length !== 1) {
        throw new Error('Usage: index.js <inputFile>');
    }

    fs.readFile(args[0], 'utf8', (err, content) => {
        if (err) throw new Error(err);
        const data =processInput(content);
        const result = Array(2);

        data.forEach((game, idx) => {
            result[0] = playGame(game);
            if(game.test && (result[0] !== game.test)) {
                throw new Error(`Test: Game ${idx} result is ${result[0]}. Expected ${game.test}`);
            }
        });

        console.log(result);
    });

} catch(e) {
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
    return data;
}