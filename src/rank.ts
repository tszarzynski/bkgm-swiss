import { ISBPlayer } from './types';
import { desc, sortWith } from './sort';

/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export const rankPlayers = (players: ISBPlayer[]) =>
  sortWith<ISBPlayer>(
    [desc('matchesWon'), desc('gamesWon'), desc('omv')],
    players
  );

/**
 * Check if players played each other
 * @param player
 */
const isOpponent = (player: ISBPlayer) => (possibleOpponent: ISBPlayer) =>
  possibleOpponent.opponents.includes(player.ID);

/**
 * Return the list of player's opponents
 * @param allPlayers list of all players
 * @param player
 */
const listPlayerOpponents = (allPlayers: ISBPlayer[], player: ISBPlayer) =>
  allPlayers.filter(isOpponent(player));

/**
 * Return win/lose ratio
 * @param opponent
 */
const calcWinLoseRatio = (player: ISBPlayer) =>
  player.matchesWon / (player.matchesWon + player.matchesLost);

/**
 * Calculate OMV for a given player
 * @param allPlayers list of all players
 * @param player player to calculate OMV for
 */
export const calcOMV = (allPlayers: ISBPlayer[], player: ISBPlayer) =>
  listPlayerOpponents(allPlayers, player).reduce(
    (avg, opponent, _, arr) => avg + calcWinLoseRatio(opponent) / arr.length,
    0
  );
