import { Component,OnInit,ViewEncapsulation } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import {  ReminderComponent} from '../reminder/reminder.component';
import { MatDialog } from '@angular/material/dialog';


 
@Component({
  selector: 'app-studish-dashboard',
  templateUrl: './studish-dashboard.component.html',
  styleUrls: ['./studish-dashboard.component.css'],
  encapsulation: ViewEncapsulation.ShadowDom  
})

export class StudishDashboardComponent implements OnInit{
openDialog3() {
  const dialogRef = this.dialog.open(ReminderComponent, {
    width: '600px', // Adjust the width as needed
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
  });
}
  constructor(private MydataService:MydataService,public dialog: MatDialog){ }
  signeduser!:any;
  courses :any []=[]
  four : any[]=[]
  reminders: any[]=[]
  pq :any;
  ngOnInit(): void {


    this.signeduser = localStorage.getItem("currentUser");
    this.signeduser = JSON.parse(this.signeduser);
    console.log(this.signeduser)
    this.MydataService.sc(this.signeduser.user_id).subscribe(
      (data: any[]) => {
          this.courses = data;
          this.four=this.courses.slice(0, 4);
          console.log(this.courses);
          console.log(this.four);
      },
      (error: any) => {
          console.error('Error fetching users:', error);
      }
  );  
  this.MydataService.reminders(this.signeduser.user_id).subscribe(
    (data) => {
    this.reminders=data;
    console.log(this.reminders);
  
    },
    (error) => {
      console.error('Error remind:', error);
    }
  
  
  );


  this.MydataService.passedQuizzes(this.signeduser.user_id).subscribe(
    (data) => {
    this.pq=data;
  
    },
    (error) => {
      console.error('Error :', error);
    }
  
  
  );
  }

CoursesCompleted():number{
let cc=0;
for (const course of this.courses) {
  if (course.pourcentage === 100) {
cc++;
}
}

return cc;

}
CoursesInProgress():number{
  let cc=0;
  for (const course of this.courses) {
    if (course.pourcentage <100) {
  cc++;
  }
  }
  
  return cc;
  
  }



}