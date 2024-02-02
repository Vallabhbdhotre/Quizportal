import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { aGuardGuard } from './a-guard.guard';

describe('aGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => aGuardGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
