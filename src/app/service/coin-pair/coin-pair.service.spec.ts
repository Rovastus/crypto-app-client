import { TestBed } from '@angular/core/testing';

import { CoinPairService } from './coin-pair.service';

describe('CoinPairService', () => {
  let service: CoinPairService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinPairService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
