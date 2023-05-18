import { TestBed } from '@angular/core/testing';

import { BankruptciesService } from './bankruptcies.service';

describe('BankruptciesService', () => {
  let service: BankruptciesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankruptciesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
