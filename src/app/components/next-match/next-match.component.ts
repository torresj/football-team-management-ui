import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Match from "../../entities/Match";
import {MatchService} from "../../services/match.service";
import {AuthService} from "../../services/auth.service";
import Player from "../../entities/Player";

@Component({
  selector: 'app-next-match',
  templateUrl: './next-match.component.html',
  styleUrls: ['./next-match.component.css']
})
export class NextMatchComponent implements OnInit {

  isLoading$ = new BehaviorSubject(true);
  nextMatch$ = new BehaviorSubject<Match | null>(null);

  constructor(private matchService: MatchService) {
  }

  ngOnInit(): void {
    this.getNextMatch(true);
  }

  private getNextMatch( loading: boolean) {
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

  removePlayerFromTeamA(player: Player) {
    this.matchService.removePlayerFromTeamA(this.nextMatch$.value!.id, player.id)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removePlayerFromTeamB(player: Player) {
    this.matchService.removePlayerFromTeamB(this.nextMatch$.value!.id, player.id)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removeGuestFromTeamA(guest: string) {
    this.matchService.removeGuestFromTeamA(this.nextMatch$.value!.id, guest)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }

  removeGuestFromTeamB(guest: string) {
    this.matchService.removeGuestFromTeamB(this.nextMatch$.value!.id, guest)
      .subscribe({
          next: () => this.getNextMatch(false)
        }
      );
  }
}
