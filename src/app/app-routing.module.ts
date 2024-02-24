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

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent, children: [
    { path: 'profile', component: ProfileComponent },
    { path: 'users/:param', component: UsersListComponent },
    { path: 'setup', component: VerifSetupComponent },
    { path: 'add-course', component: AddCourseComponent },
    { path: 'courses', component: CoursesComponent},
    { path: 'lesoon', component: LessonsMateialsComponent },
  ] },
  { path: 'sign-up', component: SignUpComponent },
 
  { path: 'resme', component: ResetPasswordComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'upload', component: UploadpdfComponent },
  { path: 'pfd', component: PdfViewerComponent },
 
  { path: 'material', component: MaterialComponent },
  { path: 'submissions', component: SubmissionsComponent },
  { path: 'assignment', component: AssignmentComponent },
  { path: 'add-course', component: AddCourseComponent },
  { path: 'add-lesson', component: AddLessonComponent },
 
  { path: '**', redirectTo: '/login' }, 
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
