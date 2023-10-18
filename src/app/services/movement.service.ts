import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import Movement from "../entities/Movement";

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) { }

  getBalanceByMemberId$(memberId: number) {
    return this.http.get<Movement[]>(apiConstants.apiBaseUrl + `/v1/members/${memberId}/movements`);
  }
}
