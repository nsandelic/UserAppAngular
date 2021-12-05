import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { LoginService } from '../services/login.service';

@Injectable()
export class AuthExpiredInterceptor implements HttpInterceptor {


  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap(null, (err: HttpErrorResponse) => { // tslint:disable-line: deprecation
        if (err.status === 401) {
          this.loginService.logout();
          this.router.navigate(['/login']);
        }
      })
    );
  } // Rerouting to /login when authentication expires





}
