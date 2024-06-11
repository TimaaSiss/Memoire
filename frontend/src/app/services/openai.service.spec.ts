import { ReponseOpenAIService } from "./openai.service";
import { TestBed } from '@angular/core/testing';



describe('OpenaiService', () => {
  let service: ReponseOpenAIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReponseOpenAIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
