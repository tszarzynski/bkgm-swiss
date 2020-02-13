import { pipe } from "ramda";
import { nominatePlayerForBye } from "./bye";
import { makeWeightedGraph } from "./graph";
import { calcMWMForGraph, transformMWMToPairings } from "./mwm";
import { PlayerWithResults, Pairing } from "../../types";
import { BYE_ID } from "../../consts";

export function pairPlayers(players: PlayerWithResults[]) {
  // check if we have a player with BYE nomination
  const nominatedID = nominatePlayerForBye(players);
  // remove nominated player from the list
  const playersToPair = players.filter(p => p.ID !== nominatedID);

  const pairings = pipe(
    makeWeightedGraph,
    calcMWMForGraph,
    transformMWMToPairings(playersToPair)
  )(playersToPair);

  return nominatedID !== BYE_ID
    ? ([...pairings, [nominatedID, BYE_ID]] as Pairing[])
    : pairings;
}
