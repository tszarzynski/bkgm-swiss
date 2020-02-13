import { PlayerWithResults, Pairing } from "../../types";
/**
 * Shift players
 */
export declare const shiftArray: <T>(arr: T[], offset: number) => T[];
/**
 * Folds array into pairs
 */
export declare const toPairs: (arr: number[]) => Pairing[];
export declare function pairPlayers(players: PlayerWithResults[]): Pairing[];
