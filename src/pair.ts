import blossom from 'edmonds-blossom';
import { countOccurences } from './utils';
import { ISBPlayers, ISBPairings, ISBPlayer } from './types';
import { rankPlayers } from './rank';

export function pairPlayers(players: ISBPlayers) {
  const nominatedID = checkBye(players);

  if (nominatedID !== -1) {
    players = players.filter(p => p.ID !== nominatedID);
  }

  const ws = calcWeights(players);
  const mwm: number[] = blossom(ws);
  const result: ISBPairings = mwm.map((p, index) => [
    players[index].ID,
    p !== -1 ? players[p].ID : -1,
  ]);

  const resultNoDup: ISBPairings = result.reduce<{
    pls: number[];
    prs: ISBPairings;
  }>(
    (acc, curr) => {
      const found = acc.pls.some(pl => curr.includes(pl));

      return found
        ? acc
        : { pls: [...acc.pls, ...curr], prs: [...acc.prs, curr] };
    },
    { pls: [], prs: [] }
  ).prs;

  if (nominatedID !== -1) {
    resultNoDup.push([nominatedID, -1]);
  }

  return resultNoDup;
}

function calcWeights(players: ISBPlayers) {
  const len = players.length;
  // get the highest score
  const highestScore = Math.max(...players.map(p => p.gamesWon));
  const ws = [];

  for (let i = 0; i < len - 1; i++) {
    for (let j = i + 1; j < len; j++) {
      if (i === j) break;
      ws.push([i, j, calcWeight(highestScore, players[i], players[j])]);
    }
  }

  return ws;
}

/**
 * Calculate weight
 * @param highestScore Highest score
 * @param pl1 First player
 * @param pl2 Second player
 */
function calcWeight(highestScore: number, pl1: ISBPlayer, pl2: ISBPlayer) {
  let w = 0;
  const opponents = countOccurences(pl1.opponents);
  if (
    opponents.size > 0 &&
    (opponents.get(pl2.ID) || Number.MAX_VALUE) <
      Math.max(...Array.from(opponents.values()))
  ) {
    w += quality(highestScore, highestScore) + 1;
  }

  const best = Math.max(pl1.gamesWon, pl2.gamesWon);
  const worst = Math.min(pl1.gamesWon, pl2.gamesWon);
  const spread = best - worst;
  const closenes = highestScore - spread;
  const importnace = best;
  w += quality(importnace, closenes);

  return w;
}

export function quality(importance: number, closeness: number) {
  return (importance + 1 ** 2) * (closeness + 1 ** 2);
}

/**
 * Check if we need to grant 'bye' ti a player and return nominated player ID
 * @param players list of players
 */
function checkBye(players: ISBPlayers) {
  if (players.length % 2 !== 0) {
    const playersWithByes = rankPlayers(players).map(p => ({
      ID: p.ID,
      bye: countOccurences(p.opponents).get(-1) || 0,
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
    return -1;
  }
}
