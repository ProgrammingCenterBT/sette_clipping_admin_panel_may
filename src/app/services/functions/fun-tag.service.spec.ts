import { TestBed } from '@angular/core/testing';

import { FunTagService } from './fun-tag.service';

describe('FunTagService', () => {
  let service: FunTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FunTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
