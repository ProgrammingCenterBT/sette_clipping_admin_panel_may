import { TestBed } from '@angular/core/testing';

import { ClipAuthorService } from './clip-author.service';

describe('ClipAuthorService', () => {
  let service: ClipAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
