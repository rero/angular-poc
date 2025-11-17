import { HttpErrorResponse, HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import { catchError, of } from 'rxjs';

export const httpResponseErrorInterceptor: HttpInterceptorFn = (req, next) => {
  const messageService = inject(MessageService);
  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      messageService.add({ severity: "error", summary: "Http response error" })

      return of(new HttpResponse<void>({
        body: undefined,
        status: error.status
      }));
    })
  );
};
