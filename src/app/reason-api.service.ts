import { Injectable } from '@angular/core';
import {AppConfigService} from './app-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GetReasonResponse} from './model-back';

@Injectable({
  providedIn: 'root'
})
export class ReasonApiService {

  private readonly reasonBaseUrl: string;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.reasonBaseUrl = `${this.appConfigService.baseUrl}/reasons`;
  }

  public getReasons(page: number, size: number): Observable<GetReasonResponse> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.httpClient.get<GetReasonResponse>(this.reasonBaseUrl, {params});
  }
}
