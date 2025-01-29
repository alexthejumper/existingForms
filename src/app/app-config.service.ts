import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppConfigService {

  public baseUrl = 'http://localhost:8080/api';

  constructor() { }
}
