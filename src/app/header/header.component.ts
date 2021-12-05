import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isNavbarCollapsed: boolean;

  constructor(
    private loginService: LoginService,
    public userService: UserService,
    private router: Router) {
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().subscribe((currentUser: User) => {
      this.userService.currentUser = currentUser;
    });
  }




  logout() {
    this.loginService.logout();
    this.userService.currentUser = null;
    this.router.navigate(['/login']);
  }

  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }
}
