import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddResponseDialogComponent } from './add-response-dialog.component';

describe('AddResponseDialogComponent', () => {
  let component: AddResponseDialogComponent;
  let fixture: ComponentFixture<AddResponseDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddResponseDialogComponent]
    });
    fixture = TestBed.createComponent(AddResponseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
