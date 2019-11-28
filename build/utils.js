"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Calculates the minimum number of rounds to be played
 * @param n Number of players
 * @param k Number of standings to determine
 */
function roundsNeeded(n, k) {
    return Math.ceil(Math.log2(n) + Math.log2(k));
}
exports.roundsNeeded = roundsNeeded;
/**
 * Count occurances of elements in Array
 * @param arr Array of numbers
 */
function countOccurences(arr) {
    return arr.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
}
exports.countOccurences = countOccurences;
//# sourceMappingURL=utils.js.map