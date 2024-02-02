import { CanActivateFn } from '@angular/router';

export const aGuardGuard: CanActivateFn = (route, state) => {
  return true;
};
