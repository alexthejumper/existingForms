import { TestBed } from '@angular/core/testing';

import { VisitorApiService } from './visitor-api.service';

describe('VisitorApiService', () => {
  let service: VisitorApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitorApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
