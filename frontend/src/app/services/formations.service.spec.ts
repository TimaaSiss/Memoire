import { TestBed } from '@angular/core/testing';

import { FormationService } from './formations.service';

describe('FormationsService', () => {
  let service: FormationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
