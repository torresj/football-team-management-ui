import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Movement from "../../entities/Movement";
import {BehaviorSubject} from "rxjs";
import Member from "../../entities/Member";
import {MemberService} from "../../services/member.service";
import {MovementService} from "../../services/movement.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MovementType} from "../../entities/MovementType";
import {PageEvent} from "@angular/material/paginator";
import {AuthService} from "../../services/auth.service";
import {Role} from "../../entities/Role";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateMovementComponent} from "../dialogs/create-movement/create-movement.component";
import {DeleteMovementComponent} from "../dialogs/delete-movement/delete-movement.component";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  dataSource = new MatTableDataSource<Movement>();
  columnsToDisplay = ['memberName', 'createdOn', 'type', 'description', 'amount'];
  columnsToDisplayInSmallScreens = ['memberName', 'description', 'amount'];
  columnsToDisplayAdmin = ['memberName', 'createdOn', 'type', 'description', 'amount', 'actions'];
  columns = this.columnsToDisplay;
  isLoading$ = new BehaviorSubject(true);
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  memberSelected: number | undefined;
  members$ = new BehaviorSubject<Member[]>([]);
  filter = "";
  isAdmin = new BehaviorSubject(false);

  constructor(
    private memberService: MemberService,
    private movementService: MovementService,
    private authService: AuthService,
    private responsive: BreakpointObserver,
    private dialog: MatDialog
  ) {
  }

  ngOnInit(): void {
    this.authService.member$.subscribe({
      next: member => {
        if (member?.role == Role.ADMIN) {
          this.isAdmin.next(true);
        }

        this.authService.member$.subscribe({
          next: member => {
            if (member?.role == Role.ADMIN) {
              this.isAdmin.next(true);
            }

            this.responsive.observe(['(min-width: 700px)']).subscribe(
              {
                next: value => {
                  if (value.matches) {
                    this.columns = this.isAdmin.value ? this.columnsToDisplayAdmin : this.columnsToDisplay;
                  } else {
                    this.columns = this.columnsToDisplayInSmallScreens;
                  }
                }
              }
            );
          }
        });
      }
    });

    this.getMovements(true);
    this.getMembers();
  }

  pageChangeEvent(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.getMovements(true);
  }

  selectChangeEvent() {
    this.getMovements(false);
  }

  filterChangeEvent() {
    this.getMovements(false);
  }

  addMovement() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateMovementComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMovements(false)
      });
  }

  deleteMovement(movement: Movement) {
    const dialogConfig = new MatDialogConfig<Movement>();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = movement;

    this.dialog.open(DeleteMovementComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMovements(false)
      });
  }

  private getMovements(loading: boolean) {
    if (loading) this.isLoading$.next(true);
    this.movementService.getAllBalancesByFilters$(
      this.pageIndex,
      this.pageSize,
      this.memberSelected,
      this.filter).subscribe({
      next: page => {
        this.dataSource.data = page.content;
        this.totalRecords = page.totalElements;
        this.isLoading$.next(false);
      }
    })
  }

  private getMembers() {
    this.memberService.getAll$().subscribe({next: members => this.members$.next(members)})
  }

  protected readonly MovementType = MovementType;
}
