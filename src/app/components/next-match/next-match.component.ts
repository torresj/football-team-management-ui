import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Match from "../../entities/Match";
import {MatchService} from "../../services/match.service";
import Player from "../../entities/Player";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import AddPlayerData from "../../entities/AddPlayerData";
import {AddPlayerToTeamComponent} from "../dialogs/add-player-to-team/add-player-to-team.component";
import {Team} from "../../entities/Team";

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.css']
})
export class NextMatchComponent implements OnInit {

  isLoading$ = new BehaviorSubject(true);
  nextMatch$ = new BehaviorSubject<Match | null>(null);

  constructor(private matchService: MatchService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.getNextMatch(true);
  }

  private getNextMatch(loading: boolean) {
    if (loading) this.isLoading$.next(true);
    this.matchService.getNextMatch$().subscribe({
      next: match => {
        this.nextMatch$.next(match);
        this.isLoading$.next(false);
      },
      error: err => {
        this.nextMatch$.next(null);
        this.isLoading$.next(false);
      }
    })
  }

  addPlayerToTeamA() {
    const dialogConfig = new MatDialogConfig<AddPlayerData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      matchId: this.nextMatch$.value!.id,
      availablePlayers: this.getAvailablePlayers(),
      team: Team.A
    };


    this.dialog.open(AddPlayerToTeamComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getNextMatch(false)
      });
  }

  addPlayerToTeamB() {
    const dialogConfig = new MatDialogConfig<AddPlayerData>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      matchId: this.nextMatch$.value!.id,
      availablePlayers: this.getAvailablePlayers(),
      team: Team.B
    };


    this.dialog.open(AddPlayerToTeamComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getNextMatch(false)
      });
  }

  removePlayerFromTeamA(player: Player) {
    this.matchService.removePlayerFromTeamA$(this.nextMatch$.value!.id, player.id)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removePlayerFromTeamB(player: Player) {
    this.matchService.removePlayerFromTeamB$(this.nextMatch$.value!.id, player.id)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removeGuestFromTeamA(guest: string) {
    this.matchService.removeGuestFromTeamA$(this.nextMatch$.value!.id, guest)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removeGuestFromTeamB(guest: string) {
    this.matchService.removeGuestFromTeamB$(this.nextMatch$.value!.id, guest)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  private getAvailablePlayers() {
    const match = this.nextMatch$.value!;
    let availablePlayers: Player[] = [];
    match.confirmedPlayers.forEach(
      player => availablePlayers.push(player)
    );
    return availablePlayers.filter(player => !this.playerIsInAnyTeam(player));
  }

  private playerIsInAnyTeam(player: Player) {
    const match = this.nextMatch$.value!;
    return match.teamAPlayers
      .map(player => player.id)
      .concat(match.teamBPlayers.map(player => player.id))
      .includes(player.id);
  }
}
