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
      console.log('interceptor');

      if (err instanceof HttpErrorResponse) {
        // Handle HTTP errors
        console.log('response error ');

        if (err.status === 404) {
          // Specific handling for unauthorized errors
          console.error('Unauthorized request:', err);
          messageService.add({
            severity: 'error',
            summary: 'Attention ! ',
            detail: err.error.Error,
          });
          // You might trigger a re-authentication flow or redirect the user here
        } else {
          // Handle other HTTP error codes
          console.error('HTTP error:', err);
        }
      } else {
        // Handle non-HTTP errors
        console.error('An error occurred:', err);
      }
      userService.isLoading$.next(false);
      // Re-throw the error to propagate it further
      return throwError(() => err);
    })
  );
};
