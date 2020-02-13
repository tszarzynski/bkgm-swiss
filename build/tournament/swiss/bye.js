"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ramda_1 = require("ramda");
const consts_1 = require("../../consts");
const rank_1 = require("../../rank");
const sort_1 = require("../../sort");
const utils_1 = require("../../utils");
const hasOddNumOfPlayers = (players) => utils_1.isOdd(players.length);
const countByes = (opponents) => opponents.filter(id => id === consts_1.BYE_ID).length;
const playersWithByes = (players) => players.map(player => (Object.assign(Object.assign({}, player), { bye: countByes(player.opponents) })));
const sortByBye = (players) => sort_1.sortWith([sort_1.desc("bye")])(players);
/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
exports.nominatePlayerForBye = (players) => hasOddNumOfPlayers(players)
    ? ramda_1.pipe(rank_1.rankPlayers, playersWithByes, sortByBye, utils_1.last, utils_1.prop("ID"))(players)
    : consts_1.BYE_ID;
//# sourceMappingURL=bye.js.map