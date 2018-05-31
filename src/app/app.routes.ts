import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from './pages/home/home.component';
import {ExamsComponent} from './pages/exams/exams.component';
import {AboutComponent} from './pages/about/about.component';

const app_routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];

export const app_routing = RouterModule.forRoot(app_routes);
