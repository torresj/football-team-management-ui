import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import Match from "../entities/Match";
import {PlayerMatchStatus} from "../entities/PlayerMatchStatus";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) {
  }

  getNextMatch$() {
    return this.http.get<Match>(apiConstants.apiBaseUrl + '/v1/matches/next');
  }

  addPlayerToMatch(matchID: number, status: PlayerMatchStatus) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchID}/players`, {"status": status});
  }

  removePlayerFromTeamA(matchId: number, playerId: number) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teama`)
  }

  removePlayerFromTeamB(matchId: number, playerId: number) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teamb`)
  }

  removeGuestFromTeamA(matchId: number, guest: string) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teama`,
      {body: {"guest": guest}})
  }

  removeGuestFromTeamB(matchId: number, guest: string) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teamb`,
      {body: {"guest": guest}})
  }
}
