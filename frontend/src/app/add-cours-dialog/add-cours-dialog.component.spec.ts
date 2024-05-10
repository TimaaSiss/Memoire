import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCoursDialogComponent } from './add-cours-dialog.component';

describe('AddCoursDialogComponent', () => {
  let component: AddCoursDialogComponent;
  let fixture: ComponentFixture<AddCoursDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCoursDialogComponent]
    });
    fixture = TestBed.createComponent(AddCoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
