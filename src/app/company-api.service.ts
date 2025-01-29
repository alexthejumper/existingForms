import { Injectable } from '@angular/core';
import {AppConfigService} from './app-config.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {CompanyRequest} from './model-back';

@Injectable({
  providedIn: 'root'
})
export class CompanyApiService {

  private readonly companyBaseUrl;

  constructor(private readonly appConfigService: AppConfigService, private readonly httpClient: HttpClient) {
    this.companyBaseUrl = `${this.appConfigService.baseUrl}/companies`;
  }

  getCompanies(query: string): Observable<CompanyRequest[]> {
    const params = new HttpParams().set('query', query);
    return this.httpClient.get<CompanyRequest[]>(this.companyBaseUrl, {params})
  }
}
