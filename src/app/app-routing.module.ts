import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CoursesComponent } from './components/courses/courses.component';
import { MaterialComponent } from './components/material/material.component';
import { AssignmentComponent } from './components/assignment/assignment.component';
import { SubmissionsComponent } from './components/submissions/submissions.component';

const routes: Routes = [{
  path:'login', component: LoginComponent
},

{
  path:'sign-up', component: SignUpComponent
},

{
  path:'courses', component: CoursesComponent
},

{
  path:'material', component: MaterialComponent
},

{
  path:'submissions', component: SubmissionsComponent
},

{
  path:'assignment', component: AssignmentComponent
},

{
  path:'add-course', component: AddCourseComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
