import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEtablissementDialogComponent } from './edit-etablissement-dialog.component';

describe('EditEtablissementDialogComponent', () => {
  let component: EditEtablissementDialogComponent;
  let fixture: ComponentFixture<EditEtablissementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditEtablissementDialogComponent]
    });
    fixture = TestBed.createComponent(EditEtablissementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
