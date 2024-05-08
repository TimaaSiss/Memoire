import { QuestionnaireService } from './questionnaire-service.service';
import { TestBed } from '@angular/core/testing';



describe('QuestionnaireServiceService', () => {
  let service: QuestionnaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuestionnaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
