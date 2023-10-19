import {Component, OnInit} from '@angular/core';
import {MatchService} from "../../services/match.service";
import Match from "../../entities/Match";
import {BehaviorSubject} from "rxjs";
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {

  isLoading$ = new BehaviorSubject(true);
  matches: Match[] = [];
  index = 0;

  constructor(private matchService: MatchService,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.matchService.getOldMatches$().subscribe({
      next: matches => {
        this.matches = matches;
        this.isLoading$.next(false);
      },
      error: err => {
        this.authService.logout();
        this.router.navigateByUrl('/login')
      }
    })
  }

  nextMatch() {
    this.index = this.index < this.matches.length - 1 ? this.index + 1 : this.index;
  }

  previousMatch() {
    this.index = this.index > 0 ? this.index - 1 : this.index;
  }

}
