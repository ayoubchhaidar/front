

import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-void',
  templateUrl: './void.component.html',
  styleUrls: ['./void.component.css']
})
export class VoidComponent {
  user: any;
  constructor(  private http: HttpClient,private router: Router) {}
  message='';
  ngOnInit(): void {

    this.http.get('http://localhost:8000/accounts/user', {withCredentials: true}).subscribe(
      (res: any) => {
        this.message = `Hi ${res.username}`;
        console.log(res);
        localStorage.setItem('currentUser', JSON.stringify(res));
        this.user = localStorage.getItem("currentUser");
         this.user = JSON.parse(this.user);
        this.router.navigate(['/dashboard']);
        if (this.user.is_active === true && this.user.is_staff === false && !this.user.is_superuser) {
          // Redirect to the dashboard route after successful login if conditions are met
          this.router.navigate(['/dashboard/statS']);
        }
        if ((this.user.is_staff==true  && this.user.is_active==true) &&!this.user.is_superuser) {
          // Redirect to the dashboard route after successful login if conditions are met
          this.router.navigate(['/dashboard/statF']);
        }
        if ( this.user.is_superuser==true) {
          // Redirect to the dashboard route after successful login if conditions are met
          this.router.navigate(['/dashboard/stat']);
        }
      },
      err => {
        this.message = 'You are not logged in';
      }
    );
  }
}