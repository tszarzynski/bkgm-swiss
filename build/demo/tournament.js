"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const round_1 = require("./round");
const rounds_1 = require("../tournament/swiss/rounds");
const players = [
    { ID: 0, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 1, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 2, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 3, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 4, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
    { ID: 5, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
];
function tournament(players) {
    const numRounds = rounds_1.roundsNeeded(1)(players.length);
    let round = 0;
    while (round++ < numRounds) {
        console.log('### Round ' + round);
        players = round_1.playRound(players);
        console.log(players);
    }
}
tournament(players);
//# sourceMappingURL=tournament.js.map