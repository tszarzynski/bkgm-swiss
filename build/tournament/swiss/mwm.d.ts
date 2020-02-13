import { GraphEdge, Pairing, Player } from '../../types';
export declare const transformMWMToPairings: (players: Player[]) => (mwm: number[]) => Pairing[];
/**
 * Calculate MWM for given graph
 * @param graph
 */
export declare const calcMWMForGraph: (graph: GraphEdge[]) => number[];
