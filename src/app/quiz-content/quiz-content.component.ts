
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MydataService } from 'src/app/services/mydata.service';
import { timer } from 'rxjs';
import { concatMap } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { ElementRef, Renderer2 } from '@angular/core';

interface Answer {
  text: string;
  correct: boolean;
  letter: string;
}
interface Question {
  question: string;
  answers: Answer[];
}
@Component({
  selector: 'app-quiz-content',
  templateUrl: './quiz-content.component.html',
  styleUrls: ['./quiz-content.component.css']
})
export class QuizContentComponent implements OnInit {
  showMessage: boolean = false;
  i = 0;
  j = 0;
  part1: Question[] = [];
  part2: Question[] = [];
  generated_data: Question[][] = [];
  currentPartIndex = 0;
  currentQuestionIndex = 0;
  currentQuestion: Question | null = null;
  disableNextButton: boolean=false;
  materials: any;
  myform: FormGroup;
  driveId: string | null = null; 

  constructor(private MydataService: MydataService, private route: ActivatedRoute,private renderer: Renderer2, private el: ElementRef,private router: Router) {
    this.myform = new FormGroup({
      content: new FormControl(''),
      explanation: new FormControl(''),
      choice1: new FormControl(''),
      choice2: new FormControl(''),
      choice3: new FormControl(''),
      choice4: new FormControl(''),
      choice0: new FormControl('')
    });

  
  }
  choix : any []=[  { checked: false }, { checked: false }, { checked: false }, { checked: false } ,{ checked: false }];
  choices  : any []=[];
  random_order = { checked: false }; 
  questId!: number;
   courseId :any;
   lessonId :any;
   quizID : any;
   lesson: any ;
   loading: boolean = false;

  ngOnInit(): void {
    setInterval(() => {
      this.showMessage = true;
      setTimeout(() => {
        this.showMessage = false;
      }, 5000); // Show the message for 2 seconds
    }, 10000); // Repeat every 10 seconds
  
    this.route.queryParams.subscribe(params => {
      this.courseId = params['courseId'];
      this.lessonId = params['lessonId'];
      this.quizID= params['quizID'];
    });
    this.MydataService.getMaxidQuest().subscribe(
      (data: number) => {
      
        this.questId=data; 
        this.questId++;
         console.log(this.questId);

      },
      (error) => {
        console.error('Error:', error);
      }
    );

    

  }
  getInputWidth(content: string): string {
    // Calculate the width based on the length of the content
    const width = content.length * 10 + 'px'; // Adjust multiplier according to your preference
  
    // Apply the width to the input field
    this.renderer.setStyle(this.el.nativeElement, 'width', width);
  
    // Return the width
    return width;
  }
  extractDriveId(link: string): string | null {
    const match = link.match(/(?:https?:\/\/)?drive.google.com\/(?:file\/d\/|open\?id=)([\w-]+)/);
    return match ? match[1] : null;
  }
  handleClick(link: string): void {
    this.loading = true; // Set loading state to true
    this.driveId = this.extractDriveId(link);
    console.log('Drive ID:', this.driveId); // You can remove this line; used for testing
    this.GenQuiz(this.driveId); // No need for .then() if GenQuiz doesn't return a Promise
}
  getMaterialIcon(materialType: string): string {
    const materialTypeLowerCase = materialType.toLowerCase();
  
    switch (materialTypeLowerCase) {
      case 'pdf':
        return 'picture_as_pdf';
        case 'pptx':
          return 'slideshow';
      case 'video':
        return 'video_library';
      case 'image':
        return 'image';
      case 'youtube':
        return 'video_library';
        case 'video':
          return 'video_library';
      case 'quiz':
        return 'live_help';
      case 'exercise':
        return 'fitness_center';
      case 'docx':
        return 'description';
      default:
        return 'description'; // Default icon for unknown types
    }
  }

  getmaterials() {
      this.MydataService.getCourseMaterial(this.lessonId).subscribe(
        (data: any[]) => {
          console.log('Received data for lesson',this.lessonId, ':', data);
          this.materials = data;        
        },
        (error: any) => {
          console.error('Error fetching materials for lesson', this.lesson.id, ':', error);
        }
      );
    
    console.log('Finished getmaterials.');
  }
  openMaterialModallesson(): void {
    this.driveId=null;
    const modal = document.getElementById('materialModal');
    if (modal) {
      modal.style.display = 'block';
    }
  }
  closeMaterialModal(): void {   
    const modal = document.getElementById('materialModal');  
    if (modal) {
      modal.style.display = 'none';
    }
  }
  backC(){
    this.router.navigateByUrl('/dashboard/quizD?quizID='+this.quizID+'&CourseId='+this.courseId+'');
  }
  

  back() {
    this.currentQuestionIndex--;

    if (this.currentQuestionIndex < 0) {
      this.currentPartIndex--;
      if (this.currentPartIndex >= 0) {
        this.currentQuestionIndex = this.generated_data[this.currentPartIndex].length - 1;
      } else {
        this.currentPartIndex = 0;
        this.currentQuestionIndex = 0;
      }
      this.disableNextButton = false;
    }

    if (this.generated_data[this.currentPartIndex] && this.generated_data[this.currentPartIndex][this.currentQuestionIndex]) {
      this.currentQuestion = this.generated_data[this.currentPartIndex][this.currentQuestionIndex];
    }
  }
  next() {
    this.currentQuestionIndex++;
  
    if (this.currentQuestionIndex >= this.generated_data[this.currentPartIndex].length) {
      this.currentPartIndex++;
      this.currentQuestionIndex = 0;
    }
  
    if (this.generated_data[this.currentPartIndex] && 
        this.generated_data[this.currentPartIndex][this.currentQuestionIndex]) {
      this.currentQuestion = this.generated_data[this.currentPartIndex][this.currentQuestionIndex];
    } else {
      // Disable the "Next" button when there are no more questions
      this.disableNextButton = true;
    }
  }
  

