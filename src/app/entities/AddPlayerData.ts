import Player from "./Player";
import {Team} from "./Team";

export default interface AddPlayerData{
  matchId: number;
  availablePlayers: Player[];
  team : Team;
}
