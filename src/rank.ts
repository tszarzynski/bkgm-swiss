import { Players, Player } from './types';

/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export function rankPlayers(players: Players) {
  return players.sort((p1, p2) => {
    if (p1.matchesWon > p2.matchesWon) return -1;
    if (p1.matchesWon < p2.matchesWon) return 1;

    if (p1.gamesWon > p2.gamesWon) return -1;
    if (p1.gamesWon < p2.gamesWon) return 1;

    if (p1.omv > p2.omv) return -1;
    if (p1.omv < p2.omv) return 1;

    return 0;
  });
}

/**
 * Calculate OMV for a given player
 * @param players list of players
 * @param pl player to calculate OMV for
 */
export function calcOMV(players: Players, pl: Player) {
  return (
    players
      .filter(p => pl.opponents.includes(p.ID))
      .reduce(
        (acc, p) => acc + p.matchesWon / (p.matchesWon + p.matchesLost),
        0
      ) / pl.opponents.length
  );
}