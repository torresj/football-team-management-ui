import {Component, HostListener, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {BehaviorSubject} from "rxjs";
import Member from "../../entities/Member";
import Movement from "../../entities/Movement";
import {MatTableDataSource} from "@angular/material/table";
import {MovementService} from "../../services/movement.service";
import {Router} from "@angular/router";
import {MovementType} from "../../entities/MovementType";
import {BreakpointObserver} from "@angular/cdk/layout";

@Component({
  selector: 'app-my-balance',
  templateUrl: './my-balance.component.html',
  styleUrls: ['./my-balance.component.css']
})
export class MyBalanceComponent implements OnInit {

  dataSource = new MatTableDataSource<Movement>();
  columnsToDisplay = ['createdOn', 'type', 'description', 'amount'];
  columnsToDisplayInSmallScreens = ['createdOn', 'description', 'amount'];
  member$: BehaviorSubject<Member | null>;
  columns = this.columnsToDisplay;
  isLoading$ = new BehaviorSubject(true);


  constructor(private authService: AuthService,
              private movementService: MovementService,
              private router: Router,
              private responsive: BreakpointObserver) {
    this.member$ = this.authService.member$;
  }

  ngOnInit(): void {
    this.member$.subscribe({
      next: member => {
        if (member != null) {
          this.movementService.getBalanceByMemberId$(member.id).subscribe({
            next: movements => {
              this.dataSource.data = movements
              this.isLoading$.next(false);
            },
            error: err => {
              this.authService.logout();
              this.router.navigateByUrl('/login');
            }
          });
        }
      }
    });

    this.responsive.observe(['(min-width: 600px)']).subscribe(
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

  protected readonly MovementType = MovementType;
}
