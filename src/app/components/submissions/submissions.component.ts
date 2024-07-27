import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MydataService } from 'src/app/services/mydata.service';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { GradeComponent } from '../grade/grade.component';
import { FormControl, FormGroup } from '@angular/forms';


interface UploadResponse {
  public_link: string;
}
@Component({
  selector: 'app-submissions',
  templateUrl: './submissions.component.html',
  styleUrls: ['./submissions.component.css']
})
export class SubmissionsComponent implements OnInit{
  myData$: Observable<any> | undefined;
  user!:any;
  idassignment:any;
  myform1: FormGroup;
  uploadedFileName: string = ''; 
  file!: File;
  assign: any[]=[];
  courseId: any;
  onFileSelected(event: any) {
    this.file = event.target.files[0]; 
    this.uploadedFileName = this.file.name; 
  }
  errorMessage:any;
  uploadedLink:any;
  addSubmission(){
    const formData = new FormData();
    formData.append('file', this.file);
    this.MydataService.uploadFile(formData).subscribe(
      (response: UploadResponse) => {
        console.log('Public link:', response.public_link);
        this.uploadedLink = response.public_link;
        const formData1 = new FormData();
        formData1.append('studentname',  this.user.full_name);
        formData1.append('submission_content',  this.uploadedLink);
        formData1.append('student', this.user.user_id);
        formData1.append('assignment', this.idassignment);
        
        this.MydataService.addSubmission(formData1).subscribe();




      },
      (error) => {
        // Handle upload errors and set the error message
        this.errorMessage = 'Error uploading file. Please try again.';
        console.error(this.errorMessage, error);
      }
    );



  

  }
  constructor(private MydataService:MydataService,private matDialog:MatDialog, private route: ActivatedRoute){this.myform1 = new FormGroup({
    title: new FormControl(''),
    description: new FormControl(''),

  }) }
  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);

    this.route.queryParams.subscribe(params => {
      this.idassignment = params['assignmentid'];
      this.courseId = params['CourseId'];
      });

    this.myData$ = this.MydataService.getSubmissionAssignmentsByStudents(this.idassignment);
    this.MydataService.AssignmentsbyCourse(this.courseId).subscribe((data: any[]) => {
      this.assign = data;
      console.log("asss",this.assign,this.idassignment)
    },
    (error: any) => {
      console.error('Error fetching quiz:', error);
    });
  }

  opendialog(studentid:number,assignmentid:number){
    
    this.matDialog.open(GradeComponent,{
      width:'350px',
      data:{
        studentid,
        assignmentid
      }
    })

  }
  

}