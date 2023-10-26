import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Member from "../../entities/Member";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatTableDataSource} from "@angular/material/table";
import {MovementType} from "../../entities/MovementType";
import {Role} from "../../entities/Role";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {CreateMemberComponent} from "../dialogs/create-member/create-member.component";
import {DeleteMemberComponent} from "../dialogs/delete-member/delete-member.component";
import {EditMemberComponent} from "../dialogs/edit-member/edit-member.component";
import {InjuredMemberComponent} from "../dialogs/injured-member/injured-member.component";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  isLoading$ = new BehaviorSubject(true);
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['name', 'surname', 'phone', 'nCaptaincies', 'role', 'balance'];
  columnsToDisplayInSmallScreens = ['name', 'surname', 'balance'];
  columnsToDisplayAdmin = ['name', 'surname', 'phone', 'nCaptaincies', 'role', 'balance', 'actions'];
  columnsToDisplayInSmallScreensAdmin = ['name', 'surname', 'actions'];
  columns = this.columnsToDisplay;
  isAdmin = new BehaviorSubject(false);

  constructor(private memberService: MemberService,
              private authService: AuthService,
              private router: Router,
              private responsive: BreakpointObserver,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
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
                this.columns = this.isAdmin.value ? this.columnsToDisplayInSmallScreensAdmin : this.columnsToDisplayInSmallScreens;
              }
            }
          }
        );
      }
    });


    this.getMembers();
  }

  private getMembers() {
    this.memberService.getAll$().subscribe({
      next: members => {
        this.dataSource.data = members;
        this.isLoading$.next(false);
      },
      error: err => {
        this.authService.logout();
        this.router.navigateByUrl('/login')
      }
    });
  }

  createMember() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    this.dialog.open(CreateMemberComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMembers()
      });
  }

  deleteMember(member: Member) {
    const dialogConfig = new MatDialogConfig<Member>();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = member;

    this.dialog.open(DeleteMemberComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMembers()
      });
  }

  editMember(member: Member) {
    const dialogConfig = new MatDialogConfig<Member>();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = member;

    this.dialog.open(EditMemberComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMembers()
      });
  }

  injuredMember(member: Member) {
    const dialogConfig = new MatDialogConfig<Member>();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = member;

    this.dialog.open(InjuredMemberComponent, dialogConfig).afterClosed()
      .subscribe({
        next: () => this.getMembers()
      });
  }

  protected readonly MovementType = MovementType;
  protected readonly Role = Role;
}
