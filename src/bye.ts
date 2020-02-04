import { pipe } from "ramda";

import { BYE_ID, NON_EXISITING_ID } from "./consts";
import { rankPlayers } from "./rank";
import { desc, sortWith } from "./sort";
import { ISBPlayer, ISBPlayerWithBye } from "./types";
import { last, prop, isOdd } from "./utils";

const hasOddNumOfPlayers = (players: ISBPlayer[]) => isOdd(players.length);
const countByes = (opponents: number[]) =>
  opponents.filter(id => id === BYE_ID).length;
const playersWithByes = (players: ISBPlayer[]) =>
  players.map(player => ({ ...player, bye: countByes(player.opponents) }));
const sortByBye = (players: ISBPlayerWithBye[]) =>
  sortWith<ISBPlayerWithBye>([desc("bye")], players);

/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
export const nominatePlayerForBye = (players: ISBPlayer[]) =>
  hasOddNumOfPlayers(players)
    ? pipe(rankPlayers, playersWithByes, sortByBye, last, prop("ID"))(players)
    : NON_EXISITING_ID;
