import blossom from "edmonds-blossom";
import { countOccurences } from "./utils";
import { ISBPlayer, ISBPairing } from "./types";
import { rankPlayers } from "./rank";
import { BYE_ID, NON_EXISITING_ID } from "./consts";

import * as R from "ramda";

export function pairPlayers(players: ISBPlayer[]) {
  // check if we have a player with BYE nomination
  const nominatedID = checkBye(players);

  // if we have a player with BYE remove him from the list
  if (nominatedID !== -1) {
    players = players.filter(p => p.ID !== nominatedID);
  }

  // calculate weights for graph edges
  const ws = calcWeights(players);
  // calculate MWM for the graph
  const mwm: number[] = blossom(ws);

  // transform pairings to use players IDs
  const result: ISBPairing[] = mwm.map((p, index) => [
    players[index].ID,
    p !== -1 ? players[p].ID : -1
  ]);

  // remove duplicate pairings from the results i.e [1,3] [3,1]
  const resultNoDup: ISBPairing[] = result.reduce<{
    pls: number[];
    prs: ISBPairing[];
  }>(
    (acc, curr) => {
      const found = acc.pls.some(pl => curr.includes(pl));

      return found
        ? acc
        : { pls: [...acc.pls, ...curr], prs: [...acc.prs, curr] };
    },
    { pls: [], prs: [] }
  ).prs;

  // add player nominated for BYE
  if (nominatedID !== -1) {
    resultNoDup.push([nominatedID, -1]);
  }

  return resultNoDup;
}

// export function calcHighestScore(players: ISBPlayer[]) {
//   return Math.max(...players.map(p => p.gamesWon));
// }

export const calcHighestScore = (players: ISBPlayer[]) =>
  R.compose(
    R.reduce<number, number>(R.max, -Infinity),
    R.map<ISBPlayer, number>(R.prop("gamesWon"))
  )(players);

const nodes = (length: number) => Array.from({ length }, (v, k) => k++);
const uniqPairs = (arr: number[]) =>
  R.pipe(
    R.chain((a: number) => R.map(b => (a == b ? [] : [a, b]))(arr)),
    R.filter(R.pipe(R.isEmpty, R.not)),
    R.uniqBy(R.sort((a: any, b: any) => a - b))
  )(arr);

//@ts-ignore
const graph = R.compose(uniqPairs, nodes, R.length);

export const calcWeights = (players: ISBPlayer[]) =>
  R.converge(
    (pl: ISBPlayer[], pairs: [number, number][], hs: number) =>
      R.map<[number, number], [number, number, number]>(
        ([p1, p2]) => [p1, p2, calcWeight(hs, pl[p1], pl[p2])],
        pairs
      ),
    [R.identity, graph, calcHighestScore]
  )(players);

// export function calcWeights(players: ISBPlayer[]) {
//   const len = players.length;
//   // get the highest score
//   const highestScore = calcHighestScore(players);
//   const ws = [];

//   for (let i = 0; i < len - 1; i++) {
//     for (let j = i + 1; j < len; j++) {
//       if (i === j) break;
//       // we use indexes insted of IDs because MWM algorithm requires that in pairPlayer function
//       ws.push([i, j, calcWeight(highestScore, players[i], players[j])]);
//     }
//   }

//   return ws;
// }

/**
 * Calculate weight
 * @param highestScore Highest score
 * @param pl1 First player
 * @param pl2 Second player
 */
export function calcWeight(
  highestScore: number,
  pl1: ISBPlayer,
  pl2: ISBPlayer
) {
  let w = 0;
  // count how mant times pl1 played other players
  const opponents = countOccurences(pl1.opponents);
  if (opponents.size > 0) {
    if (
      (opponents.get(pl2.ID) || 0) < Math.max(...Array.from(opponents.values()))
    ) {
      // if pl1 played more games with other players and weight
      w += quality(highestScore, highestScore) + 1;
    }
  }

  // Determine a score for the quality of this pairing based on the points of the higher scoring participant of the two (importance) and how close the two participant's records are.
  const best = Math.max(pl1.gamesWon, pl2.gamesWon);
  const worst = Math.min(pl1.gamesWon, pl2.gamesWon);
  const spread = best - worst;
  const closenes = highestScore - spread;
  const importnace = best;
  w += quality(importnace, closenes);

  return w;
}

export function quality(importance: number, closeness: number) {
  return (importance + 1) ** 2 * (closeness + 1) ** 2;
}

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
export function checkBye(players: ISBPlayer[]) {
  if (players.length % 2 !== 0) {
    // nominate a player if number of players is odd

    const playersWithByes = rankPlayers(players).map(p => ({
      ID: p.ID,
      bye: countOccurences(p.opponents).get(BYE_ID) || 0
    }));
    const smallestBye = playersWithByes.reduce(
      (acc, p) => Math.min(acc, p.bye),
      0
    );

    const nominated = playersWithByes
      .reverse()
      .find(p => p.bye === smallestBye);

    return nominated ? nominated.ID : -1;
  } else {
    // no nomination if number of players is even
    return NON_EXISITING_ID;
  }
}
