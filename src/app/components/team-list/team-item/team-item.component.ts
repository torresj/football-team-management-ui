import {Component, Input} from '@angular/core';
import Player from "../../../entities/Player";

@Component({
  selector: 'app-team-item',
  templateUrl: './team-item.component.html',
  styleUrls: ['./team-item.component.css']
})
export class TeamItemComponent {
  @Input() player!: Player;
}
