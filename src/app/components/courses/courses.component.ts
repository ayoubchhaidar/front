import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
// Import statements in your component file
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {
  
  myData$: Observable<any> | undefined;
  myData2$: Observable<any> | undefined;
  myform: FormGroup | undefined;
  user!:any;
  api_url: string = 'http://127.0.0.1:8000/';
    New_enrollement: any = {
      student: null , 
      course: null,
      enrollment_date: new Date().toISOString().split('T')[0],  // Set to the current date
    };

  constructor(private MydataService:MydataService){ }
 

  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
    this.myData$ = this.MydataService.getTutorCourses(this.user.user_id);
    this.myData2$ = this.MydataService.getCourses();
  }


//  getCourses(){
//   const courses: any[] = [];
//   this.MydataService.getTutorCourses(1).subscribe((data)=>{
//     for (let i=0;i<data.length;i++){
//         courses.push(data[i]);
//     }
//     });
//     return courses;
//  }

enrollInClass(courseid:number ){
  this.New_enrollement.student={};
  this.New_enrollement.course={};
  this.New_enrollement.student = this.user.user_id;
  this.New_enrollement.course = courseid ;
  console.log(this.New_enrollement);
  this.MydataService.StudentEnrollment(this.New_enrollement).subscribe();
}

  delete_course(id: number){
    this.MydataService.deleteCourse(id).subscribe();
  }

  
}
