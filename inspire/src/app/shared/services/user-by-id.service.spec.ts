import { TestBed } from '@angular/core/testing';

import { UserByIdService } from './user-by-id.service';

describe('UserByIdService', () => {
  let service: UserByIdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserByIdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
