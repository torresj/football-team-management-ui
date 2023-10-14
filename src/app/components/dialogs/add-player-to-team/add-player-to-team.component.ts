import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import AddPlayerData from "../../../entities/AddPlayerData";
import Player from "../../../entities/Player";
import {BehaviorSubject} from "rxjs";
import {MatchService} from "../../../services/match.service";
import {AuthService} from "../../../services/auth.service";
import {Router} from "@angular/router";
import {Team} from "../../../entities/Team";

@Component({
  selector: 'app-add-player-to-team',
  templateUrl: './add-player-to-team.component.html',
  styleUrls: ['./add-player-to-team.component.css']
})
export class AddPlayerToTeamComponent {

  playerSelected?: number;
  guest = '';
  availablePlayers: Player[];
  matchId: number;
  guestActive = new BehaviorSubject(false);
  team: Team;

  constructor(private authService: AuthService,
              private router: Router,
              private matchService: MatchService,
              private dialogRef: MatDialogRef<AddPlayerToTeamComponent>,
              @Inject(MAT_DIALOG_DATA) public data: AddPlayerData) {
    this.matchId = data.matchId;
    this.availablePlayers = data.availablePlayers;
    this.team = data.team;
  }

  toggleChange() {
    this.guestActive.next(!this.guestActive.value)
  }

  addPlayer() {
    if (this.guestActive.value) {
      this.team == Team.A ?
        this.matchService.addGuestToTeamA(this.matchId, this.guest)
          .subscribe({
            next: () => this.dialogRef.close(),
            error: err => {
              this.authService.logout();
              this.dialogRef.close()
              this.router.navigateByUrl('/login')
            }
          }) :
        this.matchService.addGuestToTeamB(this.matchId, this.guest)
          .subscribe({
            next: () => this.dialogRef.close(),
            error: err => {
              this.authService.logout();
              this.dialogRef.close()
              this.router.navigateByUrl('/login')
            }
          });
    } else {
      this.team == Team.A ?
        this.matchService.addPlayerToTeamA(this.matchId, this.playerSelected!)
          .subscribe({
            next: () => this.dialogRef.close(),
            error: err => {
              this.authService.logout();
              this.dialogRef.close()
              this.router.navigateByUrl('/login')
            }
          }) :
        this.matchService.addPlayerToTeamB(this.matchId, this.playerSelected!)
          .subscribe({
            next: () => this.dialogRef.close(),
            error: err => {
              this.authService.logout();
              this.dialogRef.close()
              this.router.navigateByUrl('/login')
            }
          });
    }
  }
}
