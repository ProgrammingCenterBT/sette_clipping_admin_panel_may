import { TestBed } from '@angular/core/testing';

import { ClipTvService } from './clip-tv.service';

describe('ClipTvService', () => {
  let service: ClipTvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipTvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
