import Player from "./Player";

export default interface Match {
  id: number;
  matchDay: Date
  name: string;
  confirmedPlayers: [Player];
  unConfirmedPlayers: [Player];
  notAvailablePlayers: [Player];
  teamAPlayers: [Player];
  teamBPlayers: [Player];
  teamAGuests: [string];
  teamBGuests: [string];
  closed: boolean;
}
