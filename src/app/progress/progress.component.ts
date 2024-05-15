import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import {MatProgressSpinnerModule, ProgressSpinnerMode} from '@angular/material/progress-spinner';
import { ActivatedRoute } from '@angular/router';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: ['./progress.component.css']
})
export class ProgressComponent implements OnInit {
  courseId: any;
 
  constructor(private MydataService:MydataService, private route: ActivatedRoute) { }
 users :any []=[]
  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.MydataService.progress(this.courseId)
    .subscribe(

      (response: any) => {
           this.users=response
           console.log(response);
          
          },
          (error: any) => {
            console.error('Error material:', error);
          }



    );
    });
   
  }



  @Input()
  color: ThemePalette
  

  
  @Input()
  diameter!: number;
  

  
  @Input()
  mode: ProgressSpinnerMode = "determinate";
  

  @Input()
  strokeWidth!: number;

  @Input()
  value!: number;



}
