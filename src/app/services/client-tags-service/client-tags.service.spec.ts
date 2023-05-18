import { TestBed } from '@angular/core/testing';

import { ClientTagsService } from './client-tags.service';

describe('ClientTagsService', () => {
  let service: ClientTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
