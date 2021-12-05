import { Component } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import { UserService } from './services/user.service';
import { User } from './user/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'UserApp';
 



  constructor(
      public userService: UserService
  ) {}
  isUserLoggedIn(): boolean {
    return !!this.userService.currentUser;
  }


 


}
