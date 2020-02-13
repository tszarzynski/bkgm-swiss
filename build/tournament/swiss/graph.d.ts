import { PlayerWithResults, GraphEdge } from "../../types";
/**
 * Returns highest score
 * @param players
 */
export declare const calcHighestScore: (players: PlayerWithResults[]) => number;
/**
 * Returns weighted graph
 * @param players
 */
export declare const makeWeightedGraph: (players: PlayerWithResults[]) => GraphEdge[];
/**
 * Calculate weight
 * @param highestScore Highest score among all players
 * @param player1 First player
 * @param player2 Second player
 */
export declare function calcEdgeWeight(highestScore: number, player1: PlayerWithResults, player2: PlayerWithResults): number;
export declare function quality(importance: number, closeness: number): number;
