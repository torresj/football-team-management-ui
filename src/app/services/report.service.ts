import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { apiConstants } from '../constants/api.constants';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  getPDFReport$() {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      responseType: 'blob',
    });
    return this.http.get<Blob>(
      apiConstants.apiBaseUrl + '/v1/reports/balance_pdf',
      {
        headers: headers,
        responseType: 'blob' as 'json',
      }
    );
  }
}
