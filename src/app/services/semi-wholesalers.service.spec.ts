import { TestBed } from '@angular/core/testing';

import { SemiWholesalersService } from './semi-wholesalers.service';

describe('SemiWholesalersService', () => {
  let service: SemiWholesalersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SemiWholesalersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
