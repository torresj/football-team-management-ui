import {Component, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import Member from "../../entities/Member";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {MemberService} from "../../services/member.service";
import {MatTableDataSource} from "@angular/material/table";
import {MovementType} from "../../entities/MovementType";
import {Role} from "../../entities/Role";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {
  isLoading$ = new BehaviorSubject(true);
  dataSource = new MatTableDataSource<Member>();
  columnsToDisplay = ['name', 'surname', 'phone', 'nCaptaincies', 'role', 'balance'];
  columnsToDisplayInSmallScreens = ['createdOn', 'description', 'amount'];
  columns = this.columnsToDisplay;

  constructor(private memberService: MemberService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.memberService.getAll$().subscribe({
      next: members => {
        this.dataSource.data = members;
        this.isLoading$.next(false);
      },
      error: err => {
        this.authService.logout();
        this.router.navigateByUrl('/login')
      }
    })
  }

  protected readonly MovementType = MovementType;
  protected readonly Role = Role;
}
