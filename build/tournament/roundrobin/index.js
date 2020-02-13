"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const players_1 = require("../../players");
const round_1 = require("../../round");
const pair_1 = require("./pair");
const rounds_1 = require("./rounds");
exports.tournament = {
    makeRound: (players, results, roundID) => {
        const pairings = pair_1.pairPlayers(players_1.makePlayersWithResults(players, results));
        return round_1.makeRound(pairings, roundID);
    },
    roundsNeeded: rounds_1.roundsNeeded
};
//# sourceMappingURL=index.js.map