type TournamentType = "SWISS" | "ROUNDROBIN";

type ISBPlayerID = number;

export interface ISBPlayer {
  ID: number;
  name?: string;
  gamesWon: number;
  matchesWon: number;
  matchesLost: number;
  omv: number;
  opponents: number[];
}

export interface ISBPlayerWithBye extends ISBPlayer {
  bye: number;
}

/**
 * Represents player paring
 */
export type ISBPairing = [ISBPlayerID, ISBPlayerID];

/**
 * Helper for graph operations [node,node,weight]
 */
export type ISBGraphEdge = [number, number, number];
