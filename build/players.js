"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const omv_1 = require("./omv");
exports.makePlayersWithResults = (players, rounds) => players.map(player => {
    // find all matches played by player
    const playerMatches = rounds.filter(match => match.pairing.includes(player.ID));
    // extract results
    const results = playerMatches.reduce((acc, match) => {
        const idxPlayer = match.pairing.findIndex(p => player.ID === p);
        const idxOpponent = match.pairing.length - 1 - idxPlayer;
        const hasWon = match.result[idxPlayer] > match.result[idxOpponent];
        return {
            gamesWon: acc.gamesWon + match.result[idxPlayer],
            matchesWon: acc.matchesWon + (hasWon ? 1 : 0),
            matchesLost: acc.matchesLost + (!hasWon ? 1 : 0),
            opponents: [...acc.opponents, match.pairing[idxOpponent]]
        };
    }, {
        gamesWon: 0,
        matchesWon: 0,
        matchesLost: 0,
        opponents: []
    });
    return Object.assign(Object.assign({}, player), results);
});
exports.makePlayersWithStats = (players) => players.map(player => (Object.assign(Object.assign({}, player), { omv: omv_1.calcOMV(players, player) })));
//# sourceMappingURL=players.js.map