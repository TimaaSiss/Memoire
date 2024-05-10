import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCoursDialogComponent } from './edit-cours-dialog.component';

describe('EditCoursDialogComponent', () => {
  let component: EditCoursDialogComponent;
  let fixture: ComponentFixture<EditCoursDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCoursDialogComponent]
    });
    fixture = TestBed.createComponent(EditCoursDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
