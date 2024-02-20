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
  selectedFile!: File;
  needVerification=false;
  constructor(private AuthService: AuthService) {
    this.myform = new FormGroup({
      username: new FormControl(''),
      first_name: new FormControl(''),
      last_name: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(''),
      email: new FormControl('')
    });
  }
  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  ngOnInit(): void {    this.AuthService.getVerifStatus().subscribe(
    (data: boolean) => {
      this.needVerification = data;
      console.log(  this.needVerification);
    },
    (error) => {
      console.error('Error:', error);
    }
  );

}

  get f() {
    return this.myform.controls;
  }

  onSignup() {


    const verifStatus=this.AuthService.getVerifStatus().subscribe();
    console.log(verifStatus);


    const isTeacher = this.myform.value['role'] === 'teacher';
    const isStudent = this.myform.value['role'] === 'student';

    if (this.myform.value['username'] && this.myform.value['first_name'] && this.myform.value['password']&& this.myform.value['email']) {
      const formData = new FormData();
      formData.append('profile_image', this.selectedFile);

      if(this.needVerification==false){
        console.log("Role value:", this.myform.value['role']);
        console.log(isTeacher);

      this.AuthService.signup(this.myform.value['username'],this.myform.value['first_name'],this.myform.value['last_name'],this.myform.value['email'],this.myform.value['password'], true ,false,isTeacher,this.selectedFile)
        }
      else if(this.needVerification==true){
        console.log("Role value:", this.myform.value['role']);
        console.log(isTeacher);

        this.AuthService.signup(this.myform.value['username'],this.myform.value['first_name'],this.myform.value['last_name'],this.myform.value['email'],this.myform.value['password'], false ,false,isTeacher,this.selectedFile)

      }
    
    
    
      } else {

      console.error('Please fill in all required fields.');
    }
  
  
  
  }
  

}
