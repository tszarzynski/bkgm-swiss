"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const players_1 = require("./players");
const sort_1 = require("./sort");
/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
exports.rankPlayers = (players) => sort_1.sortWith([
    sort_1.desc("matchesWon"),
    sort_1.desc("gamesWon"),
    sort_1.desc("omv")
])(players);
exports.getRanking = (players, results) => ramda_1.compose(exports.rankPlayers, players_1.makePlayersWithStats, players_1.makePlayersWithResults);
//# sourceMappingURL=rank.js.map