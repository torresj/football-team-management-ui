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

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  isLoading$ = new BehaviorSubject(true);
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['name', 'surname', 'phone', 'nCaptaincies', 'role', 'balance', 'actions'];
  columnsToDisplayInSmallScreens = ['name', 'surname', 'actions'];
  columns = this.columnsToDisplay;
  isAdmin = new BehaviorSubject(false);

  constructor(private memberService: MemberService,
              private authService: AuthService,
              private router: Router,
              private responsive: BreakpointObserver) {
  }

  ngOnInit(): void {
    this.authService.member$.subscribe({
      next: member => {
        if(member?.role == Role.ADMIN){
          this.isAdmin.next(true);
        }
      }
    });
    this.responsive.observe(['(min-width: 700px)']).subscribe(
      {
        next: value => {
          if (value.matches) {
            this.columns = this.columnsToDisplay;
          } else {
            this.columns = this.columnsToDisplayInSmallScreens;
          }
        }
      }
    );
  }

  private getMembers(){
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

  protected readonly MovementType = MovementType;
  protected readonly Role = Role;
}
