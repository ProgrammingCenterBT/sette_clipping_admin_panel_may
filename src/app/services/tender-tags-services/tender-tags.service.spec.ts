import { TestBed } from '@angular/core/testing';

import { TenderTagsService } from './tender-tags.service';

describe('TenderTagsService', () => {
  let service: TenderTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TenderTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
