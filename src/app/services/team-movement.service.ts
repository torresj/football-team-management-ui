import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConstants } from '../constants/api.constants';
import Movement from '../entities/Movement';
import { MovementType } from '../entities/MovementType';
import { PageableResponse } from '../entities/PageableResponse';
import TotalBalance from '../entities/TotalBalance';

@Injectable({
  providedIn: 'root',
})
export class TeamMovementService {
  constructor(private http: HttpClient) {}

  getAllTeamMovements$() {
    return this.http.get<Movement[]>(
      apiConstants.apiBaseUrl + '/v1/team/movements'
    );
  }

  create$(type: MovementType, amount: number, description: string) {
    return this.http.post(apiConstants.apiBaseUrl + '/v1/team/movements', {
      type: type,
      amount: amount,
      description: description,
    });
  }

  delete$(movementId: number) {
    return this.http.delete(
      apiConstants.apiBaseUrl + `/v1/team/movements/${movementId}`
    );
  }

  getTotalBalance$() {
    return this.http.get<TotalBalance>(
      apiConstants.apiBaseUrl + '/v1/team/movements/balance'
    );
  }
}
