import {Component, Input} from '@angular/core';
import Player from "../../entities/Player";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent {

  @Input() players!: Player[];
  @Input() title!: string;

}
