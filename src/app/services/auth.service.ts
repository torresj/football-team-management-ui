import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import * as moment from 'moment';
import {BehaviorSubject, concatWith, shareReplay, tap} from "rxjs";
import Jwt from "../entities/Jwt";
import {MemberService} from "./member.service";
import Member from "../entities/Member";
import {Router} from "@angular/router";
import {Role} from "../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt_key = "JWT_KEY";
  member$ = new BehaviorSubject<Member | null>(null);

  constructor(private http: HttpClient, private memberService: MemberService, private router: Router) {
    if (localStorage.getItem(this.jwt_key) !== null && localStorage.getItem(this.jwt_key) !== '') {
      this.memberService.getMe$().subscribe({
        next: value => this.member$.next(value), error: err => {
          this.logout();
          this.router.navigateByUrl('/login');
        }
      })
    }
  }

  login$(username: string, password: string) {
    const nonce = moment().unix()
    return this.http.post<Jwt>(apiConstants.apiBaseUrl + '/v1/login', {
      username,
      password,
      nonce
    }).pipe(
      shareReplay(1),
      tap(jwt => {
        localStorage.setItem(this.jwt_key, jwt.jwt);
        console.log(jwt.jwt)
      }),
      concatWith(this.memberService.getMe$().pipe(tap(member => this.member$.next(member))))
    );
  }

  isAuthenticated() {
    return localStorage.getItem(this.jwt_key) !== null && localStorage.getItem(this.jwt_key) !== '';
  }

  logout() {
    localStorage.clear()
    this.member$.next(null);
  }

  isAdmin() {
    return this.member$.value?.role == Role.ADMIN;
  }
}
