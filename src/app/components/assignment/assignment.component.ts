import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { GradeComponent } from '../grade/grade.component';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-assignment',
  templateUrl: './assignment.component.html',
  styleUrls: ['./assignment.component.css']
})
export class AssignmentComponent implements OnInit {
  myform1: FormGroup;
  courseId: any;



addass() {
  const formData = new FormData();
  formData.append('tutor',this.user.user_id );
  formData.append('title',this.myform1.value['title'] );
  const dateValue =this.myform1.value['date'] ;
  const formattedDate = moment(dateValue).format('YYYY-MM-DDTHH:mm');
  formData.append('due_date',formattedDate);
  formData.append('description',this.myform1.value['description']);
  formData.append('lesson',this.lessonId);

  
  this.MydataService.addAssignment(formData).subscribe();

}
  myData$: Observable<any> | undefined;
  user!:any;
  lessonId: any;


  constructor(private MydataService:MydataService,private matDialog:MatDialog, private route: ActivatedRoute,private router: Router){ 
    this.myform1 = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),
    category: new FormControl(''),
    pass_mark: new FormControl(''),
    textareaContent: new FormControl('') 
  }); }

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.route.queryParams.subscribe(params => {
       this.lessonId = params['lessonId'];
       this.courseId = params['courseId'];
     });
  }

  backC(){
    this.router.navigateByUrl('/dashboard/lesoon?CourseId='+this.courseId+'');
  }
}








