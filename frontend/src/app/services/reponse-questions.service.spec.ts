import { TestBed } from '@angular/core/testing';

import { ReponseQuestionsService } from './reponse-questions.service';

describe('ReponseQuestionsService', () => {
  let service: ReponseQuestionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseQuestionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
