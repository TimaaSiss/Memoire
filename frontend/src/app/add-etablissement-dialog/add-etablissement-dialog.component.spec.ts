import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEtablissementDialogComponent } from './add-etablissement-dialog.component';

describe('AddEtablissementDialogComponent', () => {
  let component: AddEtablissementDialogComponent;
  let fixture: ComponentFixture<AddEtablissementDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEtablissementDialogComponent]
    });
    fixture = TestBed.createComponent(AddEtablissementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
