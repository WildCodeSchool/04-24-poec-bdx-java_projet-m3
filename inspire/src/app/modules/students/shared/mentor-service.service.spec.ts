import { TestBed } from '@angular/core/testing';

import { MentorServiceService } from './mentor-service.service';

describe('MentorServiceService', () => {
  let service: MentorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
