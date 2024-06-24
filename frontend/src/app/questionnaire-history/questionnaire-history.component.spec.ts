import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireHistoryComponent } from './questionnaire-history.component';

describe('QuestionnaireHistoryComponent', () => {
  let component: QuestionnaireHistoryComponent;
  let fixture: ComponentFixture<QuestionnaireHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireHistoryComponent]
    });
    fixture = TestBed.createComponent(QuestionnaireHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
