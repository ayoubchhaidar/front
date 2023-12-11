import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user!:any;

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    console.log(this.user)
    
  }




  logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("currentCart");
    location.reload();
  }




}
