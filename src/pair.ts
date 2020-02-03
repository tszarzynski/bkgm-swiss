import * as R from "ramda";
import { nominatePlayerForBye } from "./bye";
import { makeWeightedGraph } from "./graph";
import { calcMWMForGraph, transformMWMToPairings } from "./mwm";
import { ISBPlayer } from "./types";

const rejectPlayerById = (players: ISBPlayer[], id: number) =>
  players.filter(p => p.ID !== id);

export function pairPlayers(players: ISBPlayer[]) {
  // check if we have a player with BYE nomination
  const nominatedID = nominatePlayerForBye(players);
  // remove nominated player from the list
  const playersToPair = rejectPlayerById(players, nominatedID);

  const pairings = R.pipe(
    makeWeightedGraph,
    calcMWMForGraph,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== -1 ? [...pairings, [nominatedID, -1]] : pairings;
}
