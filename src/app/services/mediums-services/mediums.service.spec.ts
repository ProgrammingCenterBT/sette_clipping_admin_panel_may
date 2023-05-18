import { TestBed } from '@angular/core/testing';

import { MediumsService } from './mediums.service';

describe('MediumsService', () => {
  let service: MediumsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediumsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
