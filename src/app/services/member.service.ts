import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import Member from "../entities/Member";
import {apiConstants} from "../constants/api.constants";
import {Observable} from "rxjs";
import {Role} from "../entities/Role";

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(private http: HttpClient) {
  }

  getMe$(): Observable<Member> {
    return this.http.get<Member>(apiConstants.apiBaseUrl + '/v1/members/me')
  }

  getAll$(){
    return this.http.get<Member[]>(apiConstants.apiBaseUrl + '/v1/members');
  }

  updatePassword$(memberId: number, newPassword: string): Observable<Member> {
    return this.http.patch<Member>(apiConstants.apiBaseUrl + `/v1/members/${memberId}`,
      {'newPassword': newPassword});
  }

  create$(name: string, surname: string, phone: string, role: Role){
    return this.http.post(apiConstants.apiBaseUrl + '/v1/members',{
      name: name,
      surname: surname,
      phone: phone,
      role: role
    });
  }

  delete$(memberId: number){
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/members/${memberId}`);
  }
}
