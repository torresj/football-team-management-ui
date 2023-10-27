import {Component, EventEmitter, Input, Output} from '@angular/core';
import Player from "../../entities/Player";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent {
  @Input() players!: Player[];
  @Input() guests!: string[];
  @Input() title!: string;
  @Input() captain?: Player;

  @Output() removePlayerEvent = new EventEmitter<Player>();
  @Output() removeGuestEvent = new EventEmitter<string>();
  @Output() addPlayerEvent = new EventEmitter();
  @Output() addCaptainEvent = new EventEmitter();

  isAdmin = false;

  constructor(private authService: AuthService) {
    this.isAdmin = authService.isAdmin();
  }

  removePlayer(player: Player) {
    this.removePlayerEvent.emit(player);
  }

  removeGuest(guest: string) {
    this.removeGuestEvent.emit(guest);
  }

  addPlayer(){
    this.addPlayerEvent.emit();
  }

  addCaptain(){
    this.addCaptainEvent.emit();
  }
}
