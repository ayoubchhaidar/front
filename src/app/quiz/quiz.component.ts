import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MydataService } from 'src/app/services/mydata.service';
import { ActivatedRoute, Router } from '@angular/router';

interface Quiz {
  id: number;
  title: string;
  description: string;
  category: string;
  random_order: boolean;
  pass_mark: number;
  lesson: number;
  timestamp: string; // Assuming this is a string representation of date and time
}

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {

  
  myform1: FormGroup;
  constructor(private MydataService: MydataService, private route: ActivatedRoute,private router: Router) {
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
    });
  }
quiz: Quiz | undefined ;
addquiz() {
  const formData = new FormData();
  formData.append('title', this.myform1.value['title']);
  formData.append('description', this.myform1.value['description']);
  formData.append('category', this.myform1.value['category']);
  formData.append('random_order', String(this.random_order.checked));
  formData.append('pass_mark', this.myform1.value['pass_mark']);
  formData.append('lesson', this.lessonId);

  this.MydataService.addQuiz(formData).subscribe((data: Quiz) => {
    this.quiz = data;
    console.log('quiz', this.quiz.id);
    this.router.navigate(['/dashboard/quizC'], { queryParams: { quizID: this.quiz.id  ,courseId: this.courseId, lessonId: this.lessonId} });
  });
}
backC(){
  this.router.navigateByUrl('/dashboard/lesoon?CourseId='+this.courseId+'');
}
  }
  

  
  
  

