"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const consts_1 = require("../../consts");
/**
 * Shift players
 */
exports.shiftArray = (arr, offset) => {
    // get first array element
    const firstElement = arr.slice(0, 1);
    // get remaining array elements
    const remainingElements = arr.slice(1);
    // shift remaining elements by given offset
    const shiftedElements = remainingElements
        .slice(-offset)
        .concat(remainingElements.slice(0, -offset));
    return [...firstElement, ...shiftedElements];
};
/**
 * Folds array into pairs
 */
exports.toPairs = (arr) => {
    // determine the middle of the array
    const half = Math.ceil(arr.length / 2);
    const firstHalf = arr.slice(0, half);
    const secondHalf = arr.slice(half).reverse();
    // fold intro pairs
    return firstHalf.map((id, idx) => [id, secondHalf[idx] || consts_1.BYE_ID]);
};
function pairPlayers(players) {
    const shiftBy = Math.min(...players.map(players => players.opponents.length));
    const shifted = exports.shiftArray(players.map(player => player.ID), shiftBy);
    return exports.toPairs(shifted);
}
exports.pairPlayers = pairPlayers;
//# sourceMappingURL=pair.js.map