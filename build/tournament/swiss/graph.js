"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const utils_1 = require("../../utils");
/**
 * Returns highest score
 * @param players
 */
exports.calcHighestScore = (players) => Math.max(...players.map(p => p.gamesWon));
/**
 * Returns graph nodes
 * @param length Number of nodes
 */
const makeNodes = (length) => Array.from({ length }, (v, k) => k++);
/**
 *  Returns graph edges
 * @param arr Nodes
 */
const makeEdges = (arr) => {
    const len = arr.length;
    const ws = [];
    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < len; j++) {
            if (i === j)
                break;
            ws.push([i, j]);
        }
    }
    return ws;
};
/**
 * Returns unweighted graph
 * @param players
 */
const makeUnweightedGraph = (players) => ramda_1.compose(makeEdges, makeNodes)(players.length);
/**
 * Returns weighted graph
 * @param players
 */
exports.makeWeightedGraph = (players) => {
    const highestScore = exports.calcHighestScore(players);
    const unweightedGraph = makeUnweightedGraph(players);
    // we use indexes insted of IDs because MWM algorithm requires that in pairPlayer function
    return unweightedGraph.map(([p1, p2]) => [
        p1,
        p2,
        calcEdgeWeight(highestScore, players[p1], players[p2])
    ]);
};
/**
 * Calculate weight
 * @param highestScore Highest score among all players
 * @param player1 First player
 * @param player2 Second player
 */
function calcEdgeWeight(highestScore, player1, player2) {
    let w = 0;
    // count how mant times pl1 played other players
    const numPlayedOpponents = utils_1.countOccurences(player1.opponents);
    // most played opponent count
    const maxNumPlayedOpponents = Math.max(...Array.from(numPlayedOpponents.values()));
    const numPlayedEachOther = numPlayedOpponents.get(player2.ID) || 0;
    if (numPlayedOpponents.size > 0) {
        if (numPlayedEachOther < maxNumPlayedOpponents) {
            // if pl1 played more games with other players and weight
            w += quality(highestScore, highestScore) + 1;
        }
    }
    // Determine a score for the quality of this pairing based on the points of the higher scoring participant of the two (importance) and how close the two participant's records are.
    const best = Math.max(player1.gamesWon, player2.gamesWon);
    const worst = Math.min(player1.gamesWon, player2.gamesWon);
    const spread = best - worst;
    const closenes = highestScore - spread;
    const importnace = best;
    w += quality(importnace, closenes);
    return w;
}
exports.calcEdgeWeight = calcEdgeWeight;
function quality(importance, closeness) {
    return (importance + 1) ** 2 * (closeness + 1) ** 2;
}
exports.quality = quality;
//# sourceMappingURL=graph.js.map