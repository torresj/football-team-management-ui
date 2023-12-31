import Player from "./Player";

export default interface Match {
  id: number;
  matchDay: Date;
  confirmedPlayers: Player[];
  unConfirmedPlayers: Player[];
  notAvailablePlayers: Player[];
  teamAPlayers: Player[];
  teamBPlayers: Player[];
  teamAGuests: string[];
  teamBGuests: string[];
  captainTeamA: Player;
  captainTeamB: Player;
  closed: boolean;
}
