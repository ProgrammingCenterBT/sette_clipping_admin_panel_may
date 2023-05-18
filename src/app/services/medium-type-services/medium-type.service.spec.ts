import { TestBed } from '@angular/core/testing';

import { MediumTypeService } from './medium-type.service';

describe('MediumTypeService', () => {
  let service: MediumTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MediumTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
