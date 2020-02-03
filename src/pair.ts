import mwm from "edmonds-blossom";
import * as R from "ramda";
import { checkBye } from "./bye";
import { ISBPairing, ISBPlayer } from "./types";
import { countOccurences } from "./utils";

const filterPlayersById = (players: ISBPlayer[], id: number) =>
  players.filter(p => p.ID !== id);


const transformMWMToPairings = (players: ISBPlayer[]) => (mwm: number[]) =>
  mwm.reduce<{ pairs: ISBPairing[]; paired: number[] }>(
    (acc, node, index) => {
      const { pairs, paired } = acc;
      const pair = [
        players[index].ID,
        node !== -1 ? players[node].ID : -1
      ] as ISBPairing;

      return pair.some(id => paired.indexOf(id) !== -1)
        ? acc
        : { pairs: [...pairs, pair], paired: [...paired, ...pair] };
    },

    { pairs: [], paired: [] }
  ).pairs;

export function pairPlayers(players: ISBPlayer[]) {
  // check if we have a player with BYE nomination
  const nominatedID = checkBye(players);
  const playersToPair = filterPlayersById(players, nominatedID);

  const pairings = R.pipe(
    calcWeights,
    mwm,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== -1 ? [...pairings, [nominatedID, -1]] : pairings;
}

/**
 * Returns highest score
 * @param players 
 */
export const calcHighestScore = (players: ISBPlayer[]) =>
  Math.max(...players.map(p => p.gamesWon));

  
const makeNodes = (length: number) => Array.from({ length }, (v, k) => k++);
const makeEdges = (arr: number[]) => {
  const len = arr.length;
  const ws = [];
  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (i === j) break;

      ws.push([i, j]);
    }
  }

  return ws;
};
const makeGraph = (players: ISBPlayer[]) =>
  R.compose(makeEdges, makeNodes, (arr: any[]) => arr.length)(players);

export const calcWeights = (players: ISBPlayer[]) => {
  const highestScore = calcHighestScore(players);
  const unweightedGraph = makeGraph(players);

  // we use indexes insted of IDs because MWM algorithm requires that in pairPlayer function
  return unweightedGraph.map(([p1, p2]) => [
    p1,
    p2,
    calcWeight(highestScore, players[p1], players[p2])
  ]);
};

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


