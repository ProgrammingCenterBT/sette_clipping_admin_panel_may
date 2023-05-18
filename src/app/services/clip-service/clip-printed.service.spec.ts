import { TestBed } from '@angular/core/testing';

import { ClipPrintedService } from './clip-printed.service';

describe('ClipPrintedService', () => {
  let service: ClipPrintedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipPrintedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
