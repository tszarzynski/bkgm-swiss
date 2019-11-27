import { roundsNeeded, countOccurences } from './utils';

test('should calculate number of rounds', () => {
  expect(roundsNeeded(6, 1)).toBe(3);
});

test('should return false given external link', () => {
  const arr = [1, 2, 2];
  const res = new Map();
  res.set(1, 1);
  res.set(2, 2);

  expect(countOccurences(arr)).toMatchObject(res);
});
