import { TestBed } from '@angular/core/testing';

import { ClientAdminService } from './client-admin.service';

describe('ClientAdminService', () => {
  let service: ClientAdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClientAdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
