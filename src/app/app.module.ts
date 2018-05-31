//Modulos
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';


//Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { ExamsComponent } from './pages/exams/exams.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

//Servicios

//Rutas
import {app_routing} from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AboutComponent,
    ExamsComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    app_routing,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
