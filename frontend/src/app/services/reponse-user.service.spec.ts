import { TestBed } from '@angular/core/testing';

import { ReponseUserService } from './reponse-user.service';

describe('ReponseUserService', () => {
  let service: ReponseUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
