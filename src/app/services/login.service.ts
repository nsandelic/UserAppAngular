import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtToken } from '../login/jwt-model';
import { UserCredentials } from '../user/user-credentials';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private http: HttpClient
  ) { }


authenticate(userCredentials: UserCredentials): Observable<JwtToken>{
  return this.http.post<JwtToken>( 'http://localhost:8080/api/authenticate', userCredentials);
}

logout(): void {
  localStorage.removeItem('token');
}

}
