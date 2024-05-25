import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtablissementsComponent } from './etablissements.component';

describe('EtablissementsComponent', () => {
  let component: EtablissementsComponent;
  let fixture: ComponentFixture<EtablissementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtablissementsComponent]
    });
    fixture = TestBed.createComponent(EtablissementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
