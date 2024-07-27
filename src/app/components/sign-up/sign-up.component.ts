import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  myform: FormGroup;
  selectedFile!: File;
  needVerification = false;
  errormsg: string | undefined;

  constructor(private authService: AuthService) {
    this.myform = new FormGroup({
      username: new FormControl('', Validators.required),
      full_name: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, this.checkPw.bind(this)]),
      role: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
    this.authService.getVerifStatus().subscribe(
      (data: boolean) => {
        this.needVerification = data;
        console.log(this.needVerification);
      },
      (error) => {
        console.error('Error:', error);
      }
    );
  }

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }

  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  get f() {
    return this.myform.controls;
  }

  onSignup() {
    if (this.myform.valid) {
      const formData = new FormData();
      formData.append('profile_image', this.selectedFile);
      formData.append('username', this.myform.value['username']);
      formData.append('full_name', this.myform.value['full_name']);
      formData.append('email', this.myform.value['email']);
      formData.append('password', this.myform.value['password']);
      formData.append('is_active', String(!this.needVerification));
      formData.append('is_superuser', String(false));
      formData.append('is_staff', String(this.myform.value['role'] === 'teacher'));

      this.authService.signup(
        this.myform.value['username'],
        this.myform.value['full_name'],
        this.myform.value['email'],
        this.myform.value['password'],
        !this.needVerification,
        false,
        this.myform.value['role'] === 'teacher'
      );

      this.errormsg = this.needVerification
        ? 'Veuillez vérifier votre e-mail pour confirmer votre compte.'
        : 'Veuillez vérifier votre e-mail pour confirmer votre compte.';
    } else {
      this.errormsg = 'Please fill in all required fields correctly.';
      console.error('Please fill in all required fields correctly.');
    }
  }

  checkPw(control: FormControl): { [s: string]: boolean } | null {
    const password = control.value;
    if (password.length < 8 || !/[A-Z]/.test(password) || !/\d/.test(password)) {
      return { invalidPassword: true };
    }
    return null;
  }
}
