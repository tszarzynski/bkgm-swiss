import { ISBPlayers, ISBPairings, ISBPlayer } from "./types";
export declare function pairPlayers(players: ISBPlayers): ISBPairings;
/**
 * Calculate weight
 * @param highestScore Highest score
 * @param pl1 First player
 * @param pl2 Second player
 */
export declare function calcWeight(highestScore: number, pl1: ISBPlayer, pl2: ISBPlayer): number;
export declare function quality(importance: number, closeness: number): number;
/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
export declare function checkBye(players: ISBPlayers): number;
