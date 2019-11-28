export interface ISBPlayer {
    ID: number;
    name?: string;
    gamesWon: number;
    matchesWon: number;
    matchesLost: number;
    omv: number;
    opponents: number[];
}
export declare type ISBPlayers = ISBPlayer[];
export declare type ISBPairing = [number, number];
export declare type ISBPairings = ISBPairing[];
