import { TestBed } from '@angular/core/testing';

import { FunClientService } from './fun-client.service';

describe('FunClientService', () => {
  let service: FunClientService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunClientService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
