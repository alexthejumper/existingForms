import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AppConfigService} from './app-config.service';
import {Observable} from 'rxjs';
import {Visitor} from '@angular/compiler';
import {VisitorLogResponse} from './model-back';

@Injectable({
  providedIn: 'root'
})
export class ExistingVisitorService {

  private readonly visitorBaseUrl: string;
  constructor(private httpClient: HttpClient, private readonly appConfigService: AppConfigService) {
    this.visitorBaseUrl = `${this.appConfigService.baseUrl}/visitors/existing-visitor`;
  }

  getVisitorsByDetails(firstName: string, lastName: string, companyName: string): Observable<VisitorLogResponse[]> {
    const params = new HttpParams()
      .set('firstName', firstName)
      .set('lastName', lastName)
      .set('companyName', companyName);

    return this.httpClient.get<VisitorLogResponse[]>(this.visitorBaseUrl, { params });
  }
}
