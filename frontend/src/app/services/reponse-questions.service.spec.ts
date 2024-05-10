import { TestBed } from '@angular/core/testing';

import { ReponseQuestionService } from './reponse-questions.service';

describe('ReponseQuestionsService', () => {
  let service: ReponseQuestionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseQuestionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
