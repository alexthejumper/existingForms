import { Injectable } from '@angular/core';
import {AppConfigService} from './app-config.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BadgeValidityResponse} from './model-back';

@Injectable({
  providedIn: 'root'
})
export class BadgeApiService {

  private readonly badgeBaseUrl: string;

  constructor(private readonly appConfigService: AppConfigService, private readonly httpClient: HttpClient) {
    this.badgeBaseUrl = `${this.appConfigService.baseUrl}/badges`;
  }

  checkBadgeValidity(badgeId: string): Observable<BadgeValidityResponse> {
    return this.httpClient.get<BadgeValidityResponse>(
      `${this.badgeBaseUrl}/${badgeId}`
    )
  }
}
