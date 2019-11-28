export interface ISBPlayer {
  ID: number;
  name?: string;
  gamesWon: number;
  matchesWon: number;
  matchesLost: number;
  omv: number;
  opponents: number[];
}

export type ISBPlayers = ISBPlayer[];
export type ISBPairing = [number, number];
export type ISBPairings = ISBPairing[];
