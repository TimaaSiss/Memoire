import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCarriereDialogComponent } from './edit-dialog-career.component';

describe('EditDialogCareerComponent', () => {
  let component: EditCarriereDialogComponent;
  let fixture: ComponentFixture<EditCarriereDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCarriereDialogComponent]
    });
    fixture = TestBed.createComponent(EditCarriereDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
