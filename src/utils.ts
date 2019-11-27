/**
 * Calculates the minimum number of rounds to be played
 * @param n Number of players
 * @param k Number of standings to determine
 */
export function roundsNeeded(n: number, k: number) {
  return Math.ceil(Math.log2(n) + Math.log2(k));
}

/**
 * Count occurances of elements in Array
 * @param arr Array of numbers
 */
export function countOccurences(arr: number[]) {
  return arr.reduce(
    (acc, val) => acc.set(val, 1 + (acc.get(val) || 0)),
    new Map<number, number>()
  );
}
