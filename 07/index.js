const fs = require('fs');

fs.readFile('./input.txt', 'utf8', (err, content) => {
    const result = new Array(2);

    const lines = getLines(content);
    const graph = buildGraph(lines);
    result[0] = buildPath(graph);
    result[1] = scheduleWorkers(graph)

    console.log(result);
});

/**
 * Convert input string into node/branch data
 * @param {string} str 
 */
const getLines = str => {
    const reg = /Step (\w) must be finished before step (\w) can begin./
    return str.split('\n').map(line => {
        const [, node, dep] = reg.exec(line);
        return { node, dep }
    });
}

/**
 * Convert an array of nodes/branches and build a graph
 * @param {array} input - Array of graph data
 */
const buildGraph = input => {
    const graph = {};
    input.forEach(({ node, dep }) => {
        const prev = graph[`${dep}`] || [];
        graph[`${dep}`] = [...prev, node];
        if (!graph[`${node}`]) {
            graph[`${node}`] = [];
        }
    });
    return graph;
}

/**
 * Get the first alphabetical node with 0 dependencies
 * @param {object} graph 
 */
const getStartNode = graph => {
    const result = getAvailable(graph);

    // Return the first alphabetical candidate
    return result[0];
}

const getAvailable = graph => Object.keys(graph).filter(node => graph[`${node}`].length === 0).sort();

const getAvailableAndRemove = graph => {
    const available = Object.keys(graph).filter(node => graph[`${node}`].length === 0).sort()
    available.forEach(task => delete graph[`${task}`]);
    return available;
};


/**
 * Loop through the array building the path
 * @param {object} graph 
 */
const buildPath = graph => {
    let result = '';
    let tmp = JSON.parse(JSON.stringify(graph));
    while (Object.keys(tmp).length) {
        const startNode = getStartNode(tmp);
        result += startNode;
        tmp = updateDependencies(tmp, startNode);
    }
    return result;
}

/**
 * Remove a node from the graph and any dependencies
 * @param {object} graph 
 * @param {string} node  
 */
updateDependencies = (graph, node) => {
    delete graph[node];
    Object.keys(graph).forEach(graphNode => {
        const index = graph[graphNode].indexOf(node);
        if (index > -1) {
            graph[graphNode].splice(index, 1);
        }
    });
    return graph;
}

// Solution to part 2
const scheduleWorkers = (graph, n = 5, base_duration = 60) => {
    const lookup = getTaskDuration(base_duration);
    const workers = [...Array(n)].map((a, idx) => ({
        id: idx,
        idle: true,
        task: null,
        endTime: null,
    }));

    let tmp = JSON.parse(JSON.stringify(graph));
    let time = 0;
    let toDo = [];

    while (Object.keys(tmp).length || workers.filter(w => !w.idle).length > 0) {
        const busyWorkers = workers.filter(w => !w.idle);

        // Check if any workers have finished tasks
        busyWorkers.forEach(w => {
            if (time === w.endTime) {
                workers[w.id].idle = true;
                workers[w.id].endTime = null;
                tmp = updateDependencies(tmp, w.task);
            }
        });

        toDo.push(...getAvailableAndRemove(tmp));
        toDo.sort();
        const availableWorkers = workers.filter(w => w.idle);

        // Assign available workers to available tasks
        while (availableWorkers.length && toDo.length) {
            const thisWorker = availableWorkers.shift();
            const thisTask = toDo.shift();

            workers[`${thisWorker.id}`].idle = false;
            workers[`${thisWorker.id}`].task = thisTask;
            workers[`${thisWorker.id}`].endTime = time + lookup[`${thisTask}`];
        }

        time += 1;
    }

    return time - 1;
}

const getTaskDuration = (base) => {
    const alphabet = [...Array(26)].map((a, idx) => String.fromCharCode(idx + 65));
    const lookup = {};
    alphabet.forEach((c, idx) => lookup[`${c}`] = idx + 1 + base);
    return lookup;
}
