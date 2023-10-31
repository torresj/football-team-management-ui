import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import Movement from "../../entities/Movement";
import {BehaviorSubject, debounce, debounceTime, distinctUntilChanged, filter, fromEvent, Subscription} from "rxjs";
import Member from "../../entities/Member";
import {MemberService} from "../../services/member.service";
import {MovementService} from "../../services/movement.service";
import {BreakpointObserver} from "@angular/cdk/layout";
import {MovementType} from "../../entities/MovementType";
import {PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.css']
})
export class BalanceComponent implements OnInit {

  dataSource = new MatTableDataSource<Movement>();
  columnsToDisplay = ['memberName', 'createdOn', 'type', 'description', 'amount'];
  columnsToDisplayInSmallScreens = ['memberName', 'description', 'amount'];
  columns = this.columnsToDisplay;
  isLoading$ = new BehaviorSubject(true);
  totalRecords = 0;
  pageSize = 10;
  pageIndex = 0;
  memberSelected: number | undefined;
  members$ = new BehaviorSubject<Member[]>([]);
  filter = "";

  constructor(
    private memberService: MemberService,
    private movementService: MovementService,
    private responsive: BreakpointObserver
  ) {
  }

  ngOnInit(): void {
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

  private getMovements(loading: boolean) {
    if (loading) this.isLoading$.next(true);
    this.movementService.getAllBalancesByFilters(
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
