import { Match, Player, PlayerWithResults, PlayerWithStats } from "./types";
export declare const makePlayersWithResults: (players: Player[], rounds: Match[]) => PlayerWithResults[];
export declare const makePlayersWithStats: (players: PlayerWithResults[]) => PlayerWithStats[];
