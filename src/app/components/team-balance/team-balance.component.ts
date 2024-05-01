import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { BehaviorSubject } from 'rxjs';
import Movement from 'src/app/entities/Movement';
import { MovementType } from 'src/app/entities/MovementType';
import { Role } from 'src/app/entities/Role';
import { AuthService } from 'src/app/services/auth.service';
import { MemberService } from 'src/app/services/member.service';
import { TeamMovementService } from 'src/app/services/team-movement.service';
import { TeamCreateMovementComponent } from '../dialogs/team-create-movement/team-create-movement.component';
import { TeamDeleteMovementComponent } from '../dialogs/team-delete-movement/team-delete-movement.component';

@Component({
  selector: 'app-team-balance',
  templateUrl: './team-balance.component.html',
  styleUrls: ['./team-balance.component.css'],
})
export class TeamBalanceComponent implements OnInit {
  protected readonly MovementType = MovementType;

  dataSource = new MatTableDataSource<Movement>();
  columnsToDisplay = ['createdOn', 'type', 'description', 'amount'];
  columnsToDisplayInSmallScreens = ['description', 'amount'];
  columnsToDisplayAdmin = [
    'createdOn',
    'type',
    'description',
    'amount',
    'actions',
  ];
  columns = this.columnsToDisplay;
  isLoading$ = new BehaviorSubject(true);
  isAdmin = new BehaviorSubject(false);

  constructor(
    private memberService: MemberService,
    private teamMovementService: TeamMovementService,
    private authService: AuthService,
    private responsive: BreakpointObserver,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.authService.member$.subscribe({
      next: (member) => {
        if (member?.role == Role.ADMIN) {
          this.isAdmin.next(true);
        }

        this.authService.member$.subscribe({
          next: (member) => {
            if (member?.role == Role.ADMIN) {
              this.isAdmin.next(true);
            }

            this.responsive.observe(['(min-width: 700px)']).subscribe({
              next: (value) => {
                if (value.matches) {
                  this.columns = this.isAdmin.value
                    ? this.columnsToDisplayAdmin
                    : this.columnsToDisplay;
                } else {
                  this.columns = this.columnsToDisplayInSmallScreens;
                }
              },
            });
          },
        });
      },
    });

    this.getMovements(true);
  }

  addMovement() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog
      .open(TeamCreateMovementComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: () => this.getMovements(false),
      });
  }

  deleteMovement(movement: Movement) {
    const dialogConfig = new MatDialogConfig<Movement>();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = movement;

    this.dialog
      .open(TeamDeleteMovementComponent, dialogConfig)
      .afterClosed()
      .subscribe({
        next: () => this.getMovements(false),
      });
  }

  private getMovements(loading: boolean) {
    if (loading) this.isLoading$.next(true);
    this.teamMovementService.getAllTeamMovements$().subscribe({
      next: (movements) => {
        this.dataSource.data = movements;
        this.isLoading$.next(false);
      },
    });
  }
}
