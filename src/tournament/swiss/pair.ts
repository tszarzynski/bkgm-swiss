import { pipe } from "ramda";
import { nominatePlayerForBye } from "./bye";
import { makeWeightedGraph } from "./graph";
import { calcMWMForGraph, transformMWMToPairings } from "./mwm";
import { ISBPlayer, ISBPairing } from "../../types";

export function pairPlayers(players: ISBPlayer[]) {
  // check if we have a player with BYE nomination
  const nominatedID = nominatePlayerForBye(players);
  // remove nominated player from the list
  const playersToPair = players.filter(p => p.ID !== nominatedID);

  const pairings = pipe(
    makeWeightedGraph,
    calcMWMForGraph,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== -1
    ? ([...pairings, [nominatedID, -1]] as ISBPairing[])
    : pairings;
}
