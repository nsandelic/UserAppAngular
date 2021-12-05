import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private api_url = 'http://localhost:8080';

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    
    if (!request || !request.url || (request.url.startsWith('http') && !(this.api_url && request.url.startsWith(this.api_url)))) {
      return next.handle(request);
  } // Handeling bad request

  const token = localStorage.getItem('token');
  if(token){
    request = request.clone({
      setHeaders: {
        Authorization : 'Bearer ' + token
      }
    });
  } // Adding auth token to the header in form "Bearer + <token>"
 
  if(!request.headers.has('Content-Type')) {
    request = request.clone ({
      setHeaders: { 'Content-Type': 'application/json' }
    });
  } // Adding content type if it is missing

  return next.handle(request);



  }






}
