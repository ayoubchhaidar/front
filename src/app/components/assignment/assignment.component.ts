import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { GradeComponent } from '../grade/grade.component';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  myData$: Observable<any> | undefined;
  user!:any;


  constructor(private MydataService:MydataService,private matDialog:MatDialog){ }
  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.myData$ = this.MydataService.getTutorAssignments(this.user.user_id);
  }

  opendialog(){
    
    this.matDialog.open(GradeComponent,{
      width:'1200px',
      data:{
        // nom,
        // prix,
        // qts,
        // id,
        // image
      }
    })
    // this.myDataService.getProduct(id);
  }

}
