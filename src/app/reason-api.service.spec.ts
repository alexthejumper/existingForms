import { TestBed } from '@angular/core/testing';

import { ReasonApiService } from './reason-api.service';

describe('ReasonApiService', () => {
  let service: ReasonApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReasonApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
