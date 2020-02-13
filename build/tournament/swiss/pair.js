"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const consts_1 = require("../../consts");
const bye_1 = require("./bye");
const graph_1 = require("./graph");
const mwm_1 = require("./mwm");
function pairPlayers(players) {
    // check if we have a player with BYE nomination
    const nominatedID = bye_1.nominatePlayerForBye(players);
    // remove nominated player from the list
    const playersToPair = players.filter(p => p.ID !== nominatedID);
    const pairings = ramda_1.pipe(graph_1.makeWeightedGraph, mwm_1.calcMWMForGraph, mwm_1.transformMWMToPairings(playersToPair))(playersToPair);
    return nominatedID !== consts_1.BYE_ID
        ? [...pairings, [nominatedID, consts_1.BYE_ID]]
        : pairings;
}
exports.pairPlayers = pairPlayers;
//# sourceMappingURL=pair.js.map