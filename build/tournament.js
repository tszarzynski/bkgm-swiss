"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const round_1 = require("./round");
const utils_1 = require("./utils");
const players = [
    { ID: 0, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 1, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 2, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 3, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 4, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 5, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
];
function tournament(players) {
    const numRounds = utils_1.roundsNeeded(players.length, 1);
    let round = 0;
    while (round++ < numRounds) {
        console.log('### Round ' + round);
        players = round_1.playRound(players);
        console.log(players);
    }
}
tournament(players);
//# sourceMappingURL=tournament.js.map