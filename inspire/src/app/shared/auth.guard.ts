import { CanActivateFn, Router } from '@angular/router';
import { UserStoreService } from './services/stores/user-store.service';
import { inject } from '@angular/core';

export const isConnected: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(UserStoreService);

  const user = store.getUserConnected$().value;

  if (user) {
    return true;
  } else {
    router.navigate(['/login']);
    return false;
  }
};
