import { Visitor } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {VisitorLogRequest, VisitorLogRequestTest} from './model-back';
import { AppConfigService } from './app-config.service';
import { HttpClient } from '@angular/common/http';
import { VisitorRequest } from './model-back';

@Injectable({
  providedIn: 'root'
})
export class VisitorApiService {

  private readonly visitorBaseUrl;

  constructor(
    private readonly appConfigService: AppConfigService,
    private readonly httpClient: HttpClient
  ) {
    this.visitorBaseUrl = `${this.appConfigService.baseUrl}/visitors`
  }

  createExistingVisitorLog(existingVisitorLogRequest: VisitorLogRequest): Observable<VisitorLogRequest> {
    return this.httpClient.post<VisitorLogRequest>(
      `${this.visitorBaseUrl}/existing-visitor-log`,
      existingVisitorLogRequest
    );
  }

  createExistingVisitorLogTest(existingVisitorLogRequest: VisitorLogRequestTest): Observable<VisitorLogRequestTest> {
    return this.httpClient.post<VisitorLogRequestTest>(
      `${this.visitorBaseUrl}/updateTest`,
      existingVisitorLogRequest
    );
  }

  updateExistingVisitor(visitorRequest: VisitorRequest): Observable<VisitorRequest> {
    console.log(visitorRequest.firstName);
    return this.httpClient.put<VisitorRequest>(
      `${this.visitorBaseUrl}/existing-visitor`,
      visitorRequest
    );
  }

  getContactNumber(firstName: string, lastName: string): Observable<any> {
    console.log("contact number called");
    return this.httpClient.get<any>(`${this.visitorBaseUrl}/contact?firstName=${firstName}&lastName=${lastName}`);
  }
}
