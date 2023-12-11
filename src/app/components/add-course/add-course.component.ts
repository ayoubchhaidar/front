import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MydataService } from 'src/app/services/mydata.service';


@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit{
  myform: FormGroup;
  New_Course: any = {
    // tutor: {
    //   password: "123",
    //   username: "",
    //   first_name: "",
    //   last_name: "",
    //   email: "",
    //   is_active: false,
    //   is_superuser: false,
    //   is_staff: false, 
    //   date_joined: null,
    //   last_login: null,
    //   groups: [],
    //   user_permissions: []
    // },
    title: "",
    description: "",
    enrollment_capacity: null , 
    tutor: null
  };
  user:any;

  constructor(private MydataService:MydataService) {
    this.myform = new FormGroup({
      title: new FormControl(''),
      desc: new FormControl(''),
      capacity: new FormControl('')
    });

    
  }

  

  ngOnInit(): void {
    debugger;

    this.user = localStorage.getItem("currentUser");
    this.user = JSON.parse(this.user);
  }

  addCourse() {
    // this.New_Course.tutor.user_id = this.user.user_id;
    // this.New_Course.tutor.username = this.user.username;
    // this.New_Course.tutor.first_name = this.user.first_name;
    // this.New_Course.tutor.last_name = this.user.last_name;
    // this.New_Course.tutor.email = this.user.email;
    // this.New_Course.tutor.is_active = this.user.is_active;
    // this.New_Course.tutor.is_superuser = this.user.is_superuser;
    // this.New_Course.tutor.is_staff = this.user.is_staff;
    this.New_Course.tutor = {};
    this.New_Course.title = this.myform.value['title'];
    this.New_Course.description = this.myform.value['desc']; // Changed from desc to description
    this.New_Course.enrollment_capacity = this.myform.value['capacity'];
    this.New_Course.tutor = this.New_Course.tutor.user_id = this.user.user_id;
    
    console.log(this.New_Course);
    this.MydataService.addCourses(this.New_Course).subscribe();
  }

}
