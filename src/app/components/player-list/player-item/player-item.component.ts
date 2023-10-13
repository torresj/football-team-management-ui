import {Component, Input} from '@angular/core';
import Player from "../../../entities/Player";

@Component({
  selector: 'app-player-item',
  templateUrl: './player-item.component.html',
  styleUrls: ['./player-item.component.css']
})
export class PlayerItemComponent {
  @Input() player!: Player;
}
