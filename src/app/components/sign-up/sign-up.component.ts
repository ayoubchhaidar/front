import { Component, OnInit, platformCore } from '@angular/core';
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
  errormsg: string | undefined;
  constructor(private AuthService: AuthService) {
    this.myform = new FormGroup({
      username: new FormControl(''),
      full_name: new FormControl(''),
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
// Component TypeScript file
password: string = '';
hidePassword: boolean = true;

togglePasswordVisibility() {
  this.hidePassword = !this.hidePassword;
}


  get f() {
    return this.myform.controls;
  }

  onSignup() {


    const verifStatus=this.AuthService.getVerifStatus().subscribe();
    console.log(this.myform.value['full_name']);


    const isTeacher = this.myform.value['role'] === 'teacher';
    const isStudent = this.myform.value['role'] === 'student';

    if (this.myform.value['username'] && this.myform.value['full_name'] && this.myform.value['password']&& this.myform.value['email']) {

      if(   this.checkPw( this.myform.value['password'])==true ){

      const formData = new FormData();
      formData.append('profile_image', this.selectedFile);

      if(this.needVerification==false){
        console.log("Role value:", this.myform.value['role']);
        console.log(isTeacher);

      this.AuthService.signup(this.myform.value['username'],this.myform.value['full_name'],this.myform.value['email'],this.myform.value['password'], true ,false,isTeacher)
        }
      else if(this.needVerification==true){
        console.log("Role value:", this.myform.value['role']);
        console.log(isTeacher);

        this.AuthService.signup(this.myform.value['username'],this.myform.value['full_name'],this.myform.value['email'],this.myform.value['password'], false ,false,isTeacher)

      }


    }


    else {

      this.errormsg='Le mot de passe doit comporter au moins 8 caractères, contenir au moins une lettre majuscule et au moins un chiffre '
    }
      } else {
        this.errormsg="Veuillez remplir tous les champs requis."
      console.error('Veuillez remplir tous les champs requis.');
    }



  }


  checkPw(password: string) {

    if (password.length < 8) {
      return false;     }

    if (!/[A-Z]/.test(password)) {
      return false; 
    }

    if (!/\d/.test(password)) {
      return false;     }

    return true;

  }

}
  


