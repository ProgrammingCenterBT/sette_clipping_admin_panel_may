import { TestBed } from '@angular/core/testing';

import { FunMediumService } from './fun-medium.service';

describe('FunMediumService', () => {
  let service: FunMediumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunMediumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