  updateQuestion(partIndex: number, questionIndex: number, event: any) {
    const newValue = event.target.value;
    this.generated_data[partIndex][questionIndex].question = newValue;
    // Update the respective part's array as well
    if (partIndex === 0) {
      this.part1[questionIndex].question = newValue;
    } else if (partIndex === 1) {
      this.part2[questionIndex].question = newValue;
    }
  }



  GenQuiz(id: any) {
    this.loading = true; // Set loading state to true before making the request
    this.MydataService.generateQuiz(id).subscribe(
      (data: string[][]) => {
        this.parseBackendData(data);
        console.log(this.generated_data);
  
        if (Array.isArray(this.generated_data[0])) {
          this.part1 = this.generated_data[0];
        }
        if (Array.isArray(this.generated_data[1])) {
          this.part2 = this.generated_data[1];
        }
  
        this.i = 0;
        this.j = 0;
  
        console.log(this.generated_data);
       
        this.loading = false; 
      },
      (error) => {
        console.error('Error :', error);
        this.loading = false; // Set loading state to false in case of error

      }
     
    );
  
  
  }
  

  updateAnswer(partIndex: number, questionIndex: number, answerIndex: number, event: any) {
    const inputElement = event.target;
    const newValue = inputElement.value;
  
    // Update the value of the answer
    this.generated_data[partIndex][questionIndex].answers[answerIndex].text = newValue;
  
    // Get the letter of the current answer
    const currentLetter = this.generated_data[partIndex][questionIndex].answers[answerIndex].letter;
  
    // Check if the current answer matches the correct answer for the question
    const isCorrect = newValue === this.generated_data[partIndex][questionIndex].answers.find(answer => answer.correct)?.text;
  
    // Update the correct property of the answer based on whether it's correct or not
    this.generated_data[partIndex][questionIndex].answers[answerIndex].correct = isCorrect;
  
    // Update ngClass based on whether the answer is correct or not
    inputElement.classList.toggle('correct-answer', isCorrect);
  }
  
  parseBackendData(data: string[][]) {
    
    this.generated_data = data.map(part => {
      return part.map(item => {
        const questionData = item.split('\n');
        const question: Question = {
          question: questionData[0],
          answers: []
        };
        let correctAnswerText: string | null = null;
    
        for (let i = 1; i < questionData.length; i++) {
          const correctAnswerMatch = questionData[i].match(/^Correct Answer:\s*(.*)$/);
          if (correctAnswerMatch) {
            correctAnswerText = correctAnswerMatch[1].trim();
            console.log('Correct Answer Text:', correctAnswerText);
            // Extract correct answer letter
            const correctAnswerLetterMatch = correctAnswerText.match(/^([A-Za-z])/);
            if (correctAnswerLetterMatch) {
              const correctLetter = correctAnswerLetterMatch[1].toUpperCase(); // Ensure the letter is in uppercase
              for (const answer of question.answers) {
                if (answer.letter === correctLetter) {
                  answer.correct = true;
                }
              }
            }
          } else {
            const answerText = questionData[i].substring(3).split(":")[0].trim();
            const answerLetter = questionData[i][0];
            console.log('Answer:', answerText, 'Letter:', answerLetter);
            const answer: Answer = {
              text: answerText,
              correct: false,
              letter: answerLetter
            };
            question.answers.push(answer);
          }
        }
        return question;
      });
    });
  }
  addAIQuiz(questionContent: any) {
    this.choices = [];
      for (let answer of questionContent.answers) {
          const choice = {
              'question': this.questId,
              'choice': answer.text,
              'correct': answer.correct
          }
          this.choices.push(choice);
      }

    const question = {
      'quiz': this.quizID,
      'content': questionContent.question,    
    }
  
    // Add question and choices
    this.MydataService.addQuestion(question).pipe(
      concatMap(() => timer(1000))
    ).subscribe(() => {
      this.MydataService.addChoices(this.choices).subscribe();
      console.log('Question added successfully');
    });
  console.log("data",question);
    this.questId++;
  }
  
  

   

addQ() {
  this.choices = [];

  for (let i = 0; i < 5; i++) {
  let   index='choice'+i;

  console.log(index );
    const choice={
        'question':this.questId,
        'choice':this.myform.value[index],
        'correct':this.choix[i].checked

    }
    if(this.myform.value[index]!='')
     this.choices.push(choice);
  }

console.log( this.choices);

console.log( this.choices);

console.log( this.myform.value['content']);

const question ={
  'quiz':this.quizID,
  'content':this.myform.value['content'],
}



this.MydataService.addQuestion(question).subscribe((data) => {

  console.log('Received data:', data);

  this.choices.forEach(choice => {
    choice.question = data.id; 
});

    this.MydataService.addChoices(this.choices).subscribe();
});


 console.log("data",question);
this.questId++;

}
  
  
  
  }
  
  
  
  
  
  


