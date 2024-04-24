import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderComponent } from './components/header/header.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialComponent } from './components/material/material.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GradeComponent } from './components/grade/grade.component';
import { MatButtonModule } from '@angular/material/button' ;
import { MatIconModule } from '@angular/material/icon' ;
import { MatFormFieldModule } from '@angular/material/form-field' ;
import { MatInputModule} from '@angular/material/input' ;
import { MatDialogModule} from '@angular/material/dialog';
import { SubmissionsComponent } from './components/submissions/submissions.component';
import { UploadpdfComponent } from './components/uploadpdf/uploadpdf.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { VerifSetupComponent } from './components/verif-setup/verif-setup.component';
import { LessonsMateialsComponent } from './lessons-materials/lessons-materials.component';
import { AddLessonComponent } from './components/add-lesoon/add-lesoon.component';
import { UploadComponent } from './upload/upload.component'
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { MatSelectModule } from '@angular/material/select';
import { AddNotificationComponent } from './add-notification/add-notification.component';
import { CommsComponent } from './comms/comms.component';
import { NgxExtendedPdfViewerModule} from 'ngx-extended-pdf-viewer';
import { NgxDocViewerComponent, NgxDocViewerModule } from 'ngx-doc-viewer';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { CoursePlayerComponent } from './course-player/course-player.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { NgxYoutubePlayerModule } from 'ngx-youtube-player';
import { QuizComponent } from './quiz/quiz.component';
import { QuizContentComponent } from './quiz-content/quiz-content.component';
import { QuizDisplayComponent } from './quiz-display/quiz-display.component';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { DoQuizComponent } from './do-quiz/do-quiz.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';






@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignUpComponent,
    HeaderComponent,
    AddCourseComponent,
    CoursesComponent,
    MaterialComponent,
    AssignmentComponent,
    GradeComponent,
    SubmissionsComponent,
    UploadpdfComponent,
    ProfileComponent,
    UsersListComponent,
    ResetPasswordComponent,
    DashboardComponent,
    VerifSetupComponent,
    LessonsMateialsComponent,
    AddLessonComponent,
    UploadComponent,
    ConfirmationDialogComponent,
    AddNotificationComponent,
    CommsComponent,
    ConfirmEmailComponent,
    CoursePlayerComponent,
    StatisticsComponent,
    QuizComponent,
    QuizContentComponent,
    QuizDisplayComponent,
    ChatbotComponent,
    DoQuizComponent,
    LoadingSpinnerComponent,

  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule ,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatDialogModule,
    NgxExtendedPdfViewerModule,
    NgxDocViewerModule,
    HighchartsChartModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
