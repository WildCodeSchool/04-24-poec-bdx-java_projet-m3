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
    router.navigate(['']);
    return false;
  }
};

export const isMentor: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(UserStoreService);

  const mentor = store.getUserConnected$().value?.role;

  if (mentor === 'mentor') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};

export const isStudent: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(UserStoreService);

  const student = store.getUserConnected$().value?.role;

  if (student === 'student') {
    return true;
  } else {
    router.navigate(['']);
    return false;
  }
};

export const isMentorLog: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(UserStoreService);

  const mentor = store.getUserConnected$().value?.role;

  if (mentor === 'mentor') {
    router.navigate(['/mentor']);
    return false;
  } else {
    return true;
  }
};

export const isStudentLog: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const store = inject(UserStoreService);

  const student = store.getUserConnected$().value?.role;

  if (student === 'student') {
    router.navigate(['/student']);
    return false;
  } else {
    return true;
  }
};
