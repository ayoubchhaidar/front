import { Component, OnInit } from '@angular/core';
import { MydataService } from 'src/app/services/mydata.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-lesoon',
  templateUrl: './add-lesoon.component.html',
  styleUrls: ['./add-lesoon.component.css']
})
export class AddLessonComponent implements OnInit {

  myform: FormGroup;
  CourseId:any;
  ngOnInit(): void {


    this.route.queryParams.subscribe(params => {
      this.CourseId = params['CourseId'];
      });

  }
  constructor(private MydataService:MydataService,private route: ActivatedRoute) {
    this.myform = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      course: new FormControl('')
    });}

addLesson() {

  const formData = new FormData();
  formData.append('title',this.myform.value['title'] );
  formData.append('description',this.myform.value['description'] );
  formData.append('course','1');

  this.MydataService.addLesson(formData).subscribe();


}

}
