import { TestBed } from '@angular/core/testing';

import { ExistingVisitorService } from './existing-visitor.service';

describe('ExistingVisitorService', () => {
  let service: ExistingVisitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExistingVisitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
