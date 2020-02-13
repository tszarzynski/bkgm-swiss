"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns number of rounds necessary to finish tournament
 * @param numPlayers
 */
function roundsNeeded(numPlayers) {
    return (numPlayers * (numPlayers - 1)) / 2;
}
exports.roundsNeeded = roundsNeeded;
//# sourceMappingURL=rounds.js.map