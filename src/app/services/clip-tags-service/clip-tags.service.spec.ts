import { TestBed } from '@angular/core/testing';

import { ClipTagsService } from './clip-tags.service';

describe('ClipTagsService', () => {
  let service: ClipTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
