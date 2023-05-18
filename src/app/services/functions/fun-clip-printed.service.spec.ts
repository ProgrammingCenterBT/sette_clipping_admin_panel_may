import { TestBed } from '@angular/core/testing';

import { FunClipPrintedService } from './fun-clip-printed.service';

describe('FunClipPrintedService', () => {
  let service: FunClipPrintedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunClipPrintedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
