import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../user/user';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userURL = 'http://localhost:8080/user';
  currentUser: User;

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json',})
  };

  constructor(private http: HttpClient) { }


  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.userURL}/current-user`);
  }

  isRoleAdmin(): boolean {
    if (this.currentUser) {
      return this.currentUser.authorities.some((authority: string) => authority === 'ROLE_ADMIN');
    } else {
      return false;
    }
  }


  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]> (this.userURL)
    .pipe(
      tap(_ => console.log('fetched users')),
      catchError(this.handleError<User[]>('getAllUsers',[]))
    );
  }

  getUserById(id: number | null): Observable<any> {
    const url = `${this.userURL}/${id}`;
    return this.http.get(url)
    .pipe(
      catchError(this.handleError<any>('Error'))
    )
  }

  addUser(user: User): Observable<User> {
    return this.http.post<User>(this.userURL, user, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })})
    .pipe(
      tap((newVaccine: User) => console.log(`User added!}`)),
      catchError(this.handleError<User>('addUser'))
    );
  }

  deleteUser(user: User): Observable<User> {
    const deleteURL = `${this.userURL}/${user.id}`;

    return this.http.delete<User>(deleteURL, {headers : new HttpHeaders({ 'Content-Type': 'application/json' })   })
    .pipe(
      tap(_ => console.log('User Deleted')),
      catchError(this.handleError<User>('deleteUser'))
    );

  }

  updateUser(user: User): Observable<any> {
    const url = `${this.userURL}/${user.id}`;
    return this.http.put(url, user).pipe(
      tap(_ => console.log(`updated user`)),
      catchError(this.handleError<any>('updateUser'))
    );
  }


  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
        console.error(operation);
        console.error(error);
        return of(result as T);
    };
}


}

