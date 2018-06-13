import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ExamsComponent} from './pages/exams/exams.component';
import {AboutComponent} from './pages/about/about.component';
import {LoginComponent} from './pages/login/login.component';
import {RegisterComponent} from './pages/login/register.component';
import {MyExamsComponent} from './pages/exams/detail/my-exams/my-exams.component'
import {SharedExamsComponent} from './pages/exams/detail/shared-exams/shared-exams.component'
import {NewExamComponent} from './pages/exams/detail/new-exam/new-exam.component'
import {ReportsComponent} from './pages/exams/detail/reports/reports.component'
import {ExamViewerComponent} from './pages/exams/exam-viewer/exam-viewer.component'

import {AuthGuardService} from './services/auth-guard.service'

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'exams',
    component: ExamsComponent,
    canActivate:[
        AuthGuardService
      ],
    children:[
      { path: 'my-exams', component: MyExamsComponent },
      { path: 'shared-exams', component: SharedExamsComponent },
      { path: 'new-exam/:id', component: NewExamComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  },
  {path: 'exam-viewer/:id', component: ExamViewerComponent},
  { path: 'about', component: AboutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
