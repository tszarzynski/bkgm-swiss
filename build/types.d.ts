declare type PlayerID = number;
export interface Player {
    ID: PlayerID;
    name?: string;
    seed?: number;
}
export declare type Results = {
    gamesWon: number;
    matchesWon: number;
    matchesLost: number;
    opponents: PlayerID[];
};
export declare type Stats = {
    omv: number;
};
export interface PlayerWithResults extends Player, Results {
}
export interface PlayerWithStats extends Player, Results, Stats {
}
export interface PlayerWithBye extends Player {
    bye: number;
}
export declare type Match = {
    ID: string;
    roundID: number;
    pairing: Pairing;
    result: [number, number];
    hasBye: boolean;
};
/**
 * Represents players paring
 */
export declare type Pairing = [PlayerID, PlayerID];
/**
 * Helper for graph operations [node,node,weight]
 */
export declare type GraphEdge = [number, number, number];
export declare type TournamentType = "SWISS" | "ROUNDROBIN";
export interface Tournament {
    makeRound: (players: Player[], results: Match[], roundID: number) => Match[];
    roundsNeeded: (numPlayers: number) => number;
}
export {};
