import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireResultComponent } from './questionnaire-result.component';

describe('QuestionnaireResultComponent', () => {
  let component: QuestionnaireResultComponent;
  let fixture: ComponentFixture<QuestionnaireResultComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireResultComponent]
    });
    fixture = TestBed.createComponent(QuestionnaireResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
