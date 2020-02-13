import { Match } from "./types";
/**
 * Count occurances of elements in Array
 * @param arr Array of numbers
 */
export declare function countOccurences(arr: number[]): Map<number, number>;
/**
 * Returns last element from array
 * @param arr
 */
export declare function last<T>(arr: T[]): T;
export declare function prop<T, P extends keyof T>(propName: P): (obj: T) => T[P];
/**
 * Check if number is odd
 * @param n Number
 */
export declare function isOdd(n: number): boolean;
/**
 * Check if number is even
 * @param n Number
 */
export declare function isEven(n: number): boolean;
export declare function calcNumRoundsFromResults(results: Match[]): number;
