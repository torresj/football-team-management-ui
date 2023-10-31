import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import Movement from "../entities/Movement";
import {PageableResponse} from "../entities/PageableResponse";
import {debounceTime, distinctUntilChanged} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class MovementService {

  constructor(private http: HttpClient) {
  }

  getBalanceByMemberId$(memberId: number) {
    return this.http.get<Movement[]>(apiConstants.apiBaseUrl + `/v1/members/${memberId}/movements`);
  }

  getAllBalancesByFilters(nPage: number, nElements: number, memberId?: number, filter?: string) {
    let params = new HttpParams()
      .set("page", nPage.toString())
      .set("elements", nElements.toString());


    if (memberId) {
      params = params.append("memberId", memberId);
    }

    if (filter) {
      params = params.append("filter", filter);
    }

    return this.http.get<PageableResponse<Movement>>(apiConstants.apiBaseUrl + "/v1/movements", {
      params: params
    })
  }
}
