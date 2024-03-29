import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MatchService } from '../../services/match.service';
import { BehaviorSubject } from 'rxjs';
import Match from '../../entities/Match';
import Member from '../../entities/Member';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmAssistanceComponent } from '../dialogs/confirm-assistance/confirm-assistance.component';
import { ConfirmNoAssistanceComponent } from '../dialogs/confirm-no-assistance/confirm-no-assistance.component';
import { Role } from '../../entities/Role';
import { CreateMatchComponent } from '../dialogs/create-match/create-match.component';
import { BalanceAlertComponent } from '../dialogs/balance-alert/balance-alert.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  nextMatch$ = new BehaviorSubject<Match | null | undefined>(undefined);
  member$: BehaviorSubject<Member | null>;
  isMemberConfirmed$ = new BehaviorSubject(false);
  isMemberAssistNextMatch$ = new BehaviorSubject(false);
  isMemberInTeamA$ = new BehaviorSubject(false);
  isMemberInTeamB$ = new BehaviorSubject(false);
  isLoading$ = new BehaviorSubject(true);
  alert = true;

  constructor(
    private authService: AuthService,
    private matchService: MatchService,
    private dialog: MatDialog
  ) {
    this.member$ = this.authService.member$;
  }

  ngAfterViewInit(): void {
    this.member$.subscribe((member) => {
      if (member && this.alert && member.balance < -5) {
        this.openBalanceAlertDialog(member);
      }
    });
  }

  ngOnInit(): void {
    this.authService.member$.subscribe({
      next: (member) => {
        if (member) {
          this.getNextMatch();
        }
      },
    });
  }

  openDialog(attend: boolean) {
    const dialogConfig = new MatDialogConfig<number>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = this.nextMatch$.value?.id;

    if (attend) {
      this.dialog
        .open(ConfirmAssistanceComponent, dialogConfig)
        .afterClosed()
        .subscribe({
          next: () => this.getNextMatch(),
        });
    } else {
      this.dialog
        .open(ConfirmNoAssistanceComponent, dialogConfig)
        .afterClosed()
        .subscribe({
          next: () => this.getNextMatch(),
        });
    }
  }

  openBalanceAlertDialog(member: Member) {
    const dialogConfig = new MatDialogConfig<Member>();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = member;
    this.dialog.open(BalanceAlertComponent, dialogConfig);
  }

  createMatch() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog
      .open(CreateMatchComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: () => this.getNextMatch(),
      });
  }

  private isMemberConfirmed() {
    const id = this.member$.value!.id;
    return (
      !this.nextMatch$.value?.unConfirmedPlayers
        .map((player) => player.id)
        .includes(id) ?? false
    );
  }

  private isMemberAssistNextMatch() {
    const id = this.member$.value!.id;
    return (
      this.nextMatch$.value?.confirmedPlayers
        .map((player) => player.id)
        .includes(id) ?? false
    );
  }

  private setMemberInTeam() {
    const id = this.member$.value!.id;
    this.isMemberInTeamA$.next(
      this.nextMatch$.value?.teamAPlayers
        .map((player) => player.id)
        .includes(id) ?? false
    );
    this.isMemberInTeamB$.next(
      this.nextMatch$.value?.teamBPlayers
        .map((player) => player.id)
        .includes(id) ?? false
    );
  }

  private getNextMatch() {
    this.isLoading$.next(true);
    this.matchService.getNextMatch$().subscribe({
      next: (match) => {
        this.nextMatch$.next(match);
        this.isMemberConfirmed$.next(this.isMemberConfirmed());
        this.isMemberAssistNextMatch$.next(this.isMemberAssistNextMatch());
        this.setMemberInTeam();
        this.isLoading$.next(false);
      },
      error: () => {
        this.nextMatch$.next(null);
        this.isLoading$.next(false);
      },
    });
  }

  protected readonly Date = Date;
  protected readonly Role = Role;
}
