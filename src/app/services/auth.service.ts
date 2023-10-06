import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import * as moment from 'moment';
import {shareReplay, tap} from "rxjs";
import Jwt from "../entities/Jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private jwt_key = "JWT_KEY";
  private authenticated = false;

  constructor(private http: HttpClient) {
    console.log()
    this.authenticated = localStorage.getItem(this.jwt_key) !== null && localStorage.getItem(this.jwt_key) !== '';
  }

  login$(username: string, password: string) {
    const nonce = moment().unix()
    return this.http.post<Jwt>(apiConstants.apiBaseUrl + '/v1/login', {
      username,
      password,
      nonce
    }).pipe(shareReplay(1), tap(jwt => {
      localStorage.setItem(this.jwt_key, jwt.jwt);
      this.authenticated = true;
    }));
  }

  isAuthenticated() {
    return this.authenticated;
  }

  logout() {
    localStorage.setItem(this.jwt_key, '');
    this.authenticated = false;
  }
}
