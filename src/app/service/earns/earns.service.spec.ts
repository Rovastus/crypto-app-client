import { TestBed } from '@angular/core/testing';

import { EarnsService } from './earns.service';

describe('EarnsService', () => {
  let service: EarnsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EarnsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
