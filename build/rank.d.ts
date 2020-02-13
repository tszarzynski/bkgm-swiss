import { Match, Player, PlayerWithStats } from "./types";
/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export declare const rankPlayers: (players: PlayerWithStats[]) => PlayerWithStats[];
export declare const getRanking: (players: Player[], results: Match[]) => PlayerWithStats[];
