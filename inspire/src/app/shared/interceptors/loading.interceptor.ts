import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { tap } from 'rxjs';

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loading = inject(UserService).isLoading$;
  loading.next(true);
  return next(req).pipe(tap(() => loading.next(false)));
};
