import { TestBed } from '@angular/core/testing';

import { NoGoToLoginGuard } from './no-go-to-login.guard';

describe('NoGoToLoginGuard', () => {
  let guard: NoGoToLoginGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoGoToLoginGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
