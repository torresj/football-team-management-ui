import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {apiConstants} from "../constants/api.constants";
import Match from "../entities/Match";
import {PlayerMatchStatus} from "../entities/PlayerMatchStatus";
import * as moment from "moment/moment";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor(private http: HttpClient) {
  }

  getOldMatches$(){
    return this.http.get<Match[]>(apiConstants.apiBaseUrl + '/v1/matches')
  }

  getNextMatch$() {
    return this.http.get<Match>(apiConstants.apiBaseUrl + '/v1/matches/next');
  }

  addPlayerToMatch$(matchID: number, status: PlayerMatchStatus) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchID}/players`, {"status": status});
  }

  removePlayerFromTeamA$(matchId: number, playerId: number) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teama`)
  }

  addPlayerToTeamA$(matchId: number, playerId: number) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teama`, null);
  }

  addPlayerToTeamB$(matchId: number, playerId: number) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teamb`, null);
  }

  removePlayerFromTeamB$(matchId: number, playerId: number) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/players/${playerId}/teamb`)
  }

  removeGuestFromTeamA$(matchId: number, guest: string) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teama`,
      {body: {"guest": guest}});
  }

  addGuestToTeamA$(matchId: number, guest: string) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teama`,
      {"guest": guest});
  }

  addGuestToTeamB$(matchId: number, guest: string) {
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teamb`,
      {"guest": guest});
  }

  removeGuestFromTeamB$(matchId: number, guest: string) {
    return this.http.delete(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/guests/teamb`,
      {body: {"guest": guest}});
  }

  createMatch$(date: Date){
    const matchDay = (moment(date).format('YYYY-MM-DD'));
    return this.http.post(apiConstants.apiBaseUrl + '/v1/matches',{matchDay: matchDay});
  }

  addCaptainToTeamA(matchId: number){
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/captainA`,null);
  }

  addCaptainToTeamB(matchId: number){
    return this.http.post(apiConstants.apiBaseUrl + `/v1/matches/${matchId}/captainB`,null);
  }
}
