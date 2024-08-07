import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialComponent } from './components/material/material.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { PdfViewerComponent } from './components/pdf-viewer/pdf-viewer.component';
import { UploadpdfComponent } from './components/uploadpdf/uploadpdf.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifSetupComponent } from './components/verif-setup/verif-setup.component';
import { AddLessonComponent } from './components/add-lesoon/add-lesoon.component';
import { LessonsMateialsComponent } from './lessons-materials/lessons-materials.component';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { CommsComponent } from './comms/comms.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { CoursePlayerComponent } from './course-player/course-player.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { QuizComponent } from './quiz/quiz.component';
import { QuizContentComponent } from './quiz-content/quiz-content.component';
import { QuizDisplayComponent } from './quiz-display/quiz-display.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { ViewSubmissionsComponent } from './view-submissions/view-submissions.component';
import { CertificationComponent } from './certification/certification.component';
import { FormateurDashboardComponent } from './formateur-dashboard/formateur-dashboard.component';
import { StudishDashboardComponent } from './studish-dashboard/studish-dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { GenerateCourseComponent } from './generate-course/generate-course.component';
import { UsergradesComponent } from './usergrades/usergrades.component';
import { ListeCertifComponent } from './liste-certif/liste-certif.component';
import { VoidComponent } from './void/void.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'users/:param', component: UsersListComponent },
    { path: 'setup', component: VerifSetupComponent },
    { path: 'add-course', component: AddCourseComponent },
    { path: 'courses/:type', component: CoursesComponent },
    { path: 'courses', component: CoursesComponent },
    { path: 'lesoon', component: LessonsMateialsComponent },
    { path: 'noti', component: AddNotificationComponent },
    { path: 'comms', component: CommsComponent },
    { path: 'stat', component: StatisticsComponent },
    { path: 'quiz', component: QuizComponent },
    { path: 'quizC', component: QuizContentComponent },
    { path: 'quizD', component: QuizDisplayComponent},
    { path: 'ass', component: ViewSubmissionsComponent},
    { path: 'assignment', component: AssignmentComponent },
    { path: 'sub', component: SubmissionsComponent },
    { path: 'statF', component: FormateurDashboardComponent },
    { path: 'statS', component: StudishDashboardComponent},
    { path: 'progress', component: ProgressComponent},
    { path: 'geng', component: GenerateCourseComponent},
    { path: 'grades', component: UsergradesComponent},
    { path: 'certif', component: ListeCertifComponent}
  ] },
  { path: 'submissions', component: CoursePlayerComponent,children:[
    { path: 'Do', component: DoQuizComponent},
    { path: 'sub', component: SubmissionsComponent }
  ] },
  {path: 'chatbot', component: ChatbotComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'resme', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload', component: UploadpdfComponent },
  { path: 'pfd', component: PdfViewerComponent },
  {
    path:'confirm-email/:username', component: ConfirmEmailComponent
  },
  { path: 'void', component: VoidComponent },
  { path: 'material', component: MaterialComponent },
  { path: 'certificate', component: CertificationComponent },
   { path: 'add-course', component: AddCourseComponent },
  { path: 'add-lesson', component: AddLessonComponent },
  { path: '**', redirectTo: '/login' }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
{ path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
