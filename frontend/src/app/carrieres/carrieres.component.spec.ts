import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarrieresComponent } from './carrieres.component';

describe('CarrieresComponent', () => {
  let component: CarrieresComponent;
  let fixture: ComponentFixture<CarrieresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarrieresComponent]
    });
    fixture = TestBed.createComponent(CarrieresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
