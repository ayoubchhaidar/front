import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Front';
  isLoggedIn: boolean = false;
  userlogged:any;

  ngOnInit(): void {  

    this.userlogged = localStorage.getItem("currentUser");
    this.isLoggedIn = this.userlogged !== null;
   
}


}
