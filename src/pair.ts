import { pipe } from "ramda";
import { nominatePlayerForBye } from "./bye";
import { makeWeightedGraph } from "./graph";
import { calcMWMForGraph, transformMWMToPairings } from "./mwm";
import { ISBPlayer, ISBPairing } from "./types";
import { shiftArray, toPairs } from "./roundrobin";

const rejectPlayerById = (players: ISBPlayer[], id: number) =>
  players.filter(p => p.ID !== id);

export function pairPlayers(players: ISBPlayer[]) {
  // check if we have a player with BYE nomination
  const nominatedID = nominatePlayerForBye(players);
  // remove nominated player from the list
  const playersToPair = rejectPlayerById(players, nominatedID);

  const pairings = pipe(
    makeWeightedGraph,
    calcMWMForGraph,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== -1
    ? ([...pairings, [nominatedID, -1]] as ISBPairing[])
    : pairings;
}

export function pairPlayersRR(players: ISBPlayer[]) {
  const shiftBy = Math.min(...players.map(players => players.opponents.length));
  const shifted = shiftArray(
    players.map(player => player.ID),
    shiftBy
  );
  return toPairs(shifted);
}
