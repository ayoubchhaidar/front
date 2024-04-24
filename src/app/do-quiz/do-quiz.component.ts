import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MydataService } from 'src/app/services/mydata.service';

@Component({
  selector: 'app-do-quiz',
  templateUrl: './do-quiz.component.html',
  styleUrls: ['./do-quiz.component.css']
})
export class DoQuizComponent implements OnInit {

  quizData: any;
  userChoices: any[] = [];
  loading = false;
  currentQuestionIndex = 0;
  timer: number = 30;
  quizStarted = false;
  quizFinished: boolean = false;
  timerInterval: any;
  quizId: any;

  constructor(private MydataService: MydataService, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.quizId = params['quizID'];
      this.loadQuizData();
    });
    this.quizFinished = false;
    this.quizStarted = false;
    this.userChoices = [];
    this.loading = false;
    this.currentQuestionIndex = 0;
  }

  loadQuizData() {
    this.MydataService.QuizById(this.quizId).subscribe(
      (data: any) => {
        this.quizData = data;
        console.log(this.quizData);
        this.loadQuestion(0); // Load the first question when data is retrieved
      },
      (error: any) => {
        console.error('Error:', error);
      }
    );
  }

  startQuiz() {
    this.quizStarted = true;
    this.startTimer();
  }

  loadQuestion(index: number) {
    this.currentQuestionIndex = index;
    this.timer = 30; // Reset the timer for each new question
  }

  startTimer() {
    this.timerInterval = setInterval(() => {
      if (this.timer > 0) {
        this.timer--;
      } else {
        clearInterval(this.timerInterval); // Stop the timer when it reaches 0
        this.onNextClick(); // Automatically move to the next question
      }
    }, 1000); // Update the timer every second
  }

  onNextClick() {
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.quizData.questions.length) {
      this.loadQuestion(this.currentQuestionIndex);
    } else {
      let score = 0;
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        score = this.calculateScore();
        clearInterval(this.timerInterval);
      }, 2000);
      // Additional logic for quiz completion
    }
  }

  onChoiceClick(choice: string, clickedElement: EventTarget | null) {
    if (!this.userChoices[this.currentQuestionIndex]) {
      this.userChoices[this.currentQuestionIndex] = [];
    }

    const selectedChoices = this.userChoices[this.currentQuestionIndex];
    const choiceIndexInArray = selectedChoices.indexOf(choice);

    // Toggle the choice selection: if it's already selected, remove it; otherwise, add it
    if (choiceIndexInArray === -1) {
      selectedChoices.push(choice);
      if (clickedElement instanceof HTMLElement) {
        // Remove 'selected' class from previously selected items
        const selectedItems = document.querySelectorAll('.quiz-options li.selected');

        // Add 'selected' class to the clicked choice
        clickedElement.classList.add('selected');
      }
    } else {
      selectedChoices.splice(choiceIndexInArray, 1);
      if (clickedElement instanceof HTMLElement) {
        // Remove 'selected' class from previously selected items
        clickedElement.classList.toggle('selected');
      }
    }

    console.log('User choices for question', this.currentQuestionIndex + 1, ':', selectedChoices);

    this.userChoices[this.currentQuestionIndex] = selectedChoices;
    console.log(this.userChoices);
  }

  calculateScore(): number {
    this.quizFinished = true;

    let totalQuestions = 0;
    let correctQuestions = 0;

    // Iterate through each question
    this.quizData.questions.forEach((question: { choices: any[]; }) => {
      const correctChoices = question.choices.filter(choice => choice.correct);

      // Check if the user's choices for this question match the correct choices
      const userChoicesForQuestion = this.userChoices[totalQuestions] || [];
      const userCorrect = userChoicesForQuestion.every((choice: any) =>
        correctChoices.some(correct => correct.choice === choice)
      );

      if (userCorrect && userChoicesForQuestion.length === correctChoices.length) {
        correctQuestions++; // Increment correct questions counter
      }

      totalQuestions++; // Increment total questions counter
    });
   
    // Calculate the percentage score based on correct questions and total questions
    const percentageScore = (correctQuestions / totalQuestions) * 100;
    // alert('Quiz completed! Score: ' + percentageScore + '%');

    return correctQuestions;
  }

  toggleActiveLabel(event: MouseEvent) {
    const target = event.target as HTMLElement;
    target.classList.toggle('active');
  }
}
