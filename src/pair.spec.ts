import {
  quality,
  calcHighestScore,
  checkBye,
  calcWeight,
  calcWeights,
  pairPlayers
} from "./pair";
import { ISBPlayer } from "./types";

test("quality should return correct value", () => {
  expect(quality(0, 0)).toBe(1);
  expect(quality(1, 1)).toBe(16);
});

test("calcHighestScore should return correct value", () => {
  const players: ISBPlayer[] = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 2,
      matchesWon: 1,
      matchesLost: 0,
      omv: 0,
      opponents: []
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 1,
      matchesWon: 0,
      matchesLost: 1,
      omv: 0,
      opponents: []
    }
  ];

  expect(calcHighestScore(players)).toBe(2);
});

test("checkBye should return -1 for even number of players", () => {
  const players: ISBPlayer[] = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: []
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: []
    }
  ];
  expect(checkBye(players)).toBe(-1);
});

test("checkBye should return last player with smallest BYE  number", () => {
  const players: ISBPlayer[] = [
    {
      ID: 1,
      name: "Player 1",
      gamesWon: 1,
      matchesWon: 1,
      matchesLost: 0,
      omv: 0,
      opponents: [2]
    },
    {
      ID: 2,
      name: "Player 2",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 1,
      omv: 0,
      opponents: [1]
    },
    {
      ID: 2,
      name: "Player 3",
      gamesWon: 0,
      matchesWon: 0,
      matchesLost: 0,
      omv: 0,
      opponents: [-1]
    }
  ];
  expect(checkBye(players)).toBe(2);
});

test("calcWeight should return correct weight", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 1,
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [2]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 1,
    omv: 0,
    opponents: [1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(calcWeight(1, player1, player2)).toBeLessThan(
    calcWeight(1, player1, player3)
  );
});

test("calcWeights should return correct weights", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 1,
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [2]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 1,
    omv: 0,
    opponents: [1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(calcWeights([player1, player2, player3])).toStrictEqual([
    [0, 1, 4],
    [0, 2, 21],
    [1, 2, 21]
  ]);
});

test("pairPlayers should return correct pairings", () => {
  const player1 = {
    ID: 1,
    name: "Player 1",
    gamesWon: 1,
    matchesWon: 1,
    matchesLost: 0,
    omv: 0,
    opponents: [2]
  };
  const player2 = {
    ID: 2,
    name: "Player 2",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 1,
    omv: 0,
    opponents: [1]
  };
  const player3 = {
    ID: 3,
    name: "Player 3",
    gamesWon: 0,
    matchesWon: 0,
    matchesLost: 0,
    omv: 0,
    opponents: [-1]
  };

  expect(pairPlayers([player1, player2, player3])).toStrictEqual([
    [1, 3],
    [2, -1]
  ]);
});
