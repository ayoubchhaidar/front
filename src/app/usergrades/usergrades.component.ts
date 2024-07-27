import { Component, OnInit } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-usergrades',
  templateUrl: './usergrades.component.html',
  styleUrls: ['./usergrades.component.css']
})
export class UsergradesComponent implements OnInit {
  userGrades: any ;
  quizgrades: any ;
  signeduser: any;

  constructor(private MydataService:MydataService) { }
  ngOnInit(): void {
    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);
this.MydataService.userGrades(this.signeduser.user_id).subscribe(
  (response: any) => {
    this.userGrades=response;
    console.log(response);
   
   },
   (error: any) => {
     console.error('Error material:', error);
   }



);
this.MydataService.userquizGrades(this.signeduser.user_id).subscribe(
  (response: any) => {
    this.quizgrades=response;
    console.log(response);
   
   },
   (error: any) => {
     console.error('Error material:', error);
   }



);

}




  }
