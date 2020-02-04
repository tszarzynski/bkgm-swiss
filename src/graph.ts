import { compose } from "ramda";
import { ISBPlayer, ISBGraphEdge } from "./types";
import { countOccurences } from "./utils";

/**
 * Returns highest score
 * @param players
 */
export const calcHighestScore = (players: ISBPlayer[]) =>
  Math.max(...players.map(p => p.gamesWon));

/**
 * Returns graph nodes
 * @param length Number of nodes
 */
const makeNodes = (length: number) => Array.from({ length }, (v, k) => k++);
/**
 *  Returns graph edges
 * @param arr Nodes
 */
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

/**
 * Returns unweighted graph
 * @param players
 */
const makeUnweightedGraph = (players: ISBPlayer[]) =>
  compose(makeEdges, makeNodes, (arr: any[]) => arr.length)(players);

/**
 * Returns weighted graph
 * @param players
 */
export const makeWeightedGraph = (players: ISBPlayer[]) => {
  const highestScore = calcHighestScore(players);
  const unweightedGraph = makeUnweightedGraph(players);

  // we use indexes insted of IDs because MWM algorithm requires that in pairPlayer function
  return unweightedGraph.map(
    ([p1, p2]) =>
      [
        p1,
        p2,
        calcEdgeWeight(highestScore, players[p1], players[p2])
      ] as ISBGraphEdge
  );
};

/**
 * Calculate weight
 * @param highestScore Highest score among all players
 * @param pl1 First player
 * @param pl2 Second player
 */
export function calcEdgeWeight(
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
