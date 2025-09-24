import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpEvent,
  HttpResponse,
} from '@angular/common/http';

import { catchError, throwError, map } from 'rxjs';
//import { MsalService } from '@azure/msal-angular';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const opainInterceptor: HttpInterceptorFn = (req, next) => {
  //const msalService = inject(MsalService);
  const router = inject(Router);
  const authToken = sessionStorage.getItem("SESSION");
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`,
    },
  });
  return next(authReq).pipe(
    catchError((err: any) => {
      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          console.error('Unauthorized request:', err);
          sessionStorage.clear();
          router.navigate(['provider']);
        } else {
          console.error('HTTP error:', err);
        }
      } else {
        console.error('An error occurred:', err);
      }
      return throwError(() => err);
    })
  );
};
