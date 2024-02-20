import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent {
  message: string='';

myform: FormGroup;

constructor(private authService: AuthService) {
  this.myform = new FormGroup({
    username: new FormControl(''),
    email: new FormControl('')
  });
}
onSubmit() {
  const resetData = { username:this.myform.value['username'] , email:this.myform.value['email']  };

  this.authService.resetPw(resetData).subscribe(  (response) => {
    this.message = response.message; 
  },
  (error) => {
    console.error('Error:', error);
    this.message = 'Invalid email or username.'; // Display error message
  });
  
  }

}
