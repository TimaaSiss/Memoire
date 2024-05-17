import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionnaireDetailsComponent } from './questionnaire-details.component';

describe('QuestionnaireDetailsComponent', () => {
  let component: QuestionnaireDetailsComponent;
  let fixture: ComponentFixture<QuestionnaireDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuestionnaireDetailsComponent]
    });
    fixture = TestBed.createComponent(QuestionnaireDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
