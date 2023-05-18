import { TestBed } from '@angular/core/testing';

import { FunClipService } from './fun-clip.service';

describe('FunClipService', () => {
  let service: FunClipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunClipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
