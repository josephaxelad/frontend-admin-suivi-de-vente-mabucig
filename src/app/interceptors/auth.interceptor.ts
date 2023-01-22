import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private _authService : AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<any> {
    const token =  JSON.parse(localStorage.getItem('token')!) ;
    const newRequest = request.clone({
      headers: request.headers.set('Authorization', 'Bearer ' + token)
    });
    return next.handle(newRequest).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          this._authService.logout()
        }
        return throwError(response);
      }
    ))
  }

}
