import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Member from '../entities/Member';
import { apiConstants } from '../constants/api.constants';
import { Observable } from 'rxjs';
import { Role } from '../entities/Role';

@Injectable({
  providedIn: 'root',
})
export class MemberService {
  constructor(private http: HttpClient) {}

  getMe$(): Observable<Member> {
    return this.http.get<Member>(apiConstants.apiBaseUrl + '/v1/members/me');
  }

  getAll$() {
    return this.http.get<Member[]>(apiConstants.apiBaseUrl + '/v1/members');
  }

  updatePassword$(newPassword: string): Observable<Member> {
    return this.http.patch<Member>(
      apiConstants.apiBaseUrl + '/v1/members/me/password',
      { newPassword: newPassword }
    );
  }

  updateAlias$(alias: string): Observable<Member> {
    return this.http.patch<Member>(
      apiConstants.apiBaseUrl + '/v1/members/me/alias',
      { alias: alias }
    );
  }

  create$(
    name: string,
    alias: string,
    surname: string,
    phone: string,
    role: Role
  ) {
    return this.http.post(apiConstants.apiBaseUrl + '/v1/members', {
      name: name,
      surname: surname,
      alias: alias,
      phone: phone,
      role: role,
    });
  }

  update$(
    memberId: number,
    name: string,
    alias: string,
    surname: string,
    phone: string,
    role: Role,
    nCapitancies: number
  ) {
    return this.http.put(apiConstants.apiBaseUrl + `/v1/members/${memberId}`, {
      name: name,
      alias: alias,
      surname: surname,
      phone: phone,
      role: role,
      nCaptaincies: nCapitancies,
    });
  }

  updateInjuredMember$(memberId: number, injured: boolean) {
    return this.http.patch(
      apiConstants.apiBaseUrl + `/v1/members/${memberId}/injured`,
      {
        injured: injured,
      }
    );
  }

  updateBlockedMember$(memberId: number, blocked: boolean) {
    return this.http.patch(
      apiConstants.apiBaseUrl + `/v1/members/${memberId}/blocked`,
      {
        blocked: blocked,
      }
    );
  }

  delete$(memberId: number) {
    return this.http.delete(
      apiConstants.apiBaseUrl + `/v1/members/${memberId}`
    );
  }
}
