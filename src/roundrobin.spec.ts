import { shiftArray, toPairs } from "./roundrobin";

test("shiftArray should return correct correctly reordered array", () => {
  expect(shiftArray([1, 2, 3, 4], 1)).toStrictEqual([1, 4, 2, 3]);
  expect(shiftArray([1, 2, 3, 4], 2)).toStrictEqual([1, 3, 4, 2]);
  expect(shiftArray([1, 2, 3, 4], 3)).toStrictEqual([1, 2, 3, 4]);
});


test("toPairs should return correct pairings", () => {
    expect(toPairs([1, 2, 3, 4])).toStrictEqual([[1,4],[2,3]]);
    expect(toPairs([1, 2, 3])).toStrictEqual([[1, 3], [2, -1]]);
  });
