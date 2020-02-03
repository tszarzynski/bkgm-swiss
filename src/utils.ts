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

/**
 * Returns last element from array
 * @param arr
 */
export function last(arr: any[]) {
  return arr[arr.length - 1];
}

export function prop<T, P extends keyof T>(
  propName: P
): (obj: T) => T[P] {
  return function(obj: T) {
    return obj[propName];
  };
}

/**
 * Check if number is odd
 * @param n Number
 */
export function isOdd(n:number) {
  return n % 2 !== 0
}

/**
 * Check if number is even
 * @param n Number
 */
export function isEven(n:number) {
  return !isOdd(n)
}


