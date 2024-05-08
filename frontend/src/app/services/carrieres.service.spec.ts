import { TestBed } from '@angular/core/testing';

import { CarrieresService } from './carrieres.service';

describe('CarrieresService', () => {
  let service: CarrieresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarrieresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
