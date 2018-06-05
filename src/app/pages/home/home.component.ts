import { Component, OnInit } from '@angular/core';
import {ExamsService} from '../../services/exams.service'
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  constructor(public _es:ExamsService, public router:Router) { }

  ngOnInit() {
  }

  login(provider:string){
    this._es.login(provider,()=>{
      //console.log("redireccionando...")
      this.router.navigate(['exams']);
    },()=>{
        this.router.navigate(['home']);
        this.showAlert("Error!","Ocurrió un error al iniciar sesion, intenta de nuevo","error");
    });
  }

  showAlert(title:string,msg:string,type:any){
    Swal(title,msg,type)
  }


}
