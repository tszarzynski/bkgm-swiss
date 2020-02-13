"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Return the minimum number of rounds to be played to determine winner
 * @param numPlayers Number of players
 * @param numStandings Number of standings to determine
 */
function roundsNeeded(numStandings) {
    return (numPlayers) => Math.ceil(Math.log2(numPlayers) + Math.log2(numStandings));
}
exports.roundsNeeded = roundsNeeded;
//# sourceMappingURL=rounds.js.map