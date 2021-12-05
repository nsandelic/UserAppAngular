import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private router: Router,
    private userService: UserService
  ) {}
  
  
  
    canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>  {
      return this.checkLogin();
    }
    
    checkLogin(): Observable<boolean> {
      return this.userService.getCurrentUser().pipe(
        map(user => {
          if (user) {
            return true;
          } else {
            this.router.navigate(['/login']);
            return false;
          }
        })
      );
    } // Checking if user is logged in. If not, redirect to login page.
  
}
