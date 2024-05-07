import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddQuestionnaireDialogComponent } from './add-questionnaire-dialog.component';

describe('AddQuestionnaireDialogComponent', () => {
  let component: AddQuestionnaireDialogComponent;
  let fixture: ComponentFixture<AddQuestionnaireDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddQuestionnaireDialogComponent]
    });
    fixture = TestBed.createComponent(AddQuestionnaireDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
