
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MydataService } from 'src/app/services/mydata.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{
  selectedFile!: File;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
  }
  myform: FormGroup;
  New_Course: any = {
    title: "",
    description: "",
    enrollment_capacity: null , 
    tutor: null,
    image: null

  };
  user:any;
  
  constructor(private MydataService:MydataService ,private formBuilder: FormBuilder) {
    this.myform = new FormGroup({
      title: new FormControl(''),
      desc: new FormControl(''),
      capacity: new FormControl('')
    });
    this.myform = this.formBuilder.group({
      title: ['', Validators.required],
      desc: ['', Validators.required],
      capacity: ['', Validators.required]
    });

    
  }

  

  ngOnInit(): void {
    debugger;

    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
  }

  addCourse() {
   this.New_Course.tutor = {};
    this.New_Course.title = this.myform.value['title'];
    this.New_Course.description = this.myform.value['desc']; // Changed from desc to description
    this.New_Course.enrollment_capacity = this.myform.value['capacity'];
    this.New_Course.tutor = this.New_Course.tutor.user_id = this.user.user_id;
    this.New_Course.image = this.selectedFile;
    console.log(this.New_Course);
    this.MydataService.addCourses(this.New_Course.title,this.New_Course.description,this.New_Course.enrollment_capacity,this.New_Course.tutor,this.New_Course.image).subscribe();
  }

}










