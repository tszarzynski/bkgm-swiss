export interface Player {
  ID: number;
  gamesWon: number;
  matchesWon: number;
  matchesLost: number;
  omv: number;
  opponents: number[];
}

export type Players = Player[];
export type Pairing = [number, number];
export type Pairings = Pairing[];
