import { ISBPlayer } from "./types";
import * as R from "ramda";

/**
 * Returns sorted list of players. Function tries to resolve tiebreaks by using 3 sorting critetias:
 * number of matches won, number of games won and OMV.
 * @param players list of players
 */
export const rankPlayers = (players: ISBPlayer[]) =>
  R.sortWith<ISBPlayer>([
    R.descend(R.prop("matchesWon")),
    R.descend(R.prop("gamesWon")),
    R.descend(R.prop("omv"))
  ])(players);

/**
 * Check if players played each other
 * @param player
 */
const isOpponent = (player: ISBPlayer) => (possibleOpponent: ISBPlayer) =>
  R.includes(R.prop("ID", player), R.prop("opponents", possibleOpponent));

/**
 * Return the list of player's opponents
 * @param allPlayers list of all players
 * @param player
 */
const listPlayerOpponents = (allPlayers: ISBPlayer[], player: ISBPlayer) =>
  R.filter(isOpponent(player), allPlayers);

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
  R.compose(
    R.mean,
    R.map(calcWinLoseRatio),
    listPlayerOpponents
  )(allPlayers, player);
