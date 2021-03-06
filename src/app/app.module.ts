//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {FormsModule,ReactiveFormsModule} from '@angular/forms'
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';



//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

//Servicios
import {ExamsService} from './services/exams.service';
import {AuthGuardService} from './services/auth-guard.service';
import {AlertService} from './services/alert.service';
import {LoginService} from './services/login.service';

//Rutas
import {app_routing} from './app.routes';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { MyExamsComponent } from './pages/exams/detail/my-exams/my-exams.component';
import { SharedExamsComponent } from './pages/exams/detail/shared-exams/shared-exams.component';
import { NewExamComponent } from './pages/exams/detail/new-exam/new-exam.component';
import { ReportsComponent } from './pages/exams/detail/reports/reports.component';
import { AddQuestionComponent } from './pages/exams/detail/new-exam/add-question.component';

//Archivos
import { environment } from '../environments/environment';
import { ExamViewerComponent } from './pages/exams/exam-viewer/exam-viewer.component';
import { QuestionDisplayerComponent } from './pages/exams/exam-viewer/question-displayer.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/login/register.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ExamsComponent,
    NavbarComponent,
    SidebarComponent,
    MyExamsComponent,
    SharedExamsComponent,
    NewExamComponent,
    ReportsComponent,
    AddQuestionComponent,
    ExamViewerComponent,
    QuestionDisplayerComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [
    ExamsService,
    AuthGuardService,
    AlertService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
