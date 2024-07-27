import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  myform: FormGroup;
  errorMessage: string = ''; // Add error message property
  user: any;

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {
    this.myform = new FormGroup({
      username: new FormControl(''),
      password: new FormControl('')
    });
  }

  ngOnInit(): void {}
  password: string = '';
  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }
  get f() {
    return this.myform.controls;
  }
  
  submit(): void {
    this.http.post('http://localhost:8000/accounts/login', this.myform.getRawValue(), {
      withCredentials: true
    }).subscribe(
      () => this.router.navigate(['/void']),
      (error) => {
        if (error.status === 401) { // Assuming 401 Unauthorized for incorrect credentials
          this.errorMessage = "Nom d'utilisateur ou mot de passe incorrect.";
        }
        else if (error.status === 402) { // Assuming 401 Unauthorized for incorrect credentials
          this.errorMessage = "compte non verifié.";
        }   else {
          
          this.errorMessage = "Une erreur est survenue. Veuillez réessayer.";
        }
      }
    );
  }
  
  // onSubmit() {
  //   this.authService.login(this.myform.value['username'], this.myform.value['password'])
  //     .pipe(first())
  //     .subscribe(
  //       data => {
  //         console.log(data);
  //         this.user = localStorage.getItem("currentUser");
  //         this.user = JSON.parse(this.user);
  
  //         // Check if the user meets the criteria
  //         if (this.user.is_active === true && this.user.is_staff === false && !this.user.is_superuser) {
  //           // Redirect to the dashboard route after successful login if conditions are met
  //           this.router.navigate(['/dashboard/statS']);
  //         }
  //         if ((this.user.is_staff==true  && this.user.is_active==true) &&!this.user.is_superuser) {
  //           // Redirect to the dashboard route after successful login if conditions are met
  //           this.router.navigate(['/dashboard/statF']);
  //         }
  //         if ( this.user.is_superuser==true) {
  //           // Redirect to the dashboard route after successful login if conditions are met
  //           this.router.navigate(['/dashboard/stat']);
  //         }
  //       },
  //       error => {
  //         console.error('Error occurred during login:', error);
  //         this.errorMessage = 'Invalid username or password'; // Set error message
  //       }
  //     );
  // }
  

  // Clear error message when input changes
  clearErrorMessage() {
    this.errorMessage = '';
  }
}
