import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerDetailsComponent } from './career-details.component';

describe('CareerDetailsComponent', () => {
  let component: CareerDetailsComponent;
  let fixture: ComponentFixture<CareerDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CareerDetailsComponent]
    });
    fixture = TestBed.createComponent(CareerDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
