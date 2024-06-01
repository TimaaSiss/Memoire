import { TestBed } from '@angular/core/testing';

  import { MentorService } from './mentors.service';

describe('MentorsService', () => {
  let service: MentorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MentorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
