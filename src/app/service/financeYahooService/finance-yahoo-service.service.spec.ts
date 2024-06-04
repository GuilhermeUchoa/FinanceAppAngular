import { TestBed } from '@angular/core/testing';

import { FinanceYahooServiceService } from './finance-yahoo-service.service';

describe('FinanceYahooServiceService', () => {
  let service: FinanceYahooServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FinanceYahooServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
