import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CarriereComponent } from './carrieres.component';



describe('CarrieresComponent', () => {
  let component: CarriereComponent;
  let fixture: ComponentFixture<CarriereComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CarriereComponent]
    });
    fixture = TestBed.createComponent(CarriereComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
