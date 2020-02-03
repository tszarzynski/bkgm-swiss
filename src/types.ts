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
  bye: number
}

export type ISBPairing = [number, number];
