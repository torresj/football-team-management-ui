import {Component, Input} from '@angular/core';
import Match from "../../../entities/Match";

@Component({
  selector: 'app-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
export class MatchComponent {
  @Input() match!: Match;

  unConfirmedPlayers(){
    return this.match.unConfirmedPlayers.map(player => player.name);
  }

  confirmedPlayers(){
    return this.match.confirmedPlayers.map(player => player.name);
  }

  notAvailablePlayers(){
    return this.match.notAvailablePlayers.map(player => player.name);
  }

  teamA(){
    return this.match.teamAPlayers.map(player => player.name).concat(this.match.teamAGuests);
  }

  teamB(){
    return this.match.teamBPlayers.map(player => player.name).concat(this.match.teamBGuests);
  }
}
