import { TestBed } from '@angular/core/testing';

import { PortpholioService } from './portpholio.service';

describe('PortpholioService', () => {
  let service: PortpholioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PortpholioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
