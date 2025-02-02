import { Injectable } from '@angular/core';
import {AppConfigService} from './app-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetReasonListResponse, GetReasonResponse} from './model-back';

export interface ReasonTest {
  reasonId: string;
  reason: string;
  archived: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReasonApiService {

  private readonly reasonBaseUrl: string;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.reasonBaseUrl = `${this.appConfigService.baseUrl}/visitors/reasons`;
  }

  public getReasons(page: number, size: number): Observable<GetReasonResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<GetReasonResponse>(this.reasonBaseUrl, {params});
  }

  /*public getReasonsList(): Observable<GetReasonListResponse[]> {
    console.log("API yess");
    return this.httpClient.get<GetReasonListResponse[]>(this.reasonBaseUrl + "/reasons-list");
  }*/

  public getReasonsList(): Observable<ReasonTest[]> {
    console.log("API yess");
    return this.httpClient.get<ReasonTest[]>(this.reasonBaseUrl + "/reasons-list");
  }
}
