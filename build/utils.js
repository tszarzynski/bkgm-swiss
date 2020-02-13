"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Count occurances of elements in Array
 * @param arr Array of numbers
 */
function countOccurences(arr) {
    return arr.reduce((acc, val) => acc.set(val, 1 + (acc.get(val) || 0)), new Map());
}
exports.countOccurences = countOccurences;
/**
 * Returns last element from array
 * @param arr
 */
function last(arr) {
    return arr[arr.length - 1];
}
exports.last = last;
function prop(propName) {
    return (obj) => {
        return obj[propName];
    };
}
exports.prop = prop;
/**
 * Check if number is odd
 * @param n Number
 */
function isOdd(n) {
    return n % 2 !== 0;
}
exports.isOdd = isOdd;
/**
 * Check if number is even
 * @param n Number
 */
function isEven(n) {
    return !isOdd(n);
}
exports.isEven = isEven;
function calcNumRoundsFromResults(results) {
    return new Set(results.map(results => results.roundID)).size;
}
exports.calcNumRoundsFromResults = calcNumRoundsFromResults;
//# sourceMappingURL=utils.js.map