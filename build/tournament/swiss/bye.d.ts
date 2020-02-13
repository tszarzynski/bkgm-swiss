import { PlayerWithStats } from "../../types";
/**
 * Check if we need to grant 'bye' to a player and return nominated player ID
 * @param players list of players
 */
export declare const nominatePlayerForBye: (players: PlayerWithStats[]) => number;
