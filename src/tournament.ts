import { playRound } from "./round";
import { ISBPlayer } from "./types";
import { roundsNeeded } from "./utils";

const players: ISBPlayer[] = [
  { ID: 0, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 1, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 2, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 3, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  { ID: 4, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] },
  //{ ID: 5, matchesWon: 0, matchesLost: 0, omv: 0, gamesWon: 0, opponents: [] }
];

function tournament(players: ISBPlayer[]) {
  const numRounds = roundsNeeded(players.length, 1);
  let round = 0;

  while (round++ < numRounds) {
    console.log("### Round " + round);
    players = playRound(players);
    console.log(players);
  }
}

tournament(players);
