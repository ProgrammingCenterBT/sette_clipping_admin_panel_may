import { TestBed } from '@angular/core/testing';

import { RolesAndRightsService } from './roles-and-rights.service';

describe('RolesAndRightsService', () => {
  let service: RolesAndRightsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RolesAndRightsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
