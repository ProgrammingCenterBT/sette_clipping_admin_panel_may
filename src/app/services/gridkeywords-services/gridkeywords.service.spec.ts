import { TestBed } from '@angular/core/testing';

import { GridkeywordsService } from './gridkeywords.service';

describe('GridkeywordsService', () => {
  let service: GridkeywordsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GridkeywordsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
