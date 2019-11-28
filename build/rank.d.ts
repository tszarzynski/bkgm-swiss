import { ISBPlayers, ISBPlayer } from './types';
/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export declare function rankPlayers(players: ISBPlayers): ISBPlayers;
/**
 * Calculate OMV for a given player
 * @param players list of players
 * @param pl player to calculate OMV for
 */
export declare function calcOMV(players: ISBPlayers, pl: ISBPlayer): number;
