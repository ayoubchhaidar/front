import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GradeComponent } from '../grade/grade.component';



@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit{
  myData$: Observable<any> | undefined;
  user!:any;
  idassignment:any;


  constructor(private MydataService:MydataService,private matDialog:MatDialog, private route: ActivatedRoute){ }
  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);

    this.route.queryParams.subscribe(params => {
      this.idassignment = params['assignmentid'];
      });

    this.myData$ = this.MydataService.getSubmissionAssignmentsByStudents(this.idassignment);
  }

  opendialog(studentid:number,assignmentid:number){
    
    this.matDialog.open(GradeComponent,{
      width:'350px',
      data:{
        studentid,
        assignmentid
      }
    })
    // this.myDataService.getProduct(id);
  }
  

}
