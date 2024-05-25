import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormationComponent } from './formations.component';

describe('FormationsComponent', () => {
  let component: FormationComponent;
  let fixture: ComponentFixture<FormationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormationComponent]
    });
    fixture = TestBed.createComponent(FormationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
