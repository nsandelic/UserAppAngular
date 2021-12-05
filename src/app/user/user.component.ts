import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from './user';
import {ModalDismissReasons, NgbDate, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  closeResult: string;
  userArray: User[];
  selectedUser: User;
  dob: NgbDate;
  editForm: FormGroup;
  message: string;

  constructor(public userService: UserService, 
              private modalService: NgbModal, 
              private httpClient: HttpClient,
              private fb: FormBuilder) { }




  ngOnInit(): void {
      this.getAllUsers();
      this.editForm = this.fb.group({
        id: [''],
        firstName: [''],
        lastName: [''],
        username: [''],
        email: [''],
        gender: ['']
      } );
  }


  getAllUsers(): void {
    this.userService.getAllUsers()
      .subscribe( users => 
        this.userArray = users,
        ); 
  }

  deleteUser(user: User ): void {
    const idx = this.userArray.indexOf(user as User);
    console.log(idx);
    this.userService.deleteUser(user)
    .subscribe(vaccine => {
      this.userArray.splice(idx, 1);
      });
  }

 

  open(content: any) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
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


  onSubmit(f: NgForm) {
    const url = 'http://localhost:8080/user/';

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


  openEdit(targetModal: any, user: User) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
   this.editForm.patchValue( {
    id: user.id, 
    firstName: user.firstName ,
    lastName: user.lastName,
    username: user.username,
    email: user.email,
    gender: user.gender
  });
 }

 onSave() {
  const url = 'http://localhost:8080/user/';
  console.log(this.editForm.value);
  this.httpClient.put(url, this.editForm.value)
    .subscribe((results) => {
      this.ngOnInit();
      this.modalService.dismissAll();
    });

  
}

deletePopUp(user: User) {
  if (confirm('Are you sure you want to delete this?')) {
    this.deleteUser(user);
  }
}



}
