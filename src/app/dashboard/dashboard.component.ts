import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  signeduser!:any;
  user ={"id":null,
  "password": null,
  "username": null,
  "first_name": null,
  "last_name": null,
  "email":null,
  "is_active": null,
  "is_superuser": null,
  "is_staff": null,
  "date_joined": null,
  "last_login": null,
  "image": null,}
  constructor(private AuthService: AuthService,private router: Router) {   
  }
  ngOnInit(): void {
    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);
    const userId = 10; // Replace with the actual user ID you want to retrieve
    this.AuthService.getUserProfile(this.signeduser.user_id).subscribe(user => {
      this.user = user;
    });
 

  }
  reloadPage(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users', 'Formateurs']);
    });
  }
  reloadPage1(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users', 'Apprenants']);
    });
  }
  reloadPage2(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users', 'Administraeurs']);
    });
  }
  reloadPage3(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/users', 'notVerified']);
    });
  }
  logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCart");
    location.reload();
  }
}
