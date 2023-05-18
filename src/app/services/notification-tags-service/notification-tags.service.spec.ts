import { TestBed } from '@angular/core/testing';

import { NotificationTagsService } from './notification-tags.service';

describe('NotificationTagsService', () => {
  let service: NotificationTagsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationTagsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
