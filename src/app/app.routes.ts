import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ExamsComponent} from './pages/exams/exams.component';
import {AboutComponent} from './pages/about/about.component';
import {MyExamsComponent} from './pages/exams/detail/my-exams/my-exams.component'
import {SharedExamsComponent} from './pages/exams/detail/shared-exams/shared-exams.component'
import {NewExamComponent} from './pages/exams/detail/new-exam/new-exam.component'
import {ReportsComponent} from './pages/exams/detail/reports/reports.component'

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  {
    path: 'exams',
    component: ExamsComponent,
    children:[
      { path: 'my-exams', component: MyExamsComponent },
      { path: 'shared-exams', component: SharedExamsComponent },
      { path: 'new-exam', component: NewExamComponent },
      { path: 'reports', component: ReportsComponent },
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
