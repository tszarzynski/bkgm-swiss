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


export function asc<T, K extends keyof T>(prop: K) {
  return function(a: T, b: T) {
    if (a[prop] > b[prop]) return 1;
    if (a[prop] < b[prop]) return -1;

    return 0;
  };
}

export function desc<T, K extends keyof T>(prop: K) {
  return function(a: T, b: T) {
    if (a[prop] > b[prop]) return -1;
    if (a[prop] < b[prop]) return 1;

    return 0;
  };
}

export function sortWith<T>(compare: Array<((a: T, b: T) => number)>, arr: T[]) : T[] {
  return Array.prototype.slice.call(arr, 0).sort((a:T, b:T) => {
    let result = 0;
    let i = 0;
    while (result === 0 && i < compare.length) {
      result = compare[i](a, b);
      i += 1;
    }
    return result;
  });
}
