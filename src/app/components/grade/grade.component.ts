import { Component, OnInit,Inject } from '@angular/core';
import { MAT_DIALOG_DATA,MatDialogRef } from '@angular/material/dialog'
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-grade',
  templateUrl: './grade.component.html',
  styleUrls: ['./grade.component.css']
})
export class GradeComponent implements OnInit {
  user!:any;
  myform: FormGroup;
  inputData: any;

  New_grade: any = {
    grade: null,
    feedback: "",
    student: null , 
    assignment: null
  };

  ngOnInit(): void {}
  constructor(@Inject(MAT_DIALOG_DATA) public data:any,private MydataService: MydataService) { 
    this.inputData=this.data;

    this.myform = new FormGroup({
      grade: new FormControl(''),
      feedback: new FormControl('')
    });
  }

  GradeStudent(){
    this.New_grade.student = {};
    this.New_grade.assignment = {};
    this.New_grade.grade = {};
    this.New_grade.grade = this.myform.value['grade'];
    this.New_grade.feedback = this.myform.value['feedback']; 
    this.New_grade.student = this.inputData.studentid;
    this.New_grade.assignment = this.inputData.assignmentid;
    this.MydataService.GradeStudentAssignment(this.New_grade).subscribe();
  }



}
