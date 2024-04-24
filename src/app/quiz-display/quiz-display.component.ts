import { Component } from '@angular/core';
import { MydataService } from '../services/mydata.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})
export class QuizDisplayComponent {


  quizData:any;
  userChoices: any[] = [];
  quizID: any;
  lessonID: any;
  courseID: any;
  update:boolean=false;
  currentQuestionIndex = 0;
  constructor(private MydataService:MydataService,private route: ActivatedRoute,private router: Router){

  }    
  questionContent:string='';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {  
      this.quizID= params['quizID'];
      this.lessonID= params['lessonID'];
      this.courseID= params['CourseId'];
    });
    this.MydataService.QuizById(this.quizID).subscribe(
      (data: any) => {
        this.quizData = data;
        console.log(this.quizData);
        this.questionToUpdate=this.quizData.questions[this.currentQuestionIndex];
        this.questionContent=this.quizData.questions[this.currentQuestionIndex].content;
        console.log(this.questionToUpdate);
      },
      (error: any) => {
        console.error('Error :', error);
      }
    );

  }

  questionToUpdate :any;
  loading = false;


Mod(){
  this.update=true;
}
back(){
  this.update=false;
}
backC(){
  this.router.navigateByUrl('/dashboard/lesoon?CourseId='+this.courseID+'');
}
  loadQuestion(index: number) {
    // Load question logic here
  }
  onPrevClick() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.questionToUpdate = this.quizData.questions[this.currentQuestionIndex];
      console.log(this.questionToUpdate);
      console.log(this.quizData);
      this.loadQuestion(this.currentQuestionIndex);
    }
  }
  
  onNextClick() {
    if (this.currentQuestionIndex < this.quizData.questions.length - 1) {
      this.currentQuestionIndex++;
      this.questionToUpdate = this.quizData.questions[this.currentQuestionIndex];
      console.log(this.questionToUpdate);
      console.log(this.quizData);
    }
  }
  
  updateQC(id:number){

    let cont=this.questionToUpdate.content
   if(this.questionContent!==''){
     cont=this.questionContent;
   }

   let   qq={'content':cont,
             'choices' :this.questionToUpdate.choices};
 this.MydataService.updateQuestionChoices(id,qq).subscribe();

  }

deleteQ(id:any){
 this.MydataService.deleteQuestion(id).subscribe(()=>
  {
console.log("Question deleted");
  }
 )
 this.quizData.questions.splice(this.currentQuestionIndex, 1);
}




}