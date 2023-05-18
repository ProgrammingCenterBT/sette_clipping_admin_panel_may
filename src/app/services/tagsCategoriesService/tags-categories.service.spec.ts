import { TestBed } from '@angular/core/testing';

import { TagsCategoriesService } from './tags-categories.service';

describe('TagsCategoriesService', () => {
  let service: TagsCategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TagsCategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
