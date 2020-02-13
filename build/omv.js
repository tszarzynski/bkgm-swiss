"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Check if players played each other
 * @param player
 */
const isOpponent = (player) => (possibleOpponent) => possibleOpponent.opponents.includes(player.ID);
/**
 * Return the list of player's opponents
 * @param allPlayers list of all players
 * @param player
 */
const listPlayerOpponents = (allPlayers, player) => allPlayers.filter(isOpponent(player));
/**
 * Return win/lose ratio
 * @param opponent
 */
const calcWinLoseRatio = (player) => player.matchesWon / (player.matchesWon + player.matchesLost);
/**
 * Calculate OMV for a given player
 * @param allPlayers list of all players
 * @param player player to calculate OMV for
 */
exports.calcOMV = (allPlayers, player) => listPlayerOpponents(allPlayers, player).reduce((avg, opponent, _, arr) => avg + calcWinLoseRatio(opponent) / arr.length, 0);
//# sourceMappingURL=omv.js.map