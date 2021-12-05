import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../services/login.service';
import { UserService } from '../services/user.service';
import { User } from '../user/user';
import { UserCredentials } from '../user/user-credentials';
import { JwtToken } from './jwt-model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  authenticating = false; // to show loading
  loginFailed = false; // to show login failed message
  userCredentials: UserCredentials;
  closeResult: string;
  dob: NgbDate;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private userService: UserService,
    private httpClient: HttpClient,
    private modalService: NgbModal
  ) { }

  
  ngOnInit(): void {
    this.userCredentials = new UserCredentials(); // check if its already logged in
  }

  login(){
    this.authenticating = true;
    this.loginFailed = false;

    this.loginService.authenticate(this.userCredentials).subscribe(
      (jwtToken: JwtToken) => this.successfulLogin(jwtToken),
      () => this.loginFailed = true
    ).add(() => this.authenticating = false);
  }
  
    successfulLogin(jwtToken: JwtToken) {
      localStorage.setItem('token', jwtToken.token) // Storing token value to local storage
      this.userService.getCurrentUser().subscribe((currentUser: User) => this.userService.currentUser = currentUser);
      this.router.navigate(['/']);
    }


    open(content: any) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }

    onSubmit(f: NgForm) {
      const url = 'http://localhost:8080/api/register/';
  
      if(f.valid){
  
  f.value.dob = new Date (
    f.value.dob.year,
    f.value.dob.month,
    f.value.dob.day,
  );
  
      this.httpClient.post(url, f.value)
        .subscribe((result) => {
          this.ngOnInit(); //reload the table
        });
      this.modalService.dismissAll(); //dismiss the modal
      }
  
    }
  

    private getDismissReason(reason: any): string {
      if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
      } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
      } else {
        return `with: ${reason}`;
      }
    }

}
