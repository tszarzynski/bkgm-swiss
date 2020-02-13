import { Match, Pairing } from "./types";
export declare const makeMatch: (roundID: number, pairing: Pairing, ID?: string) => Match;
export declare const makeRound: (pairings: Pairing[], roundID: number) => Match[];
