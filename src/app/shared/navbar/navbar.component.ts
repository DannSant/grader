import { Component, OnInit } from '@angular/core';
import {ExamsService} from '../../services/exams.service'
import {Router} from '@angular/router'
import Swal from 'sweetalert2';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {

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

  logout(){
    this._es.logout();
  }

  showAlert(title:string,msg:string,type:any){
    Swal(title,msg,type)
  }

}
