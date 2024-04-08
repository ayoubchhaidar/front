import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MydataService } from 'src/app/services/mydata.service';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {


  myform1: FormGroup;
  constructor(private MydataService: MydataService, private route: ActivatedRoute) {
    this.myform1 = new FormGroup({
      title: new FormControl(''),
      description: new FormControl(''),
      category: new FormControl(''),
      pass_mark: new FormControl(''),
      textareaContent: new FormControl('') 
    });
  }
  choix : any []=[  { checked: false }, { checked: false }, { checked: false }, { checked: false } ,{ checked: false }];
  choices  : any []=[];
  random_order = { checked: false }; 
  courseId: any;
  lessonId: any;
  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {
     this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
     
      // Now you can use courseId and lessonId to perform your logic for adding evaluation
    });




  }




    addquiz() {
      const formData = new FormData();
          formData.append('title', this.myform1.value['title'],);
          formData.append('description', this.myform1.value['description']);
          formData.append('category', this.myform1.value['category']);
          formData.append('random_order', String(this.random_order.checked));
          formData.append('pass_mark', this.myform1.value['pass_mark']);
          formData.append('course', this.courseId);
          formData.append('lesson', this.lessonId);
      this.MydataService.addQuiz(formData).subscribe();
      
        
      }
      quizes: any []=[];
      getQuizByCourse(){
      
      this.MydataService.getQuizByCourse(1).subscribe((data: any[]) => {
        this.quizes = data;
        console.log( this.quizes)
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      });
      
      
      
      
      
      }
  

 
  
  
  
  }
  
  
  
  
  
  

