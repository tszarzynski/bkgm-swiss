"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
function rankPlayers(players) {
    return players.sort((p1, p2) => {
        if (p1.matchesWon > p2.matchesWon)
            return -1;
        if (p1.matchesWon < p2.matchesWon)
            return 1;
        if (p1.gamesWon > p2.gamesWon)
            return -1;
        if (p1.gamesWon < p2.gamesWon)
            return 1;
        if (p1.omv > p2.omv)
            return -1;
        if (p1.omv < p2.omv)
            return 1;
        return 0;
    });
}
exports.rankPlayers = rankPlayers;
/**
 * Calculate OMV for a given player
 * @param players list of players
 * @param pl player to calculate OMV for
 */
function calcOMV(players, pl) {
    return (players
        .filter(p => pl.opponents.includes(p.ID))
        .reduce((acc, p) => acc + p.matchesWon / (p.matchesWon + p.matchesLost), 0) / pl.opponents.length);
}
exports.calcOMV = calcOMV;
//# sourceMappingURL=rank.js.map