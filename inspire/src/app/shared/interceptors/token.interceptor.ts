import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { UserStoreService } from '../services/stores/user-store.service';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  console.log(req.urlWithParams);
  const authToken = inject(UserStoreService).token$.value;
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq);
};
