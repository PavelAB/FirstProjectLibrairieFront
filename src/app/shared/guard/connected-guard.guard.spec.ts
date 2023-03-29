import { TestBed } from '@angular/core/testing';

import { ConnectedGuardGuard } from './connected-guard.guard';

describe('ConnectedGuardGuard', () => {
  let guard: ConnectedGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ConnectedGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
