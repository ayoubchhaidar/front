import { Component } from '@angular/core';
import { MydataService } from '../services/mydata.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-quiz-display',
  templateUrl: './quiz-display.component.html',
  styleUrls: ['./quiz-display.component.css']
})
export class QuizDisplayComponent {

  user: any;
  quizData:any;
  userChoices: any[] = [];
  quizID: any;
  lessonID: any;
  courseID: any;
  update:boolean=false;
  currentQuestionIndex = 0;
  showInfo: any;
  showInfoQ: any;
constructor(private MydataService:MydataService,private route: ActivatedRoute,private router: Router,private dialog: MatDialog){ }    
  questionContent:string='';

 
  ngOnInit(): void {
    this.user = localStorage.getItem("currentUser");
      this.user = JSON.parse(this.user);
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
   
  onPrevClick() {
    if (this.currentQuestionIndex > 0) {
      this.currentQuestionIndex--;
      this.questionToUpdate = this.quizData.questions[this.currentQuestionIndex];
      console.log(this.questionToUpdate);
      console.log(this.quizData);
     
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

    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: { message: 'Êtes-vous sûre de vouloir mettre à jour cette question ?' }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
       
        let cont=this.questionToUpdate.content
   if(this.questionContent!==''){
     cont=this.questionContent;
   }

   let   qq={'content':cont,
             'choices' :this.questionToUpdate.choices};
 this.MydataService.updateQuestionChoices(id,qq).subscribe();
        
      }
      else{
       this.ngOnInit();
      }
      });
   

  }

deleteQ(id:any){
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: { message: 'Êtes-vous sûre de vouloir supprimer cette question ?' }
  });
  dialogRef.afterClosed().subscribe(result => {
    if (result) {
      this.MydataService.deleteQuestion(id).subscribe(()=>
        {
      console.log("Question deleted");
        }
       )
       this.quizData.questions.splice(this.currentQuestionIndex, 1);
    }
  });
 
}




}