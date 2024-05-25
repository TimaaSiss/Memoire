import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditMentorDialogComponent } from './edit-mentor-dialog.component';

describe('EditMentorDialogComponent', () => {
  let component: EditMentorDialogComponent;
  let fixture: ComponentFixture<EditMentorDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditMentorDialogComponent]
    });
    fixture = TestBed.createComponent(EditMentorDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
