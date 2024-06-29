import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, throwError } from 'rxjs';
import { UserService } from '../services/user.service';

export const errorHandlerInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  const userService = inject(UserService);

  return next(req).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        console.log('response error ');

        if (err.status === 404) {
          console.error('Unauthorized request:', err);
          messageService.add({
            severity: 'error',
            summary: 'Attention ! ',
            detail: err.error.Error,
          });
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      userService.isLoading$.next(false);
      return throwError(() => err);
    })
  );
};
