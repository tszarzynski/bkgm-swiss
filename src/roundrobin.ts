import { ISBPairing } from "./types";

export const shiftArray = <T>(arr: T[], n: number) => {
  const firstElement = arr.slice(0, 1);
  const remainingElements = arr.slice(1);
  const shiftedElements = remainingElements
    .slice(-n)
    .concat(remainingElements.slice(0, -n));

  return [...firstElement, ...shiftedElements];
};
export const toPairs = (arr: number[]) => {
  const half = Math.ceil(arr.length / 2);
  const firstHalf = arr.slice(0, half);
  const secondHalf = arr.slice(half).reverse();

  return firstHalf.map((e, idx) => [e, secondHalf[idx] || -1]);
};
