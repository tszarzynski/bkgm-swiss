import { roundsNeeded } from "./rounds";

test("roundsNeeded should calculate number of rounds", () => {
  expect(roundsNeeded(6, 1)).toBe(3);
});
