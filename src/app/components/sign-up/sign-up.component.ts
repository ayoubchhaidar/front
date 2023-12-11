import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myform: FormGroup;
  
  constructor(private AuthService: AuthService) {
    this.myform = new FormGroup({
      username: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      password: new FormControl(''),
      role1: new FormControl(''),
      role2: new FormControl(''),
      email: new FormControl('')
    });
  }

  ngOnInit(): void {}

  get f() {
    return this.myform.controls;
  }

  onSignup() {
    const isTeacher = this.myform.value['role1'] === 'teacher';
    const isStudent = this.myform.value['role2'] === 'student';

    if (this.myform.value['username'] && this.myform.value['first_name'] && this.myform.value['password']&& this.myform.value['email']) {

      this.AuthService.signup(this.myform.value['username'],this.myform.value['first_name'],this.myform.value['last_name'],this.myform.value['email'],this.myform.value['password'], true, isStudent,isTeacher)
        .subscribe(
          user => {
            console.log('Sign-up successful!', user);
          },
          error => {

            console.error('Sign-up failed:', error);
          }
        );
    } else {

      console.error('Please fill in all required fields.');
    }
  }
  

}
