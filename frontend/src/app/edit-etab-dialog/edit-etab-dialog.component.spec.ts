import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtabDialogComponent } from './edit-etab-dialog.component';

describe('EditEtabDialogComponent', () => {
  let component: EditEtabDialogComponent;
  let fixture: ComponentFixture<EditEtabDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEtabDialogComponent]
    });
    fixture = TestBed.createComponent(EditEtabDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
