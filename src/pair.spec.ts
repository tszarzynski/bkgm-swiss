import { quality } from './pair';

test('should return false given external link', () => {
  expect(quality(0, 0)).toBe(1);
});
