const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    // Process input data
    const schedule = processContent(content);

    // Parse schedule into array of guard data then process
    const results = parseSchedule(schedule)
        .then(result => guardSummary(result))
        .then(guardData => {
            const result = [];
            const guard1 = getMaxSleepGuard(guardData);
            result[0] = guard1.id * guard1.bestMin;

            const guard2 = getMaxSleepMinute(guardData);
            result[1] = guard2.id * guard2.bestMin;

            return result;
        });

    // Log results
    results.then(result => {
        console.log(`Answer 1: ${result[0]}`);
        console.log(`Answer 2: ${result[1]}`);
    })
});

/**
 * Convert input data from text into array of data objects sorted chronologically
 * @param {string} str - Input data
 */
const processContent = str => {
    const reg = /\[(\d+)-(\d+)-(\d+) (\d+):(\d+)\]\s(.*)/;
    const lines = str.split('\n').map(line => {
        const [, year, month, day, hour, minute, action] = reg.exec(line);
        return {
            date: new Date(year, month - 1, day, hour, minute),
            action,
        }
    });
    return lines.sort((a, b) => (a.date - b.date));
}

/**
 * Parse schedules of guard actions into meaningful sleep data
 * @param {array} schedule - Schedule data
 */
const parseSchedule = schedule => {
    const guards = {};
    const length = schedule.length;
    const guardReg = /\#(\d+)/;
    const sleepReg = /falls asleep/;

    let guardId = null;
    let sleepMinute = 0;

    return new Promise((resolve, reject) => {
        try {
            for (let i = 0; i < length; i++) {
                const { date, action } = schedule[i];
                const guardMatch = guardReg.exec(action);
                const sleepMatch = sleepReg.exec(action);

                if (guardMatch) {
                    guardId = parseInt(guardMatch[1]);
                    if (!guards[guardId]) {
                        guards[guardId] = initGuard(guardId);
                    }
                } else if (sleepMatch) {
                    sleepMinute = date.getMinutes();
                } else {
                    guards[guardId] = updateSleep(guards[guardId], sleepMinute, date.getMinutes());
                }
            }

            resolve(guards);
        } catch (err) {
            reject(err);
        }
    });
}

/**
 * Summarise each guard's sleep data
 * @param {array} guardData - Guard summaries
 */
const guardSummary = guardData => {
    return new Promise((resolve, reject) => {
        try {
            const summaries = Object.values(guardData).map(data => {
                const tmp = {
                    ...data,
                    bestMin: data.minutes.reduce((maxMin, val, idx) => (val > data.minutes[maxMin] ? idx : maxMin), 0),
                };
                tmp.bestMinVal = tmp.minutes[tmp.bestMin];
                return tmp;
            });
            resolve(summaries);
        } catch (err) {
            reject(err);
        }
    })
}

/**
 * Find the guard who sleeps the most
 * @param {array} guardData - Guard summaries
 */
const getMaxSleepGuard = guardData => {
    return guardData.reduce((resultGuard, thisGuard) => {
        return (thisGuard.total > resultGuard.total) ? thisGuard : resultGuard;
    }, { total: 0, bestMinVal: 0 });
}

/**
 * Find the minute that a guard sleeps in the most
 * @param {array} guardData - Guard summaries
 */
const getMaxSleepMinute = guardData => {
    return guardData.reduce((resultGuard, thisGuard) => {
        return (thisGuard.bestMinVal > resultGuard.bestMinVal) ? thisGuard : resultGuard;
    }, { bestMin: 0, bestMinVal: 0 });
}

/**
 * Updae a summary object with the minutes slept
 * @param {object} guard - Giard summary
 * @param {number} start - Start minute
 * @param {number} end - End minute
 */
const updateSleep = (guard, start, end) => {
    const updated = { ...guard };
    const duration = (end - start);
    for (let i = start; i < end; i++) {
        updated.minutes[i]++;
    }
    updated.total += duration

    return updated;
}

/**
 * Initialise a guard summary
 * @param {string} id - Guard ID
 */
const initGuard = id => ({
    id,
    minutes: new Array(60).fill(0),
    total: 0,
    bestMin: 0,
    bestMinVal: 0,
})