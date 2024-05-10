import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCareerDialogComponent } from './add-career-dialog.component';

describe('AddCareerDialogComponent', () => {
  let component: AddCareerDialogComponent;
  let fixture: ComponentFixture<AddCareerDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCareerDialogComponent]
    });
    fixture = TestBed.createComponent(AddCareerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
