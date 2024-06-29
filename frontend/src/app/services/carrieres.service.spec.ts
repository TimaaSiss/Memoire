import { TestBed } from '@angular/core/testing';
import { CarriereService } from './carrieres.service';


describe('CarrieresService', () => {
  let service: CarriereService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarriereService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
